'use server'
import { auth } from "@/auth";
import zod from "zod";
import { prisma } from "@/lib/index";
import { revalidatePath } from "next/cache";

const createCommentSchema = zod.object({
    content: zod.string().trim().min(3)
});

type createCommentError = {
    errors: {
        content?: string[],
        formError?: string[]
    }
};

export const createComment = async (
    { postId, parentId }: { postId: string; parentId?: string },
    previousState: createCommentError,
    formData: FormData
): Promise<createCommentError> => {
    const result = createCommentSchema.safeParse({
        content: formData.get('content')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                formError: ["You must be logged in to create a comment"]
            }
        };
    }

    let comment: any;
    try {
        comment = await prisma.comment.create({
            data: {
                content: result.data.content,
                userId: session.user.id,
                postId: postId,
                parentId: parentId
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    formError: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    formError: ["Failed to reply comment"]
                }
            };
        }
    }

    // Return an empty error object if the comment creation is successful

    const topic=await prisma.topic.findFirst({
        where:{
            posts:{
                some:{
                    id:postId
                }
            }
        }
    })

    revalidatePath(`topic/${topic}/posts/${postId}`);
    if(!topic){
        return{
            errors:{
                formError:["Topic not found"]
            }
        }
    }
    return { errors: {} };
};