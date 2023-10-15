import { ParamType } from "@/app/Types/posts";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: ParamType) {
  const postid = params?.id;
  const formData = await req.formData();

  const postData = JSON.parse(formData.get("postData") as string);
  try {
    const post = await db.post.update({
      where: {
        id: postid,
      },
      data: {
        title: postData.title,
        content: postData.content,
        category: { connect: { id: postData.categoryId } },
      },
    });

    if (!post.title || !post.content || !post.categoryId) {
      return NextResponse.json(
        {
          message:
            "Error updating post: check that your title, content and tag are not missing!",
        },
        {
          status: 422,
        }
      );
    }
    if (post) {
      return NextResponse.json({
        data: post,
        status: 200,
        statusText: "Post Edited!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
}
