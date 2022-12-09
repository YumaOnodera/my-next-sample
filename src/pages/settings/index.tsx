import Link from "next/link";

import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  const { auth, logout } = useAuth("auth");

  return (
    <AppLayout title="設定" description="設定画面" auth={auth}>
      <hr />
      <div>
        <Link href="/settings/accounts">
          <a>アカウント</a>
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
      <div onClick={logout}>ログアウト</div>
    </AppLayout>
  );
};

export default Settings;
