import React, { Suspense } from "react";
import PostShow from "@/components/posts/postShow";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentsShowPage from "@/components/comments/CommentShow";
import CommentList from "@/components/comments/CommentList";

type PostShowPageProps = {
  params: Promise<{ slug: string; postId: string }>;
};

const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postId } = await params;
  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      {/* Back Button */}
      <Link href={`/topic/${slug}`}>
        <Button
          variant="link"
          className="flex items-center space-x-2 text-blue-600 hover:underline"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to {slug}</span>
        </Button>
      </Link>

      {/* Post */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
        <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
          <PostShow postId={postId} />
        </Suspense>
      </div>

      {/* Comment Form */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
        <CommentCreateForm postId={postId} startOpen />
      </div>

      {/* Comments List */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
        <Suspense
          fallback={<p className="text-gray-500">Loading comments...</p>}
        >
          <CommentList postId={postId} />
        </Suspense>
      </div>
    </div>
  );
};

export default PostShowPage;
