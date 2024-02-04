import prisma from "@/lib/db"
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return new NextResponse("[Error Fetching All Posts]", { status: 500 });
  }
}
