'use server'
import { auth } from '@/auth';
import zod from 'zod';
import {prisma} from '@/lib/index';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Post } from '@prisma/client';

const createPostSchema=zod.object({
    title:zod.string().min(3),
    content:zod.string().min(10)
})

type CreatePostError={
    errors:{
        title?:string[],
        content?:string[],
        formError?:string[]
    }
}

export const createPost=async(slug:string,prevState:CreatePostError,formdata:FormData):Promise<CreatePostError>=>{
    const title=formdata.get('title')?.toString();
    const content=formdata.get('content')?.toString();

    const result=createPostSchema.safeParse({title,content});
    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const session=await auth();
    if(!session || !session?.user || !session.user.id){
        return{
            errors:{
                formError: ["You must be logged in to create a topic"],
            }
        }
    }

    let post:Post;
    const topic=await prisma.topic.findFirst({
        where:{slug}
    })

    if(!topic){
        return {
            errors:{
                formError:["Topic not found"]
            }
        }
    }

    try{

        post=await prisma.post.create({
            data:{
                title:result.data.title,
                content:result.data.content,
                userId:session.user.id,
                topicId:topic.id 
            }
        })

        await prisma.user.update({
            where: {
              id: session?.user?.id,
            },
            data: {
              Post: {
                connect: {
                  id: post.id, // Connect the user to the likedBy relation
                },
              },
            },
          });

    }catch(err:unknown){
        if(err instanceof Error){
            return {
                errors: {
                    formError: [err.message],
                },
            }
        }else{
            return {
                errors: {
                    formError: ["Failed to create a post"],
                },
            }
        }
    }

    revalidatePath(`/topic/${slug}`);
    redirect(`/topic/${slug}/posts/${post.id}`);
}