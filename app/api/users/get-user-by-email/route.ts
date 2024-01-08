import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}