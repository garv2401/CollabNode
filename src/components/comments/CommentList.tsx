import React from "react";
import CommentShow from "./CommentShow";
import { fetchCommentBypostID } from "@/lib/query/comments";

type CommentListProps = {
  postId: string;
};

const CommentList: React.FC<CommentListProps> = async ({ postId }) => {
  const comments = await fetchCommentBypostID(postId);
  const topLevelComments=comments.filter((comments)=>comments.parentId===null);
  return (
    <div>
      <h1 className="font-bold">All {comments.length} comments</h1>
      {
        topLevelComments.map((comment)=>(
            <CommentShow key={comment.id} postId={comment.postId} commentId={comment.id}/>
        ))
      }
    </div>
  );
};

export default CommentList;
