import { ParamType } from "@/app/Types/posts";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: ParamType) {
  const postid = params?.id;
  try {
    const post = await db.post.delete({
      where: {
        id: postid,
      },
    });
    const singlepost = await db.post.findUnique({
      where: {
        id: postid,
      },
    });
    if (!singlepost) {
      return NextResponse.json(
        {
          status: 400,
          message: "Record to delete does not exist!",
        },
        {
          status: 400,
        }
      );
    }
    if (!post) {
      return NextResponse.json(
        {
          message:
            "Error deleting post: Check that you are passing the correct id!",
        },
        {
          status: 400,
        }
      );
    }
    if (post) {
      return NextResponse.json(
        {
          data: post,
          status: 200,
          statusText: "ok",
        },
        {
          status: 200,
        }
      );
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
