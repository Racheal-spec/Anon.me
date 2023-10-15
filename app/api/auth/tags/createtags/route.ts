import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const tags = await db.category.create({
      data: {
        title: body.title,
      },
    });
    if (!tags) {
      return NextResponse.json({
        message:
          "Error getting tags: Check that you are passing the correct id!",
      });
    }
    if (tags) {
      return NextResponse.json({
        status: 200,
        data: tags,
        statusText: "success!",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: error,
    });
  }
}
