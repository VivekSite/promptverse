import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { Post } from "@prisma/client";

export const dynamic = 'force-dynamic';
// get request
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const post: Post | null = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!post) return new NextResponse("Post Not Found!", { status: 404 });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return new NextResponse("[ERROR FINDING POST]", { status: 500 });
  }
};

// update request
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { body, tags } = await req.json();

  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingPost)
      return new NextResponse("No Existing Post Found", { status: 404 });

    await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        body: body,
        tags: tags,
      },
    });

    return NextResponse.json(existingPost, { status: 200 });
  } catch (error) {
    return new NextResponse("[ERROR UPDATING THE POST]", { status: 500 });
  }
};

// delete request
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.post.delete({
      where: {
        id: params.id,
      }
    });

    return new NextResponse("Post Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("[ERROR DELETING POST]", { status: 500 });
  }
};
