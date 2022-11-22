import Link from "next/link";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "hooks/useAuth";
import { toggleModal } from "store/modules/postModal";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useAuth({ middleware: "auth" });

  const clickHandler = () => {
    dispatch(toggleModal());
  };

  return (
    <div>
      {/* Page Heading */}
      <header>
        <nav>
          <div>
            <Link href="/">
              <a>ホーム</a>
            </Link>
          </div>

          <div>
            <Link href="/profile">
              <a>プロフィール / {user?.name}</a>
            </Link>
          </div>

          <div>検索</div>

          <div>その他</div>

          <div onClick={() => clickHandler()}>投稿</div>
        </nav>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
