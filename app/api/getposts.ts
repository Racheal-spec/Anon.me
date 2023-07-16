import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../services/db";

export async function getposts(req: NextApiRequest, res: NextApiResponse) {
  try {
    //get prisma to get the post
    const data = await db.post.findMany();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
