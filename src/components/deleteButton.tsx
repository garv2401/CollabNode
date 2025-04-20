'use client'
import React from "react";
import { Button } from "./ui/button";
import { deletePost } from "@/actions/deletePost";
type DeleteButtonProps = {
  postId: string;
};

const handleDelete = async (postId:string) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    try {
        await deletePost(postId)
      
      console.log("Post deleted");
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };
  



const DeleteButton: React.FC<DeleteButtonProps> = ({postId}) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <p className="font-semibold text-red-400">Delete</p>
      <Button className="p-2 h-auto w-auto flex items-center justify-center hover:cursor-pointer" onClick={()=>handleDelete(postId)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 450 450"
          className="w-10 h-10"
          fill="red"
        >
          <path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z" />
        </svg>
      </Button>
    </div>
  );
};

export default DeleteButton;
