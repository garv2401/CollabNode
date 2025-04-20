import React from "react";
import { fetchPosts } from "@/lib/query/post";
import { fetchTopics } from "@/lib/query/topic";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopicsHeader = async () => {
  const topics = await fetchTopics();
  const top5topics = topics.slice(0, 5);
  //console.log(posts);
  if (topics.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-4 bg-white">
        {top5topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topic/${topic.slug}`}
            className="text-center py-3 px-4 text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out shadow-sm"
          >
            {topic.slug.toUpperCase()}
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <p className="text-center py-3 px-4 text-sm font-semibold text-blue-500 hover:text-blue-700 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
              See All...
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-3 h-72 w-40 overflow-y-auto scrollbar-none border-2 border-gray-300 z-50 bg-white">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white text-black rounded-xl shadow-md p-2 my-2 hover:bg-gray-900 transition-all duration-200"
              >
                <DropdownMenuItem className="flex justify-center items-center text-md font-semibold hover:text-gray-300 transition-colors h-5">
                  <Link href={`/topic/${topic.slug}`}>{topic.slug}</Link>
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default TopicsHeader;
