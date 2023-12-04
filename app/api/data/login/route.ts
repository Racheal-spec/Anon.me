import { serialize } from "cookie";
import { db } from "@/app/services/db";
import {
  comparePasswords,
  createJWT,
  obsfucatedEmail,
} from "@/app/services/Auth";
import { NextResponse } from "next/server";
import { UserSchema } from "@/app/services/validations/user.schema";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = UserSchema.parse(body);
    if (req.method === "POST") {
      const user = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });
      console.log(`userrrr: ${JSON.stringify(user)}`);
      const jwt = await createJWT(user!);
      //  console.log(user, jwt);
      if (!user) {
        return NextResponse.json(
          {
            status: 401,
            data: user,
            message:
              "Invalid login: check that you are using the correct email",
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
        // user.email = undefined!;
        const obsfucEmail = obsfucatedEmail(user.email);
        return NextResponse.json(
          {
            status: "ok",
            data: {
              ...user,
              email: obsfucEmail,
            },
          },
          {
            status: 200,
            headers: {
              "Set-Cookie": serialize(process.env.COOKIE_NAME as string, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 6 * 24 * 7,
              }),
            },
            statusText: "Login Successful!",
          }
        );
      } else {
        return NextResponse.json(
          {
            message:
              "Invalid login: Ensure that you are using the correct password",
          },
          {
            status: 401,
          }
        );
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues.map((el) => el.message),
        },
        {
          status: 403,
        }
      );
    }
  }
}
