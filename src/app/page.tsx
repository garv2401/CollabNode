import Image from "next/image";
import { Button } from "@/components/ui/button";

import axios from "axios";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { fetchTopPosts } from "@/lib/query/post";
import PostList from "@/components/posts/PostList";
import AutoCarousel from "@/components/AutoCarousel";

export default async function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col-reverse md:grid md:grid-cols-4 gap-4">
        {/* Posts Section */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h1 className="text-xl font-bold mb-2 md:mb-4">Top Posts</h1>
            <TopicCreateForm />
          </div>
          <PostList fetchData={() => fetchTopPosts()} />
        </div>

        {/* Carousel Section */}
        <div className="md:col-span-2 md:col-start-3 m-4 flex justify-center items-center mb-14">
          <AutoCarousel />
        </div>
      </div>
    </div>
  );
}
