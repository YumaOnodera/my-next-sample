import Link from "next/link";
import React, { useState } from "react";

import AppLayout from "components/Layouts/AppLayout";
import { useSearch } from "hooks/useSearch";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";

const Admin: NextPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const { searchAction } = useSearch();
  const { users } = useUsers();

  const execSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await searchAction({
      keyword,
      setSearchBarOpen,
    });
  };

  const execActiveOnly = async (checked: boolean) => {
    await searchAction({
      keyword,
      activeOnly: checked,
      setSearchBarOpen,
    });
  };

  return (
    <AppLayout title="ユーザー管理" description="ユーザー管理画面">
      <hr />
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
      </div>
      <div>
        <label htmlFor="active_only">有効ユーザーのみ</label>
        <input
          id="active_only"
          type="checkbox"
          name="active_only"
          onChange={(e) => execActiveOnly(e.target.checked)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th>メールアドレス確認日時</th>
            <th>権限種別</th>
            <th>作成日時</th>
            <th>更新日時</th>
            <th>削除日時</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link href={`/${user.id}`}>
                    <a>{user.name}</a>
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>{user.email_verified_at}</td>
                <td>{user.is_admin ? "管理者" : "一般"}</td>
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
                <td>{user.deleted_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AppLayout>
  );
};

export default Admin;
