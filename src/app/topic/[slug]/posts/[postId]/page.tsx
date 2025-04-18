import React, { Suspense } from 'react'
import PostShow from '@/components/posts/postShow';
import CommentCreateForm from '@/components/comments/CommentCreateForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentsShowPage from '@/components/comments/CommentShow';
import CommentList from '@/components/comments/CommentList';


type PostShowPageProps={
  params:Promise<{slug:string,postId:string}>
}

const PostShowPage:React.FC<PostShowPageProps> =async ({params}) => {
  const {slug,postId}=(await params);
  return (
    <div className='space-y-3'>
      <Link href={`/topic/${slug}`}>
        <Button variant={"link"}>
          <ChevronLeft/>
          Back to {slug}
        </Button>
      </Link>
      <Suspense fallback={<p>Loading...</p>}> 
      <PostShow postId={postId}/>
      </Suspense>
      <CommentCreateForm postId={postId} startOpen/>
      <Suspense fallback={<p>Loading comments...</p>}>
      <CommentList postId={postId}/>
      </Suspense>

    </div>
  )
}

export default PostShowPage