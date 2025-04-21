import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostWithData } from "@/lib/query/post";
import Link from "next/link";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
const inter = Inter({ subsets: ["latin"] });

type PostListProps = {
  fetchData: () => Promise<PostWithData[]>;
};

const PostList: React.FC<PostListProps> = async ({ fetchData }) => {
  const posts = await fetchData();
  const session = await auth();

  if(posts.length===0){
    return(
      <div className="text-red-500 font-bold text-center">No data found!</div>
    )
  }


  //console.log(posts);
  return (
    <div className="flex flex-col gap-2 h-[58vh] overflow-y-auto scrollbar-none">
      {posts.map((post, index) => (
        <Card className="border-2 border-gray-300 font-sans" key={post.id}>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              <div className="flex flex-row justify-between">
                <p>{post.title}</p>
                {session?.user?.id ? (
                  <Link
                    href={`/topic/${post.topic.slug}/posts/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View Post
                  </Link>
                ) : (
                  <Link
                    href={`/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View Post
                  </Link>
                )}
              </div>
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 flex justify-between">
              <span>By {post.user.name}</span>
              <span>{post._count.comments} comments</span>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
