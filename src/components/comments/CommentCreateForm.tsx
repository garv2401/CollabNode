"use client";

import React, { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/createComment";
import { Loader2 } from "lucide-react";
type CommentCreateFormProps={
  postId:string
  parentId?:string,
  startOpen?:boolean
}

const CommentCreateForm:React.FC<CommentCreateFormProps> = ({postId,parentId,startOpen}) => {
  const [open, setOpen] = useState(startOpen);

  const [formState,action,isPending]=useActionState(createComment.bind(null,{postId,parentId}),{errors:{}})

  return (
    <div>
      <Button
        size={"sm"}
        variant={"link"}
        className=""
        onClick={() => setOpen(!open)}
      >
        Reply
      </Button>

      {
        open && <form action={action} className="mt-2 space-y-2">
        <Textarea
          id='content'
          name='content'
          placeholder="write a comment..."
          className="bg-gray-100 border-0 focus-visible:ring-0"
        />

        {formState.errors.content && <p className="text-red-600">{formState.errors.content}</p>}
        {formState.errors.formError && <p className="text-red-600 border-red-600 text-sm bg-red-200 p-2 rounded-md">{formState.errors.formError}</p>}
        <Button
          size={"sm"}
          variant={"secondary"}
          className="text-black bg-gray-300"
        >

          {
            isPending?(
              <>
              <Loader2/>
              "Please wait..."
              </>
            ):(
             "Save"
            )
          }
          
        </Button>
      </form>
      }
    </div>
  );
};

export default CommentCreateForm;
