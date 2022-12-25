import { useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Remove: NextPage = () => {
  const { auth, logout } = useAuth("auth");
  const { deleteUser } = useUsers();

  const [errors, setErrors] = useState<Errors>([]);
  const [password, setPassword] = useState("");

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!auth) return;

    await deleteUser({
      userId: auth.id,
      password,
      setErrors,
    });

    await logout();
  };

  return (
    <AppLayout
      title="アカウント削除"
      description="アカウント削除画面"
      auth={auth}
    >
      <hr />
      <AuthValidationErrors errors={errors} />

      <h2>アカウントの利用停止</h2>
      <div>
        アカウント情報は退会手続きから30日間のみ保持されます。
        <br />
        30日以降を過ぎますと、完全に削除されアカウントの復活はできませんのでご注意ください。
      </div>

      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="password">現在のパスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">退会する</button>
      </form>
    </AppLayout>
  );
};

export default Remove;
