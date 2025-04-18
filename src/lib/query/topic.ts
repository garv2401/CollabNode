import { Post,Topic } from "@prisma/client";
import {prisma} from "@/lib/index";


export const fetchTopics=async():Promise<Topic[]>=>{
    return prisma.topic.findMany({
    })
}