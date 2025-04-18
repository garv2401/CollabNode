'use server'

import { prisma } from "@/lib"
import { revalidatePath } from "next/cache";

export const updateLike = async ({ postId, userId }: { postId: string; userId: string}) => {
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedBy: {
          connect: {
            id: userId, // Connect the user to the likedBy relation
          },
        },
      },
    });
  } catch (error) {
    console.error("Error updating like:", error);
    throw new Error("Failed to update like");
  }
  revalidatePath("/topics")
};