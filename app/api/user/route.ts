import { serialize } from "cookie";
import { db } from "@/app/services/db";
import { createJWT } from "@/app/services/Auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const body = await req.json();
  try {
    if (req.method === "GET") {
      const user = await db.user.findUnique({
        where: {
          uniqueid: body.uniqueid,
        },
      });
      console.log(user);
      const jwt = await createJWT(user!);
      if (user) {
        return NextResponse.json(user, {
          status: 200,
          headers: {
            "Set-Cookie":
              //Below is the cookie i'M Setting
              serialize(process.env.COOKIE_NAME as string, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 6 * 24 * 7,
              }),
          },
          statusText: "Success!",
        });
      } else {
        return NextResponse.json(user, {
          status: 402,
        });
      }
    }
  } catch (error) {
    console.log(`error: ${NextResponse.json({})}`);
    return NextResponse.json({
      status: 500,
    });
  }
}
