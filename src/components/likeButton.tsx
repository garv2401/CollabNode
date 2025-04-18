"use client";
import React, { useState } from "react";
import { Post } from "@prisma/client";
import { updateLike } from "@/actions/updateLike";
import { Button } from "@/components/ui/button";
import { updateDislike } from "@/actions/updateDislike";
import { Poor_Story } from "next/font/google";

type LikeButtonProps = {
  post: Post;
  postId: string;
  userId: string | null;
  val:boolean
};

const LikeButton: React.FC<LikeButtonProps> = ({ post, postId, userId,val }) => {
  const [isLiked, setIsLiked] = useState(val);
  const functionCall=isLiked? updateDislike : updateLike;
  
  return (
    
      <Button
        type={"submit"}
        onClick={async () => {
          userId && functionCall({ postId, userId });
          setIsLiked(!isLiked);
        }}
        className="border-0"
      >
        {isLiked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              fill="#1E90FF"
              d="M203 620h4.2v-12H203v12zm20.924-8.645l-1.823 6.535c-.302 1.241-1.462 2.11-2.799 2.11H209.3v-11.979l1.805-6.196c.169-1.05 1.118-1.825 2.234-1.825 1.249 0 2.261.964 2.261 2.153V608h5.526c1.847 0 3.214 1.641 2.798 3.355z"
              transform="translate(-259 -760) translate(56 160)"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              fill="#000"
              d="M203 620h4.2v-12H203v12zm20.924-8.645l-1.823 6.535c-.302 1.241-1.462 2.11-2.799 2.11H209.3v-11.979l1.805-6.196c.169-1.05 1.118-1.825 2.234-1.825 1.249 0 2.261.964 2.261 2.153V608h5.526c1.847 0 3.214 1.641 2.798 3.355z"
              transform="translate(-259 -760) translate(56 160)"
            />
          </svg>
        )}
      </Button>
    
  );
};

export default LikeButton;
