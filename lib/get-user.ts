import prisma from "./db";

// Function for finding a user by id in the database
export const getUserById = async (id: string) => {

};

// Function for finding a user by email in the database
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};
