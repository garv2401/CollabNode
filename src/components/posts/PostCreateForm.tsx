"use client";

import React, { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
//import { createTopic } from "@/actions/createTopic";
import { createPost } from "@/actions/createPost";

type CreatePostFormProps = {
  slug: string;
};
const PostCreateForm: React.FC<CreatePostFormProps> = ({ slug }) => {
  const [formState, action] = useActionState(createPost.bind(null, slug), {
    errors: {},
  });

  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true); // start loading
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      //console.log(data.url);
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false); // stop loading
    }
  };

  // useEffect(()=>{
  //   setImageUrl(image)

  // },imageUrl)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" border-0 text-white bg-black">Add Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-0">
        <form action={action} className="">
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription className="text-stone-600">
              Write a new post. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="">
              <Label htmlFor="title" className="text-right my-2">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="col-span-3 border-gray-300 shadow-md"
              />
            </div>
            {formState.errors.title && (
              <p className="text-sm text-red-600">{formState.errors.title}</p>
            )}
            <div className="">
              <Label htmlFor="content" className="text-right my-2">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                className="col-span-3 border-gray-300 shadow-md"
              />
            </div>
            {formState.errors.content && (
              <p className="text-sm text-red-600">{formState.errors.content}</p>
            )}
            {formState.errors.formError && (
              <div className="border border-red-600 bg-red-200 p-2 text-center rounded-lg text-red-600">
                {formState.errors.formError + "!"}
              </div>
            )}
          </div>
          <div className="mb-2">
            <Label htmlFor="image" className="text-right my-2">
              Upload Image
            </Label>
            <Input type="file" accept="image/*" onChange={handleUpload} />
            <input
              key={imageUrl}
              type="hidden"
              id="postImage"
              name="postImage"
              value={imageUrl}
            />
          </div>
          {isUploading && (
            <div className="flex flex-row justify-center items-center gap-2 my-2">
              <p className="text-sm text-gray-600">Uploading</p>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-500">
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className=" border-0 text-white bg-black w-full"
              type="submit"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateForm;
