import React from "react";
import { prisma } from "@/lib/index";
import { notFound } from "next/navigation";
// import CommentCreateForm from "../comments/CommentCreateForm";
// import like from "@/assets/like.svg";
import LikeButton from "../likeButton";
//import DislikeButton from "../dislikeButton";
import SaveButton from "../saveButton";
import { auth } from "@/auth";
//import { fetchLikedPosts } from "@/lib/query/post";
import { User} from "@prisma/client";
import Image from "next/image";
import DeleteButton from "../deleteButton";

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
  console.log(post);
  const session = await auth();
  //const likedPost = await fetchLikedPosts();
  //console.log("Liked posts:", likedPost);

  if (!post) {
    notFound();
  }

  let userIdLikedPostId = false;
  post.likedBy.forEach((item: User) => {
    if (item.id === session?.user?.id) {
      userIdLikedPostId = true;
    }
  });

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
        <p className="text-gray-600 my-2">By {post.user?.name}</p>
      </div>
      <div className="my-2">
        {post.image && (
          <div className="w-full flex flex-row justify-center items-center">
            <Image
              src={post.image}
              alt="postImage"
              width={300}
              height={300}
              className="w-full h-[250px] sm:w-[80%] sm:h-[250px] lg:w-[40%] lg:h-[40%] object-contain rounded-[10px]"
            />
          </div>
        )}
        <p className="font-mono border-2 border-gray-200 p-2 rounded-sm my-2">
          {post.content}
        </p>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-row gap-0 p-1">
          <p className="p-1 pt-2 font-semibold">{post.likedBy.length}</p>
          <LikeButton
            val={userIdLikedPostId}
            postId={postId}
            userId={session?.user?.id ||""}
          />
        </div>

        <SaveButton
          val={userSavedPost}
          postId={postId}
          userId={session?.user?.id || ""}
        />
        {post.userId === session?.user?.id && <DeleteButton postId={postId}/>}
      </div>
    </div>
  );
};

export default postShow;
