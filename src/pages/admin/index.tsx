import Link from "next/link";
import React, { useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useSearch } from "hooks/useSearch";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Admin: NextPage = () => {
  const [errors, setErrors] = useState<Errors>([]);
  const [keyword, setKeyword] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const { searchAction } = useSearch();
  const { users, deleteUser, updatePermission, restoreUser } = useUsers();

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

  const restoreUserConfirm = async (name: string, userId: number) => {
    window.confirm(`アカウント「${name}」を復活しますか？`) &&
      (await restoreUser({ user_id: userId, setErrors }));
  };

  const updatePermissionConfirm = async (
    name: string,
    userId: number,
    isAdmin?: boolean
  ) => {
    const type = isAdmin ? "一般ユーザー" : "管理者";

    window.confirm(`アカウント「${name}」の権限を${type}に変更しますか？`) &&
      (await updatePermission({
        user_id: userId,
        is_admin: !isAdmin,
        setErrors,
      }));
  };

  const deleteUserConfirm = async (name: string, userId: number) => {
    window.confirm(`アカウント「${name}」を削除しますか？`) &&
      (await deleteUser({ user_id: userId, setErrors }));
  };

  return (
    <AppLayout title="ユーザー管理" description="ユーザー管理画面">
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
            <th>各種操作</th>
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
                <td>
                  {user.deleted_at ? (
                    <button
                      onClick={() => restoreUserConfirm(user.name, user.id)}
                    >
                      復活
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          updatePermissionConfirm(
                            user.name,
                            user.id,
                            user.is_admin
                          )
                        }
                      >
                        {user.is_admin ? "一般ユーザーにする" : "管理者にする"}
                      </button>
                      <button
                        onClick={() => deleteUserConfirm(user.name, user.id)}
                      >
                        削除
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AppLayout>
  );
};

export default Admin;
