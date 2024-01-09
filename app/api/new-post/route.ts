import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { data } = await req.json();
    await prisma.post.create({
      data: {
        authorName: data.authorName,
        tags: data.tags,
        body: data.body,
        author: {
          connect: {
            id: data.userId
          },
        },
      },
    });

    return new NextResponse("Success", { status: 201 });
  } catch (error) {
    console.log("[FAILED TO CREATE A NEW POST!]", error);
    return new NextResponse("[FAILED TO CREATE A NEW POST!]", { status: 500 });
  }
};
