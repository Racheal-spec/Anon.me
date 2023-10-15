import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");

  try {
    const allbookmarks = await db.bookmarks.findMany({
      where: {
        userId: userId as string,
      },
      include: {
        post: true,
        user: true,
      },
    });

    if (!userId) {
      return NextResponse.json(
        {
          message: "Error: user id is required",
          status: 400,
        },
        {
          status: 400,
        }
      );
    }

    if (allbookmarks.length === 0) {
      return NextResponse.json(
        {
          status: 200,
          data: [],
        },
        {
          status: 200,
        }
      );
    }

    if (allbookmarks) {
      allbookmarks.map((el) => {
        el.user.password = undefined!;
        el.user.location = undefined!;
        el.user.email = undefined!;
      });
      return NextResponse.json(
        {
          data: allbookmarks,
          status: 200,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        errors: error.message,
        message: "Internal server error!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");
  const postId = url.searchParams.get("post");

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
      const existingPost = await db.bookmarks.findFirst({
        where: {
          userId: userId,
          postId: postId,
        },
      });

      if (existingPost) {
        const removepost = await db.bookmarks.delete({
          where: {
            id: existingPost.id,
          },
        });

        return NextResponse.json(
          {
            status: 200,
            data: removepost,
            isBookmarked: false,
          },
          {
            status: 200,
          }
        );
      } else {
        const bookmarkedPost = await db.bookmarks.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        });

        return NextResponse.json(
          {
            status: 200,
            data: bookmarkedPost,
            isBookmarked: true,
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error saving story:", error);
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

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");
  const postId = url.searchParams.get("post");

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
      const existingPost = await db.bookmarks.findUnique({
        where: {
          id: postId,
        },
      });

      if (!existingPost) {
        return NextResponse.json(
          {
            status: 404,
            message: "Story does not exist!",
          },
          {
            status: 404,
          }
        );
      }

      if (existingPost) {
        const deletepost = await db.bookmarks.delete({
          where: {
            id: existingPost.id,
          },
        });

        return NextResponse.json(
          {
            status: 200,
            data: deletepost,
            isBookmarked: false,
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error deleting story:", error);
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
