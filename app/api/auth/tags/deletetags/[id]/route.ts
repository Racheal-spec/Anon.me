import { ParamType } from "@/app/Types/posts";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: ParamType) {
  const tagid = params?.id;
  console.log(tagid);
  try {
    const tag = await db.category.delete({
      where: {
        id: tagid,
      },
    });
    if (!tag) {
      return NextResponse.json({
        message:
          "Error deleting tag: Check that you are passing the correct id!",
      });
    }
    if (tag) {
      return NextResponse.json(tag, {
        status: 200,
        statusText: "ok",
      });
    }
  } catch (error) {
    console.log(error);
    // let res = NextResponse.next();
    // return res.status;
    return NextResponse.json({
      message: error,
    });
  }
}
