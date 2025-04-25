import React from "react";
import { Button } from "@/components/ui/button";
import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsByTopic } from "@/lib/query/post";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AutoCarousel from "@/components/AutoCarousel";

type TopicShowPageProps = {
  params: Promise<{ slug: string }>;
};

const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const slug = (await params).slug;
  return (
    <div className="">
      <Link href={`/`}>
        <Button variant="link">
          <ChevronLeft />
          Back to home
        </Button>
      </Link>

      <div className="p-4">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 gap-4">
          {/* Posts Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex flex-col lg:flex-row justify-between mb-3 gap-2">
              <h1 className="font-bold text-xl mb-2">
                {slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()}
              </h1>
              <PostCreateForm slug={slug} />
            </div>
            <PostList fetchData={() => fetchPostsByTopic(slug)} />
          </div>

          {/* Carousel Section */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-3 m-4 flex justify-center items-center mb-14">
            <AutoCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicShowPage;
