import Link from "next/link";

import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  const { auth } = useAuth();

  return (
    <AppLayout title="設定" description="設定画面">
      {auth && (
        <div>
          <h3>アカウント</h3>
          <hr />
          <div>
            <Link href="/settings/accounts/email">
              <a>メールアドレス変更</a>
            </Link>
          </div>
          <div>
            <Link href="/settings/accounts/password">
              <a>パスワード変更</a>
            </Link>
          </div>
          <div>
            <Link href="/settings/accounts/remove">
              <a>退会</a>
            </Link>
          </div>
        </div>
      )}
      <div>
        <h3>その他</h3>
        <hr />
        <div>
          <Link href="/">
            <a>ヘルプ</a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a>プライバシーポリシー</a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a>利用規約</a>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
