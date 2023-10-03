import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");
  const postId = url.searchParams.get("post");
  try {
    if (userId && postId) {
      const existingLike = await db.like.findFirst({
        where: {
          userId,
          postId,
        },
      });
      const isLiked = !existingLike;
      if (existingLike) {
        await db.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        // console.log(`User with ID ${userId} unliked the post with ID ${postId}`);
      } else {
        const newlike = await db.like.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        });
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
        status: 200,
      }
    );
  }
}
