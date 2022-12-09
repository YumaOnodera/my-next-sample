import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { usePosts } from "hooks/usePosts";
import { togglePostModal } from "store/modules/postModal";
import { setKeyword, setOrder } from "store/modules/postSearch";

import type { NextPage } from "next";
import type { RootState } from "store/types/rootState";
import type { Errors } from "types/errors";

const Home: NextPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<Errors>([]);
  const [inputPost, setInputPost] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [sortSelectionOpen, setSortSelectionOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const { auth } = useAuth();
  const { posts, storePost } = usePosts();

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await storePost({ text: inputPost, setErrors });

    setInputPost("");
    dispatch(togglePostModal());
  };

  const submitSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const order = searchText ? "" : "created_at:desc";

    dispatch(setKeyword(searchText));
    dispatch(setOrder(order));

    setSearchBarOpen(false);
  };

  return (
    <AppLayout title="ホーム" description="ホーム画面" auth={auth}>
      <hr />
      <div>
        <button onClick={() => setSearchBarOpen((prev) => !prev)}>検索</button>
        {searchBarOpen && (
          <form onSubmit={submitSearch}>
            <input
              id="search"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        )}

        <button onClick={() => setSortSelectionOpen((prev) => !prev)}>
          ソート
        </button>
        {sortSelectionOpen && (
          <select
            value={state.postSearch.order_by + ":" + state.postSearch.order}
            onChange={(e) => dispatch(setOrder(e.target.value))}
          >
            <option value="">関連度順</option>
            <option value="created_at:desc">作成日が新しい順</option>
            <option value="created_at:asc">作成日が古い順</option>
          </select>
        )}
      </div>

      {state.postModal && (
        <form onSubmit={submitForm}>
          <textarea
            id="name"
            value={inputPost}
            onChange={(e) => setInputPost(e.target.value)}
          />
          <button type="submit">投稿</button>
        </form>
      )}

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
