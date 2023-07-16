import { db } from "@/app/services/db";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      //get prisma to get the post
      const data = await db.post.findMany();
      console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
