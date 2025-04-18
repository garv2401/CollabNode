import PostList from "@/components/posts/PostList";
import { fetchPostsBySearch } from "@/lib/query/post";
import React from "react";

type SearchProps = {
  searchParams: Promise<{ term: string }>;
};

const SearchPage: React.FC<SearchProps> = async ({ searchParams }) => {
  const term = (await searchParams).term;
  return (
    <>
      <p className="text-blue-600 font-medium italic m-3">
        Search results for {term}
      </p>

      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 col-start-2">
          <PostList fetchData={() => fetchPostsBySearch(term)} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
