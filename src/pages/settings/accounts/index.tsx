import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  const { auth } = useAuth("auth");

  return (
    <AppLayout title="アカウント" description="アカウント画面" auth={auth}>
      <hr />
      <div>メールアドレス変更</div>
      <div>パスワード変更</div>
      <div>退会</div>
    </AppLayout>
  );
};

export default Settings;
