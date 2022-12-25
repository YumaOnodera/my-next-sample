import Link from "next/link";

import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  const { auth } = useAuth("auth");

  return (
    <AppLayout title="アカウント" description="アカウント画面" auth={auth}>
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
    </AppLayout>
  );
};

export default Settings;
