import { db } from "@/app/services/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try {
    //get prisma to get the post
    const data = await db.post.findMany();
    console.log(data);
    return NextResponse.json(
      {
        status: "ok",
        data: data,
      },
      {
        status: 200,
      }
    );
    // return res.status(200).json(data);
  } catch (error) {
    return NextResponse.json({
      status: error,
    });
    //return res.status(500).json(error);
  }
}
