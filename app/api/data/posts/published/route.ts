import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  // get page and lastCursor from query
  const url = new URL(req.url);

  const take = url.searchParams.get("take");
  const lastCursor = url.searchParams.get("lastCursor");
  try {
    //get prisma to get the post
    const data = await db.post.findMany({
      take: take ? parseInt(take as string) : 7,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor,
        },
      }),
      orderBy: {
        intId: "desc",
      },
      include: {
        author: true,
        likes: true,
        category: true
      },
      where: {
        published: true,
      },
    });

    if (data.length === 0) {
      return NextResponse.json(
        {
          status: "ok",
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        },
        {
          status: 200,
        }
      );
    }
    //Get the last post from the data result(i.e based on the "take" functionality)
    const lastPost: any = data[data.length - 1];
    const cursor = lastPost.id;
    const nextPage = await db.post.findMany({
      take: take ? parseInt(take as string) : 7,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
    });
    data.map((val) => (val.author.password = undefined!));
    data.map((val) => (val.author.email = undefined!));
    data.map((val) => (val.author.location= undefined!));
    return NextResponse.json(
      {
        status: "ok",
        data: data,
        metaData: {
          lastCursor: cursor,
          hasNextPage: nextPage.length > 0,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      status: error,
    });
  }
}
