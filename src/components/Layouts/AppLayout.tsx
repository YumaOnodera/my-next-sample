import Link from "next/link";
import React, { ReactNode } from "react";

import { useAuth } from "hooks/useAuth";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth({ middleware: "auth" });

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

          <div>投稿</div>
        </nav>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
