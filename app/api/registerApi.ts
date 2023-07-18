import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../services/db";
import { createJWT, hashPassword } from "../services/Auth";
import { serialize } from "cookie";

export async function registerApi(req: NextApiRequest, res: NextApiResponse) {
  try {
    //get prisma to create a user
    if (req.method === "POST") {
      const user = await db.user.create({
        data: {
          anonname: req.body.anonname,
          uniqueid: req.body.uniqueid,
          password: await hashPassword(req.body.password),
        },
      });
      const jwt = await createJWT(user);
      //Why cookies instead of local storage? Using cookies here because (i) it reduces the work on the clientside (ii) The nextjs middleware that I'm going to be using has no access to local storage becuase it happens outside of the computer/server i.e on the edge
      res.setHeader(
        "Set-Cookie",
        //Below is the cookie i'M Setting
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 6 * 24 * 7,
        })
      );
      console.log(user);
    }
    return res.status(201);
  } catch (error) {
    return res.status(500).json(error);
  }
}
