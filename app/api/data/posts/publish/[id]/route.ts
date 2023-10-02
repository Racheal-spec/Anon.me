import { ParamType } from "@/app/Types/posts";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: ParamType) {
  const postid = params?.id;
  try {
    const singlepost = await db.post.findUnique({
      where: {
        id: postid,
      },
    });
    if (singlepost && singlepost?.published === true) {
      return NextResponse.json({
        status: 400,
        message: "This post has already been published!",
      });
    }
    const post = await db.post.update({
      where: {
        id: postid,
      },
      data: {
        published: true,
      },
    });
    if (!post) {
      return NextResponse.json({
        message:
          "Error getting post: Check that you are passing the correct id!",
      });
    }

    if (post) {
      return NextResponse.json({
        data: post,
        status: 200,
        statusText: "Published!",
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
