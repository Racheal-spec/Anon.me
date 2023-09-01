import { postType } from "@/app/Types/posts";
import { createJWT, validateJWT } from "@/app/services/Auth";
import { db } from "@/app/services/db";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const usercookies = cookies().get(process.env.COOKIE_NAME as string);
    const jwt = usercookies?.value as string;
    if (req.method === "POST") {
      const { uniqueid } = await validateJWT(jwt);
      const body = await req.json();
      // console.log(jwt, uniqueid);

      const post = await db.post.create({
        data: {
          title: body.title,
          content: body.content,
          excerpts: body.excerpts,
          author: { connect: { uniqueid: uniqueid } },
        },
      },
      )
      
    //   );
      //  console.log(post);
      if (!post) {
        return NextResponse.json({
          message: "post creation failed!",
        });
      }
      if (post) {
        console.log("createeee");
        //return NextResponse.json(post);
        return NextResponse.json(
          {
            status: 201,
            data: post,
            statusText: "created",
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
      } else {
        return NextResponse.json({ message: "Error creating post" });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}
