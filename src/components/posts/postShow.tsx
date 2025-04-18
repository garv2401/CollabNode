import React from "react";
import { prisma } from "@/lib/index";
import { notFound } from "next/navigation";
import CommentCreateForm from "../comments/CommentCreateForm";
import like from "@/assets/like.svg";
import LikeButton from "../likeButton";
import DislikeButton from "../dislikeButton";
import SaveButton from "../saveButton";
import { auth } from "@/auth";
import { fetchLikedPosts } from "@/lib/query/post";

type PostShowPageProps = {
  postId: string;
};

const postShow: React.FC<PostShowPageProps> = async ({ postId }) => {
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: true,
      likedBy: true,
      
    },
  });
  const session = await auth();
  const likedPost = await fetchLikedPosts();
  //console.log("Liked posts:", likedPost); 

  if (!post) {
    notFound();
  }

  let userIdLikedPostId=false;
  post.likedBy.forEach((item)=>{
    if(item.id===session?.user?.id){
      userIdLikedPostId=true;
    }
  })

  const userWithSaved = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: { saved: true },
  });
  
  let userSavedPost = false;
  
  userWithSaved?.saved.forEach((item) => {
    if (item.id === post.id) {
      userSavedPost = true;
    }
  });
  //console.log("Saved Posts:",userWithSaved?.saved);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold my-2 text-xl">{post.title}</h1>
        <p className="text-gray-600">By {post.user?.name}</p>
      </div>
      <pre className="border-2 border-gray-200 p-2 rounded-sm">
        {post.content}
      </pre>
      <div className="flex flex-row gap-10">
        <div className="flex flex-row gap-0 p-1">
          <p className="p-1 pt-2">{post.likedBy.length}</p>
          <LikeButton
            val={userIdLikedPostId}
            post={post}
            postId={postId}
            userId={session?.user?.id || null}
          />
        </div>

        <SaveButton
          val={userSavedPost}
          post={post}
          postId={postId}
          userId={session?.user?.id || null}
        />
      </div>
    </div>
  );
};

export default postShow;
