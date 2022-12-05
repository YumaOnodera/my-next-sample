import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { usePosts } from "hooks/posts/usePosts";
import { useAuth } from "hooks/useAuth";
import { useShowForUser } from "hooks/users/swr/useShowForUser";
import { useUsers } from "hooks/users/useUsers";
import { setKeyword, setOrder } from "store/modules/postSearch";

import type { NextPage } from "next";
import type { RootState } from "store/types/rootState";
import type { Errors } from "types/errors";

const User: NextPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<Errors>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const { posts } = usePosts();
  const { user, logout } = useAuth();
  const contributor = useShowForUser();
  const { update } = useUsers();

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

    await update({ name, setErrors });

    toggleEditable();
  };

  useEffect(() => {
    contributor && setName(contributor.name);
  }, [contributor]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        {/* Validation Errors */}
        <AuthValidationErrors errors={errors} />

        <button onClick={() => setSearchBarOpen((prev) => !prev)}>検索</button>
        <form onSubmit={submitSearch}>
          {searchBarOpen && (
            <input
              id="search"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
        </form>

        <select
          value={`${state.postSearch.order_by}:${state.postSearch.order}`}
          onChange={(e) => dispatch(setOrder(e.target.value))}
        >
          <option value="">関連度順</option>
          <option value="created_at:desc">作成日が新しい順</option>
          <option value="created_at:asc">作成日が古い順</option>
        </select>

        <button type="button" onClick={logout}>
          Logout
        </button>

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
            {user?.id === contributor?.id && (
              <button onClick={toggleEditable}>編集</button>
            )}
          </div>
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
    </>
  );
};

export default User;
