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
        <Button variant={"link"}>
          <ChevronLeft />
          Back to home
        </Button>
      </Link>

      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-2 ">
          <div className="flex justify-between mb-3">
            <h1 className="font-bold text-xl mb-2">{slug}</h1>
            <PostCreateForm slug={slug} />
          </div>
          <PostList fetchData={() => fetchPostsByTopic(slug)} />
        </div>
        <div className="col-span-2 col-start-3 m-4 flex justify-center items-center mb-14">
          <AutoCarousel />
        </div>
      </div>
    </div>
  );
};

export default TopicShowPage;
