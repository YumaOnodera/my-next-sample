import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { togglePostModal } from "store/modules/postModal";
import { reset } from "store/modules/postSearch";

import type { SideMenuProps } from "types/sideMenuProps";

const SideMenu: React.FC<SideMenuProps> = ({ auth }) => {
  const dispatch = useDispatch();
  const [othersMenuOpen, setOthersMenuOpen] = useState(false);

  return (
    <nav>
      <div onClick={() => dispatch(reset())}>
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

          <button type="button" onClick={() => dispatch(togglePostModal())}>
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

      <div onClick={() => setOthersMenuOpen((prev) => !prev)}>その他</div>
      {othersMenuOpen && (
        <div>
          {auth && <div>{auth.name}</div>}
          <div>
            <Link href="/settings">
              <a>設定</a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a>ヘルプ</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SideMenu;
