import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const userWithPosts = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
      include:{
        posts: true,
      }
    });

    return NextResponse.json(userWithPosts, { status: 200 });
  } catch (error) {
    console.log("[ERROR FINDING USER'S POSTS]", error);
    return new Response("[ERROR FINDING USER'S POSTS]", { status: 500 });
  }
};
