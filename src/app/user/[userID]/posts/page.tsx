import React from "react";
import { fetchPostsByUserId } from "@/lib/query/post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const MyPostpage = async () => {
  const session = await auth();
  return (
    <>
      <Link href={`/`}>
        <Button variant={"link"}>
          <ChevronLeft />
          Back to home
        </Button>
      </Link>
      <p className="font-semibold m-2">My Posts...</p>
      <PostList fetchData={() => fetchPostsByUserId(session?.user?.id || "")} />
    </>
  );
};

export default MyPostpage;
