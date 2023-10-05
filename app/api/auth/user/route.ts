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
    return NextResponse.json(
      {
        status: 401,
        statusText: "You are not logged in, please provide a valid token",
      },
      {
        status: 401,
      }
    );
  }
  try {
    if (req.method === "GET") {
      if (jwt) {
        const { id } = await validateJWT(jwt);
        const user = await db.user.findUnique({
          where: {
            id: id,
          },
          include: {
            posts: true,
          },
        });

        if (user) {
          // revalidatePath(req.url);
          user.password = undefined!;
          user.email = undefined!;
          //makem location undefined too after you've done it from the frontend.
          // let nulllocation = (val.author.location = undefined!);
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
