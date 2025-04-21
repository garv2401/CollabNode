import React from "react";
import { fetchLikedPostsByUserID } from "@/lib/query/post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const LikedPostPage = async () => {
  const session = await auth();
  return (
    <>
      <Link href={`/`}>
        <Button variant={"link"}>
          <ChevronLeft />
          Back to home
        </Button>
      </Link>
      <p className="font-semibold m-2 text-lg">Liked Posts...</p>
      <PostList
        fetchData={() => fetchLikedPostsByUserID(session?.user?.id || "")}
      />
    </>
  );
};

export default LikedPostPage;
