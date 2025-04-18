import { Post } from "@prisma/client";
import { prisma } from "@/lib/index";

export type PostWithData = Post & {
  user: { name: string | null };
  topic: { slug: string };
  _count: { comments: number };
  likedBy?: { id: string; name: string | null }[];
};

export const fetchPostsByTopic = async (slug: string): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    where: {
      topic: { slug }
    },
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } }
    }
  });
};

export const fetchTopPosts = async (): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    orderBy: [
      {
        comments: { _count: 'desc' }
      }
    ],
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } }
    },
    take: 5
  });
};

export const fetchPostsBySearch = async (term: string): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } }
      ]
    },
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } }
    }
  });
};

export const fetchPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    take: 4
  });
};

export const fetchLikedPosts = async (): Promise<PostWithData[]> => {
    const likedPosts = await prisma.post.findMany({
      where: {
        likedBy: {
          some: {}, 
        },
      },
      include: {
        likedBy: { select: { id: true, name: true } }, 
        user: { select: { name: true } },
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
      },
    });
  
    //console.log("Liked Posts:", likedPosts);
    return likedPosts;
  };


  export const fetchLikedPostsByUserID = async (userId:string): Promise<PostWithData[]> => {
    const likedPosts = await prisma.post.findMany({
      where: {
        likedBy: {
          some:{
            id:userId, 
          }
        },
      },
      include: {
        likedBy: { select: { id: true, name: true } }, 
        user: { select: { name: true } },
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
      },
    });
  
    //console.log("Liked Posts:", likedPosts);
    return likedPosts;
  };
  

  export const fetchPostsByUserId = async (userId: string): Promise<PostWithData[]> => {
    const postsByUser = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        likedBy: { select: { id: true, name: true } },
        user: { select: { name: true } },
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
      },
    });
  
    return postsByUser;
  };

  export const fetchSavedPostsByUserId = async (userId: string): Promise<PostWithData[]> => {
    const userWithSavedPosts = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        saved: {
          include: {
            likedBy: { select: { id: true, name: true } },
            user: { select: { name: true } },
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
          },
        },
      },
    });
  
    return userWithSavedPosts?.saved ?? [];
  };
  