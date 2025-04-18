import Image from "next/image";
import { Button } from "@/components/ui/button";

import axios from "axios";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { fetchTopPosts } from "@/lib/query/post";
import PostList from "@/components/posts/PostList";
import AutoCarousel from "@/components/AutoCarousel";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-2 ">
        <div className="flex flex-row justify-between items-center mb-1">
          <h1 className="text-xl font-bold m-2 mb-4">Top Posts</h1>
          <div className="">
            <TopicCreateForm />
          </div>
        </div>
        <PostList fetchData={() => fetchTopPosts()} />
      </div>

      <div className="col-span-2 col-start-3 m-4 flex justify-center items-center ">
        <AutoCarousel />
      </div>
    </div>
  );
}
