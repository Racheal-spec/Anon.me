import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { db } from "@/app/services/db";
import { createJWT, hashPassword } from "@/app/services/Auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    //get prisma to create a user
    if (req.method === "POST") {
      const body = await req.json();
      const user = await db.user.create({
        data: {
          anonname: body.anonname,
          uniqueid: body.uniqueid,
          password: await hashPassword(body.password),
        },
      });
      //Why cookies instead of local storage? Using cookies here because (i) it reduces the work on the clientside
      //(ii) The nextjs middleware that I'm going to be using has no access to local storage becuase it happens outside of the computer/server i.e on the edge

      const jwt = await createJWT(user);
      if (user) {
        console.log("jwwww");

        return NextResponse.json(user, {
          status: 201,
          headers: {
            "Set-Cookie":
              //Below is the cookie i'M Setting
              serialize(process.env.COOKIE_NAME as string, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 6 * 24 * 7,
              }),
          },
        });
      }
    }
  } catch (error) {
    console.log(`error: ${res}`);

    // res.status(500);
    // res.json({});
  }
}
