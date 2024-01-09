import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userWithPosts = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include:{
        posts: true,
      }
    });

    return NextResponse.json(userWithPosts, { status: 200 });
  } catch (error) {
    console.log("[ERROR FINDING USER'S POSTS]", error);
    return new NextResponse("[ERROR FINDING USER'S POSTS]", { status: 500 });
  }
};
