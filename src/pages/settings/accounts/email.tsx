import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { useEmailResets } from "hooks/useEmailResets";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Email: NextPage = () => {
  const router = useRouter();

  const { auth, mutate } = useAuth("auth");
  const { sendEmailResetLink, updateEmail } = useEmailResets();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [sendResetLinkCompleted, setSendResetLinkCompleted] = useState(false);
  const [updateEmailCompleted, setUpdateEmailCompleted] = useState(false);

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await sendEmailResetLink({
      new_email: email,
      setSendResetLinkCompleted,
      setUpdateEmailCompleted,
      setErrors,
    });
  };

  const execUpdateEmail = async (token: string) => {
    await updateEmail({
      token,
      setUpdateEmailCompleted,
      setErrors,
    });

    await mutate();
  };

  useEffect(() => {
    auth?.email && setEmail(auth.email);
  }, [auth?.email]);

  useEffect(() => {
    const token = router.query.token?.toString();

    token && execUpdateEmail(token);
  }, [router.query.token]);

  return (
    <AppLayout
      title="メールアドレス変更"
      description="メールアドレス変更画面"
      auth={auth}
    >
      <hr />
      <AuthValidationErrors errors={errors} />

      {sendResetLinkCompleted && (
        <div>
          指定したメールアドレスにメールアドレス確認リンクを送信しました。
        </div>
      )}
      {updateEmailCompleted && <div>メールアドレスを更新しました。</div>}

      <form onSubmit={submitForm}>
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
