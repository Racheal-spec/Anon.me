import { db } from "@/app/services/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  // get page and lastCursor from query
  const url = new URL(req.url);


  //const takeValue = take !== null ? parseInt(take, 7) : undefined;
  try {
    //get prisma to get the post
    const data = await db.post.findMany({
 
     
      orderBy: {
        intId: "desc",
      },
      include: {
        author: true,
        likes: true,
        category: true
      },
    });

    if (data.length === 0) {
      return NextResponse.json(
        {
          status: "ok",
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        },
        {
          status: 200,
        }
      );
    }

    const nextPage = await db.post.findMany();
    data.map((val) => {
      let nullpassword = (val.author.password = undefined!);
      let nullemail = (val.author.email = undefined!);
      //makem location undefined too after you've done it from the frontend.
       let nulllocation = (val.author.location = undefined!);
      return {
        nullemail,
        nullpassword,
        nulllocation
      };
    });

    return NextResponse.json(
      {
        status: "ok",
        data: data,
        
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      status: error,
    });
  }
}
