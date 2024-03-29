import { db } from "@/app/services/db";
import { obsfucatedEmail, validateJWT } from "@/app/services/Auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectCloudinary } from "@/app/services/cloudinary.config";
import { UploadApiResponse, v2 } from "cloudinary";
import { JWTProp } from "@/app/Types/global";

export async function GET(req: Request) {

  const usercookies = cookies().get(process.env.COOKIE_NAME as string);
  const jwt = usercookies?.value;
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
        let jwtResult = await validateJWT(jwt);
        const { id } = jwtResult as JWTProp;
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
         //user.location = undefined!;
       
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
  //const unixTimestamp = Math.floor(Date.now() / 1000);
 
  async function uploadProfileImage(file: Blob) {
    const fileBuffer = await file?.arrayBuffer();
    const buffer = Buffer.from(fileBuffer).toString('base64');
    const encoding = 'base64';
    const mime = file?.type;
    const fileuri = 'data:' + mime + ';' + encoding + ',' + buffer;
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      if (!file) {
        return NextResponse.json({ success: false });
      }
      v2.uploader
        .upload(fileuri, {
          invalidate: true
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
        );
    });
  }
  const usercookies = cookies().get(process.env.COOKIE_NAME as string);
  const jwt = usercookies?.value;

  if (jwt) {
    let jwtResult = await validateJWT(jwt);
    const { id } = jwtResult as JWTProp;
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

      if (!edituser) {
        return NextResponse.json({
          message: 'User not found or information not edited.',
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
    let jwtResult = await validateJWT(jwt);
    const { id } = jwtResult as JWTProp;
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
