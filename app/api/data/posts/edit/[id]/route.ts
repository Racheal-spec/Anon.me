import { ParamType } from "@/app/Types/posts";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: ParamType) {
  const postid = params?.id;
  const body = await req.json();
  try {
    const post = await db.post.update({
      where: {
        id: postid,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    if (!post.title || !post.content) {
      return NextResponse.json(
        {
          message:
            "Error getting post: Check that you are passing the correct id!",
        },
        { 
          status: 422,
        }
      );
    }
    if (post) {
      return NextResponse.json(post, {
        status: 200,
        statusText: "Post Edited!",
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
