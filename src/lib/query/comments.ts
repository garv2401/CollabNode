import {prisma} from "@/lib/index";
import  type {Comment} from "@prisma/client"
import { cache } from "react";

type CommentWithUser=Comment & {
    user:{name:string|null,image:string|null}

} 

//implementing request memoization:-comment will be called multiple times under nested conditions


//without cache
// export const fetchCommentBypostID=async(postId:string):Promise<CommentWithUser[]>=>{
//     console.log("****Fecth commment called****")
//     return prisma.comment.findMany({
//         where:{postId},
//         include:{
//             user:{select:{
//                 name:true,
//                 image:true
//             }}
//         }
//     })
// }


//with cache
export const fetchCommentBypostID=cache( async(postId:string):Promise<CommentWithUser[]>=>{
    //console.log("****Fecth commment called****")
    return prisma.comment.findMany({
        where:{postId},
        include:{
            user:{select:{
                name:true,
                image:true
            }}
        }
    })
})