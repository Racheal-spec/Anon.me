import { db } from "@/app/services/db";
import { obsfucatedEmail, validateJWT } from "@/app/services/Auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectCloudinary } from "@/app/services/cloudinary.config";
import { UploadApiResponse, v2 } from "cloudinary";

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
          user.email = obsfucatedEmail(user.email);
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

export async function PUT(req: Request) {
  connectCloudinary;
  const unixTimestamp = Math.floor(Date.now() / 1000);
  async function uploadProfileImage(file: Blob) {
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
            folder: "Anon_Blog/profile_pics",
            timestamp: unixTimestamp,
          },
          (err: any, result: any) => {
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
  const usercookies = cookies().get(process.env.COOKIE_NAME as string);
  const jwt = usercookies?.value;

  if (jwt) {
    const { id } = await validateJWT(jwt);
    const formdata = await req.formData();
    const profileData = JSON.parse(formdata.get("profileData") as string);
    const profileimgfile = formdata.get("photo") as Blob | null;
    let uploadedProfileImg: UploadApiResponse | null = null;
    if (profileimgfile) {
      uploadedProfileImg = await uploadProfileImage(profileimgfile);
    } else {
      uploadedProfileImg = null;
    }
    try {
      const edituser = await db.user.update({
        where: {
          id: id,
        },
        data: {
          anonname: profileData.anonname,
          photo: uploadedProfileImg?.url ?? null,
        },
      });

      if (edituser) {
        return NextResponse.json({
          data: edituser,
          status: 200,
          statusText: "User Information Edited!",
        });
      }
    } catch (error) {
      console.log(error);
      // let res = NextResponse.next();
      // return res.status;
      return NextResponse.json({
        message: error,
      });
    }
  }
}

export async function DELETE(req: Request) {
  const usercookies = cookies().get(process.env.COOKIE_NAME as string);
  const jwt = usercookies?.value;

  if (!jwt) {
    return NextResponse.json(
      {
        status: 401,
        message: "You are not allowed to carry out this action!",
      },
      {
        status: 400,
      }
    );
  }
  if (jwt) {
    const { id } = await validateJWT(jwt);
    try {
      const deleteuser = await db.user.delete({
        where: {
          id: id,
        },
      });
      cookies().delete(process.env.COOKIE_NAME as string);
      if (!deleteuser) {
        return NextResponse.json(
          {
            message:
              "Error deleting post: Check that you are passing the correct id!",
          },
          {
            status: 400,
          }
        );
      }
      if (deleteuser) {
        return NextResponse.json(
          {
            data: deleteuser,
            status: 200,
            statusText: "ok",
          },
          {
            status: 200,
          }
        );
      }
    } catch (error) {
      console.log(error);

      return NextResponse.json({
        message: error,
      });
    }
  }
}
