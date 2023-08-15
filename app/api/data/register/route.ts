import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { db } from "@/app/services/db";
import { createJWT, hashPassword } from "@/app/services/Auth";
import { NextResponse } from "next/server";
import { RegisterUserSchema } from "@/app/services/validations/user.schema";
import { ZodError } from "zod";
export async function POST(req: Request, res: Response) {
  try {
    //get prisma to create a user
    if (req.method === "POST") {
      const body = await req.json();
      const data = RegisterUserSchema.parse(body);

      const uniquename = await db.user.findFirst({
        where: {
          anonname: data.anonname,
        },
      });

      if (uniquename?.anonname === data.anonname) {
        return NextResponse.json({
          status: 403,
          message: `The anonname "${data.anonname}" has already been choosen`,
        });
      }

      const user = await db.user.create({
        data: {
          anonname: data.anonname,
          uniqueid: data.uniqueid,
          password: await hashPassword(data.password),
          photo: data.photo,
        },
      });
      //Why cookies instead of local storage? Using cookies here because (i) it reduces the work on the clientside
      //(ii) The nextjs middleware that I'm going to be using has no access to local storage becuase it happens outside of the computer/server i.e on the edge runtime

      const jwt = await createJWT(user);

      if (user) {
        user.password = undefined!;
        return NextResponse.json(
          {
            status: "created",
            data: user,
          },
          {
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
          }
        );
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        message: error.issues.map((el) => el.message),
      });
    }
    // console.log(`error: ${NextResponse.error().status}`);
    // return NextResponse.json({
    //   status: 500,
    // });
    // res.status(500);
    // res.json({});
  }
}
