import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

//================GET ALL TAGS==========================//

export async function GET(req: Request) {
  try {

      const tags = await db.category.findMany({
        include: {
          posts: true,
        },
      });
      if (tags.length === 0) {
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

      if (tags) {
        return NextResponse.json(
          {
            status: "ok",
            data: tags,
          },
          {
            status: 200,
            statusText: "Success",
          }
        );
    }
  } catch (error: any) {
    console.log(`error: ${error}`);
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
