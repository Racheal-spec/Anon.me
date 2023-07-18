import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../services/db";
import { comparePasswords, createJWT } from "../services/Auth";
import { serialize } from "cookie";

export async function loginApi(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        uniqueid: req.body.uniqueid,
      },
    });
    if (!user) {
      res.status(401);
      res.json({
        error: "Invalid login: check that you are using the correct email",
      });
      return;
    }
    const isUser = await comparePasswords(req.body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        //Below is the cookie i'M Setting
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 6 * 24 * 7,
        })
      );
      res.status(201);
      res.end();
    } else {
      res.status(402);
      res.end();
    }
  }
}
