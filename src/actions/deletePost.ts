'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePost=async(postId:string)=>{
    try{
        await prisma.post.delete({
            where:{
                id:postId
            }
        })

    }catch(error){
        console.error("Post not deleted:",error)
    }

    const session=await auth();
    revalidatePath(`/user/${session?.user?.id}/posts`)
    redirect(`/user/${session?.user?.id}/posts`);
}