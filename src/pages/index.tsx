import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import AppLayout from "components/Layouts/AppLayout";
import { usePosts } from "hooks/usePosts";
import { useSearch } from "hooks/useSearch";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [sortSelectionOpen, setSortSelectionOpen] = useState(false);

  const { posts } = usePosts();
  const { searchAction } = useSearch();

  const execSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await searchAction({
      keyword,
      setSort,
      setSearchBarOpen,
      setSortSelectionOpen,
    });
  };

  const execSort = async (sortValue: string) => {
    await searchAction({
      keyword,
      sortValue,
      setSort,
      setSearchBarOpen,
      setSortSelectionOpen,
    });
  };

  return (
    <AppLayout title="ホーム" description="ホーム画面">
      <hr />
      <div>
        <button onClick={() => setSearchBarOpen((prev) => !prev)}>検索</button>
        {searchBarOpen && (
          <form onSubmit={execSearch}>
            <input
              id="search"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        )}

        <button onClick={() => setSortSelectionOpen((prev) => !prev)}>
          ソート
        </button>
        {sortSelectionOpen && (
          <select value={sort} onChange={(e) => execSort(e.target.value)}>
            <option value="">関連度順</option>
            <option value="created_at:desc">作成日が新しい順</option>
            <option value="created_at:asc">作成日が古い順</option>
          </select>
        )}
      </div>

      {posts?.data.map((post) => {
        return (
          <div key={post.id}>
            <hr />
            <div
              onClick={() =>
                router.push(`/${post.user_id}/articles/${post.id}`)
              }
            >
              {post.text}
            </div>
            <Link href={`/${post.user_id}`}>
              <a>{post.created_by}</a>
            </Link>
          </div>
        );
      })}
    </AppLayout>
  );
};

export default Home;
