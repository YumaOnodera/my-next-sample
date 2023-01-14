import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { useEmailResets } from "hooks/useEmailResets";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Email: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [sendResetLinkCompleted, setSendResetLinkCompleted] = useState(false);
  const [updateEmailCompleted, setUpdateEmailCompleted] = useState(false);

  const { auth } = useAuth();
  const { sendEmailResetLink, updateEmail } = useEmailResets();

  const execSendEmailResetLink = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await sendEmailResetLink({
      new_email: email,
      setSendResetLinkCompleted,
      setUpdateEmailCompleted,
      setErrors,
    });
  };

  const execUpdateEmail = useCallback(async () => {
    await updateEmail({
      setUpdateEmailCompleted,
      setErrors,
    });
  }, []);

  useEffect(() => {
    auth?.email && setEmail(auth.email);
  }, [auth?.email]);

  useEffect(() => {
    router.query.token && execUpdateEmail();
  }, [execUpdateEmail, router.query.token]);

  return (
    <AppLayout
      title="メールアドレス変更"
      description="メールアドレス変更画面"
      middleware="auth"
    >
      <hr />
      <AuthValidationErrors errors={errors} />

      {sendResetLinkCompleted && (
        <div>
          指定したメールアドレスにメールアドレス確認リンクを送信しました。
        </div>
      )}
      {updateEmailCompleted && <div>メールアドレスを更新しました。</div>}

      <form onSubmit={execSendEmailResetLink}>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </AppLayout>
  );
};

export default Email;
