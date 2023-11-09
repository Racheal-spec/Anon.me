import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");
  const postId = url.searchParams.get("post");
  const currentpost = await db.post.findFirst({
    where: {
      id: postId as string,
    },
    include: {
      likes: true,
    },
  });

  const post = await db.post.findUnique({
    where: {
      id: postId as string,
    },
    select: {
      likesCount: true,
    },
  });

  try {
    if (!userId) {
      return NextResponse.json(
        {
          status: 401,
          message: "You are not authroized to perform this action!",
        },
        {
          status: 401,
        }
      );
    }
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

        if (post && post?.likesCount > 0) {
          // Decrement the likesCount in the Post model
          const reducelike = await db.post.update({
            where: {
              id: postId,
            },
            data: {
              likesCount: {
                decrement: 1,
              },
            },
          });

          return NextResponse.json(
            {
              status: 200,
              data: {
                removelike,
                reducelike,
              },
              isLiked: false,
            },
            {
              status: 200,
            }
          );
        }
      } else {
        const newlike = await db.postLike.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        });

        // Increment the likesCount in the Post model
        const increaselike = await db.post.update({
          where: {
            id: postId,
          },
          data: {
            likesCount: {
              increment: 1,
            },
          },
        });

        return NextResponse.json(
          {
            status: 200,
            data: {
              newlike,
              increaselike,
            },
            isLiked: true,
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
