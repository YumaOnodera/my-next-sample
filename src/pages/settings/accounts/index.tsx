import Link from "next/link";

import AppLayout from "components/Layouts/AppLayout";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <AppLayout
      title="アカウント"
      description="アカウント画面"
      middleware="auth"
    >
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
