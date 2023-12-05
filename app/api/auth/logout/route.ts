import { serialize } from "cookie";
import { db } from "@/app/services/db";
import { createJWT, validateJWT } from "@/app/services/Auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  // const userId = req.headers.get("x-user-id");
  const usercookies = cookies();
  const jwt = usercookies.get(process.env.COOKIE_NAME as string)?.value;
  try {
    if (req.method === "GET") {
      let res = new NextResponse(JSON.stringify({}), {
        status: 200,
        statusText: "User data deleted!",
        headers: {
          "Set-Cookie":
            // Below is the cookie i'M Setting
            serialize(process.env.COOKIE_NAME as string, "", {
              httpOnly: true,
              path: "/",
              maxAge: -1,
            }),
        },
      });
      return res;
    }
  } catch (error) {
    console.log(`error: ${NextResponse.json({})}`);
    return NextResponse.json({
      status: 500,
    });
  }
}
