import Link from "next/link";
import React, { useState } from "react";

import { useAuth } from "hooks/useAuth";

import type { SideMenuProps } from "types/sideMenuProps";

const SideMenu: React.FC<SideMenuProps> = ({ setPostModalOpen }) => {
  const [othersMenuOpen, setOthersMenuOpen] = useState(false);

  const { auth, logout } = useAuth();

  return (
    <nav>
      <div>
        <Link href="/">
          <a>ホーム</a>
        </Link>
      </div>

      {auth ? (
        <>
          <div>
            <Link href={`/${auth.id}`}>
              <a>プロフィール / {auth.name}</a>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setPostModalOpen((prev) => !prev)}
          >
            投稿
          </button>
        </>
      ) : (
        <>
          <button type="button">
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          </button>

          <button type="button">
            <Link href="/register">
              <a>メールアドレスで登録</a>
            </Link>
          </button>
        </>
      )}

      {auth?.is_admin && (
        <div>
          <Link href="/admin">
            <a>ユーザー管理</a>
          </Link>
        </div>
      )}

      <div onClick={() => setOthersMenuOpen((prev) => !prev)}>その他</div>
      {othersMenuOpen && (
        <>
          <div>
            <Link href="/settings">
              <a>設定</a>
            </Link>
          </div>
          {auth && <div onClick={logout}>ログアウト</div>}
        </>
      )}
    </nav>
  );
};

export default SideMenu;
