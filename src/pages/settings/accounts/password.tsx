import { useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { usePasswordResets } from "hooks/usePasswordResets";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Password: NextPage = () => {
  const { auth } = useAuth("auth");
  const { updatePassword } = usePasswordResets();

  const [errors, setErrors] = useState<Errors>([]);
  const [updatePasswordCompleted, setUpdatePasswordCompleted] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await updatePassword({
      password,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
      setUpdatePasswordCompleted,
      setPassword,
      setNewPassword,
      setNewPasswordConfirmation,
      setErrors,
    });
  };

  return (
    <AppLayout
      title="パスワード変更"
      description="パスワード変更画面"
      auth={auth}
    >
      <hr />
      <AuthValidationErrors errors={errors} />

      {updatePasswordCompleted && <div>パスワードを更新しました。</div>}

      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="password">現在のパスワード</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">新しいパスワード</label>
          <input
            id="newPassword"
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPasswordConfirmation">
            新しいパスワードを確認
          </label>
          <input
            id="newPasswordConfirmation"
            type="text"
            value={newPasswordConfirmation}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">送信</button>
      </form>
    </AppLayout>
  );
};

export default Password;
