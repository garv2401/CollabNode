import React from "react";
import { fetchPostsByUserId } from "@/lib/query/post";
import { auth } from "@/auth";
//import { redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const MyPostpage = async () => {
  const session = await auth();
  return (
    <>
      <div className="w-full md:w-2/3 p-3 md:p-0 flex flex-row-reverse justify-between items-center mx-auto">
        <Link href={`/`}>
          <Button
            variant="link"
            className="flex items-center text-blue-600 hover:underline"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to home</span>
          </Button>
        </Link>
        <p className="font-semibold text-lg text-center m-2">Shared Posts</p>
      </div>
      <div className="w-full md:w-2/3 p-3 md:p-0 md:mx-auto">
        <PostList
          fetchData={() => fetchPostsByUserId(session?.user?.id || "")}
        />
      </div>
    </>
  );
};

export default MyPostpage;
