import { validateJWT } from "@/app/services/Auth";

import { db } from "@/app/services/db";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { UploadApiResponse, v2 } from "cloudinary";
import { connectCloudinary } from "@/app/services/cloudinary.config";

export async function POST(req: Request) {
  connectCloudinary;
  const unixTimestamp = Math.floor(Date.now() / 1000);
  async function uploadImage(file: Blob) {
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      if (!file) {
        return NextResponse.json({ success: false });
      }
      console.log(`file: ${JSON.stringify(file)}`);
      const buffer = Buffer.from(await file?.arrayBuffer());
      v2.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "Anon_Blog",
            timestamp: unixTimestamp,
          },
          (err, result) => {
            if (err) {
              console.log(err);
              return reject(err);
            } else if (result) {
              console.log(`resuiltttt: ${JSON.stringify(result)}`);
              return resolve(result);
            }
          }
        )
        .end(buffer);
    });
  }

  try {
    const usercookies = cookies().get(process.env.COOKIE_NAME as string);
    const jwt = usercookies?.value as string;

    const formData = await req.formData();

    const postData = JSON.parse(formData.get("postData") as string);
    if (!postData.title || !postData.content || !postData.categoryId) {
      return NextResponse.json(
        {
          message:
            "Invalid Data: Check that your title, content and tag are not missing!",
        },
        {
          status: 422,
        }
      );
    }
    if (req.method === "POST") {
      const { id } = await validateJWT(jwt);
      // const body = await req.json();

      const imagefile = formData.get("postimage") as Blob | null;

      let uploadedImg: UploadApiResponse | null = null;
      if (imagefile) {
        uploadedImg = await uploadImage(imagefile);
      } else {
        uploadedImg = null;
      }

      const category = await db.category.findFirst({
        where: {
          id: postData.categoryId,
        },
      });
      if (!category) {
        return NextResponse.json(
          {
            message: "Invalid category id",
          },
          {
            status: 422,
          }
        );
      }
      const post = await db.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          postimage: uploadedImg?.url ?? null,
          author: { connect: { id: id } },
          category: { connect: { id: postData.categoryId } },
        },
        include: {
          author: true,
        },
      });
      if (!post) {
        return NextResponse.json({
          message: "post creation failed!",
        });
      }
      if (post) {
        post.author.password = undefined!;
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
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
