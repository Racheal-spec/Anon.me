import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try {
    const mostlikedPosts = await db.post.findMany({
      orderBy: {
        likesCount: "desc",
      },
      take: 7,
      include: {
        author: true,
        likes: true,
      },
      where: {
        published: true,
      },
    });
    console.log("reachedddd");
    console.log(mostlikedPosts);

    if (mostlikedPosts.length === 0) {
      return NextResponse.json(
        {
          status: "ok",
          data: [],
          likesCount: 0,
        },
        {
          status: 200,
        }
      );
    }

    mostlikedPosts.map((val) => (val.author.password = undefined!));

    return NextResponse.json(
      {
        status: "ok",
        data: mostlikedPosts,
        // likesCount: count,
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
