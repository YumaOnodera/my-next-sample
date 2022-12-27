import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { usePosts } from "hooks/usePosts";
import { useUsers } from "hooks/useUsers";
import { setKeyword, setOrder } from "store/modules/postSearch";

import type { NextPage } from "next";
import type { RootState } from "store/types/rootState";
import type { Errors } from "types/errors";

const User: NextPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<Errors>([]);
  const [inputPost, setInputPost] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [sortSelectionOpen, setSortSelectionOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const { auth } = useAuth();
  const { posts } = usePosts();
  const { user, updateUser } = useUsers();

  const submitSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const order = searchText ? "" : "created_at:desc";

    dispatch(setKeyword(searchText));
    dispatch(setOrder(order));

    setSearchBarOpen(false);
  };

  const toggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!auth) return;

    await updateUser({ userId: auth.id, name, setErrors });

    toggleEditable();
  };

  useEffect(() => {
    auth && setName(auth.name);
  }, [auth]);

  return (
    <AppLayout title={name} description="ユーザー画面" auth={auth}>
      <hr />
      <AuthValidationErrors errors={errors} />

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

      {isEditable ? (
        <form onSubmit={submitForm}>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">保存</button>
        </form>
      ) : (
        <div>
          <h2>{name}</h2>
          {auth?.id === user?.id && (
            <button onClick={toggleEditable}>編集</button>
          )}
        </div>
      )}

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

export default User;
