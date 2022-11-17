import Link from "next/link";
import React, { ReactNode } from "react";

const GuestLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* Page Heading */}
      <header>
        <nav>
          <div>
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          </div>

          <div>
            <Link href="/register">
              <a>メールアドレスで登録</a>
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default GuestLayout;
