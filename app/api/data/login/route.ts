import { serialize } from "cookie";
import { db } from "@/app/services/db";
import { comparePasswords, createJWT } from "@/app/services/Auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(body.uniqueid);
  if (req.method === "POST") {
    const users = await db.user.findMany();
    // console.log(users);
    const user = await db.user.findUnique({
      where: {
        uniqueid: body.uniqueid,
      },
    });

    const jwt = await createJWT(user!);
    console.log(user, jwt);
    if (!user) {
      return NextResponse.json(
        {
          status: 401,
          data: user,
          statusText:
            "Invalid login: check that you are using the correct uniqueid",
        },
        {
          status: 401,
          headers: {
            "Set-Cookie":
              //Below is the cookie i'M Setting
              serialize(process.env.COOKIE_NAME as string, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 6 * 24 * 7,
              }),
          },
        }
      );
    }
    const isUser = await comparePasswords(body.password, user.password);
    // console.log(body.password, user.password);
    if (isUser) {
      const jwt = await createJWT(user);
      user.password = undefined!;
      return NextResponse.json(
        {
          status: "ok",
          data: user,
        },
        {
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
          statusText: "Login Successful!",
        }
      );
    } else {
      return NextResponse.json({
        status: 500,
      });
    }
  }
}
