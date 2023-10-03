import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");
  const postId = url.searchParams.get("post");

  try {
    if (userId && postId) {
      const existingLike = await db.postLike.findFirst({
        where: {
          userId: userId,
          postId: postId,
        },
      });

      if (existingLike) {
        const removelike = await db.postLike.delete({
          where: {
            id: existingLike.id,
          },
        });
        const isLiked = false;
        // console.log(`User with ID ${userId} unliked the post with ID ${postId}`);
        return NextResponse.json(
          {
            status: 200,
            data: removelike,
            isLiked: isLiked,
          },
          {
            status: 200,
          }
        );
      } else {
        const newlike = await db.postLike.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        });
        const isLiked = true;
        return NextResponse.json(
          {
            status: 200,
            data: newlike,
            isLiked: isLiked,
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error toggling like for the story:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      {
        status: 500,
      }
    );
  }
}
