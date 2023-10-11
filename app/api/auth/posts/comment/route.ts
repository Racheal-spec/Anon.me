import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("post");
  const userId = url.searchParams.get("user");
  try {
    const body = await req.json();
    if (!body.text) {
      return NextResponse.json(
        {
          message: "Invalid Data: You need to write a comment to proceed!",
        },
        {
          status: 422,
        }
      );
    }

    if (req.method === "POST") {
      const comment = await db.comments.create({
        data: {
          text: body.text,
          commenter: { connect: { id: userId ?? "" } },
          post: { connect: { id: postId ?? "" } },
        },
        include: {
          commenter: true,
        },
      });
      if (!comment) {
        return NextResponse.json({
          message: "comment creation failed!",
        });
      }
      if (comment) {
        comment.commenter.password = undefined!;
        comment.commenter.email = undefined!;
        comment.commenter.location = undefined!;

        return NextResponse.json(
          {
            status: 201,
            data: comment,
            statusText: "created",
          },
          {
            status: 201,
          }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("post");
  try {
    const comments = await db.comments.findMany({
      where: {
        postId: postId as string,
      },
      include: {
        commenter: true,
      },
    });

    if (comments && comments.length === 0) {
      return NextResponse.json({
        status: 200,
        data: [],
      });
    }
    if (comments) {
      comments.map((comment) => (comment.commenter.email = undefined!));
      comments.map((comment) => (comment.commenter.location = undefined!));
      comments.map((comment) => (comment.commenter.password = undefined!));

      return NextResponse.json(
        {
          status: 200,
          data: comments,
          statusText: "ok",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
