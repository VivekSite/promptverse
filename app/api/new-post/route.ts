import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  const { data } = await req.json();

  try {
    const author = await prisma.user.findUnique({where: {email: data.user.email}})
    if(!author) return new Response("User not found", { status: 404 });

    await prisma.post.create({
      data: {
        tags: data.tags,
        body: data.body,
        author: {
          connect: {
            id: author.id,
          },
        },
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error) {
    console.log("[FAILED TO CREATE A NEW POST!]", error);
    return new Response("[FAILED TO CREATE A NEW POST!]", { status: 500 });
  }
};
