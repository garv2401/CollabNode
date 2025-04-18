'use server'

import { prisma } from "@/lib"
import { revalidatePath } from "next/cache";
export const savePost=async({postId,userId}:{postId:string,userId:string})=>{
    try{
        await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                saved: {
                  connect: {
                    id: postId, 
                  },
                },
              },
            });

    }catch(error){
        console.error("Error updating like:", error);
        throw new Error("Failed to save post");
    }
    revalidatePath('/topics');

}