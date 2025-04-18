'use server'

import { prisma } from "@/lib"
import { revalidatePath } from "next/cache";
export const unSavePost=async({postId,userId}:{postId:string,userId:string})=>{
    try{
        await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                saved: {
                  disconnect: {
                    id: postId, 
                  },
                },
              },
            });

    }catch(error){
        console.error("Error updating like:", error);
        throw new Error("Failed to save post");
    }

    revalidatePath('/topics')
}