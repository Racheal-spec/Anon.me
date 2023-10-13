import { ParamType } from "@/app/Types/posts";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: ParamType) {
  const postid = params?.id;
  try {
    const post = await db.post.findUnique({
      where: {
        id: postid,
      },
      include: {
        author: true,
        likes: true,
        comments: true,
      },
    });
    if (!post) {
      return NextResponse.json(
        {
          message:
            "Error getting post: Check that you are passing the correct id!",
        },
        {
          status: 400,
        }
      );
    }
    if (post) {
      post.author.password = undefined!;
      post.author.email = undefined!;
      post.author.location = undefined!;
      return NextResponse.json(post, {
        status: 200,
        statusText: "ok",
      });
    }
  } catch (error) {
    console.log(error);
    // let res = NextResponse.next();
    // return res.status;
    return NextResponse.json({
      message: error,
    });
  }
}
