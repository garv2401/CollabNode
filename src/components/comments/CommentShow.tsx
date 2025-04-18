import React from 'react'
import { fetchCommentBypostID } from "@/lib/query/comments";
import { Avatar, AvatarFallback } from '../ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import CommentCreateForm from './CommentCreateForm';

type CommentsShowProps={
    postId:string
    commentId:string
}

const CommentShow:React.FC<CommentsShowProps> =async ({postId,commentId}) => {
  const comments=await fetchCommentBypostID(postId);
  const comment=comments.find((c)=>c.id===commentId);
  if(!comment){
    return null;
  }
  const childrens=comments.filter((c)=>c.parentId===commentId);
  return (
    <div className='m-4 p-4 border-1 border-gray-300 rounded-md '>
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={comment.user.image || ""} alt="User Avatar"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <p className="text-gray-500 mt-1.5 font-medium text-sm">{comment.user.name}</p>
          <p className="text-gray-800 border-1 border-gray-300 rounded-md p-2">{comment.content}</p>
          <CommentCreateForm postId={postId} parentId={commentId}/>
          
        </div>
      </div>


      {
        childrens.map((comment)=>(
          <CommentShow key={comment.id} postId={comment.postId} commentId={comment.id}/>
        ))
      }
    </div>
  )
}

export default CommentShow