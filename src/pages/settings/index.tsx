import Link from "next/link";

import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  const { auth, logout } = useAuth();

  return (
    <AppLayout title="設定" description="設定画面">
      <hr />
      {auth && (
        <div>
          <Link href="/settings/accounts">
            <a>アカウント</a>
          </Link>
        </div>
      )}
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
      {auth && <div onClick={logout}>ログアウト</div>}
    </AppLayout>
  );
};

export default Settings;
