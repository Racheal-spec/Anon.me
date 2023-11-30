import { connectCloudinary } from "@/app/services/cloudinary.config";
import { db } from "@/app/services/db";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

export async function DELETE (req: Request, res: NextResponse) {
    const url = new URL(req.url);
    const userquery = url.searchParams.get("user");
    connectCloudinary;
    const singleuser = await db.user.findUnique({
        where: {
            id: userquery as string
        }
    })

    const photoUrl = singleuser?.photo;

  if (!photoUrl) {
    return NextResponse.json({ message: 'User does not have a photo' });
  }

    const user_public_id = extractPublicId(photoUrl ?? "");
    
    try {
        await cloudinary.uploader.destroy(user_public_id);
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({
            message: "Error deleting user image"
        })
    }

    const updateduser = await db.user.update({
        where: {
            id: userquery as string
        },
        data: {
            photo: null
        }
    })

    return NextResponse.json({
        status: 200,
        data:updateduser
    })
}