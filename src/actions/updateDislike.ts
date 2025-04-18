'use server'

import { prisma } from "@/lib"
import { revalidatePath } from "next/cache";

export const updateDislike = async ({ postId, userId }: { postId: string; userId: string }) => {
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error deleting like:", error);
    throw new Error("Failed to delete like");
  }

  revalidatePath("/topics");
};
