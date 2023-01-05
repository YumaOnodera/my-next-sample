import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { usePosts } from "hooks/usePosts";
import { useSearch } from "hooks/useSearch";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const User: NextPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<Errors>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [sortSelectionOpen, setSortSelectionOpen] = useState(false);

  const { auth } = useAuth();
  const { posts } = usePosts();
  const { searchAction } = useSearch();
  const { user, updateUser } = useUsers();

  const execSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setOrder("");

    await searchAction({
      keyword,
      user: router.query.user,
      setSearchBarOpen,
      setSortSelectionOpen,
    });
  };

  const execSort = async (orderValue: string) => {
    setOrder(orderValue);

    await searchAction({
      keyword,
      user: router.query.user,
      order: orderValue,
      setSearchBarOpen,
      setSortSelectionOpen,
    });
  };

  const toggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  const execUpdateUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!auth) return;

    await updateUser({ userId: auth.id, name, setErrors });

    toggleEditable();
  };

  useEffect(() => {
    auth && setName(auth.name);
  }, [auth]);

  return (
    <AppLayout title={name} description="ユーザー画面">
      <hr />
      <AuthValidationErrors errors={errors} />

      <div>
        <button onClick={() => setSearchBarOpen((prev) => !prev)}>検索</button>
        {searchBarOpen && (
          <form onSubmit={execSearch}>
            <input
              id="keyword"
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
          <select value={order} onChange={(e) => execSort(e.target.value)}>
            <option value="">{router.query.keyword ? "関連度" : "最新"}</option>
            <option value="popular">ブックマーク数</option>
          </select>
        )}
      </div>

      {isEditable ? (
        <form onSubmit={execUpdateUser}>
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
