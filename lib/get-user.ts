import prisma from "./db"
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

// Function for finding a user by id in the database
export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
  
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return new NextResponse("[ERROR FINDING USER]", { status: 500 });
  }
}

// Function for finding a user by email in the database
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return new NextResponse("[ERROR FINDING USER]", { status: 500 });
  }
}