import { serialize } from "cookie";
import { db } from "@/app/services/db";
import { createJWT, validateJWT } from "@/app/services/Auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  // const userId = req.headers.get("x-user-id");
  // const userheader = headers();
  // const userId = userheader;
  //console.log(`userrrrr: ${JSON.stringify(userId)}`);
  //console.log(`headerrr: ${JSON.stringify(req.headers)}`);

  const usercookies = cookies().get(process.env.COOKIE_NAME as string);
  const jwt = usercookies?.value;
  // console.log(`jwt: ${jwt}`);
  if (!jwt) {
    return NextResponse.json({
      status: 401,
      statusText: "You are not logged in, please provide a valid token",
    });
  }
  try {
    if (req.method === "GET") {
      if (jwt) {
        const { uniqueid } = await validateJWT(jwt);
        const user = await db.user.findUnique({
          where: {
            uniqueid: uniqueid,
          },
          include: {
            posts: true,
          },
        });

        if (user) {
          // revalidatePath(req.url);
          user.password = undefined!;
          return NextResponse.json(
            {
              status: "ok",
              data: user,
            },
            {
              status: 200,
              statusText: "User data collected Successfully!",
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(`error: ${error}`);
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error!",
      },
      {
        status: 500,
      }
    );
  }
}
