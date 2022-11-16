import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import GuestLayout from "components/Layouts/GuestLayout";
import { useAuth } from "hooks/auth";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Restore: NextPage = () => {
  const router = useRouter();

  const { restore } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [restoreToken, setRestoreToken] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [restoreCompleted, setRestoreCompleted] = useState(false);

  useEffect(() => {
    const token = router.query.token?.toString();
    if (token) {
      setRestoreToken(token);
    } else {
      router.push("/404");
    }
  }, [router]);

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await restore({
      restore_token: restoreToken,
      setErrors,
      setRestoreCompleted,
    });
  };

  return (
    <GuestLayout>
      {/* Validation Errors */}
      <AuthValidationErrors errors={errors} />

      {restoreCompleted ? (
        <>
          <div>アカウントを復活しました。</div>

          <Link href="/login">
            <a>ログインはこちら</a>
          </Link>
        </>
      ) : (
        <>
          <div>
            アカウントは退会手続きが行われています。
            <br />
            アカウントの復活を希望する場合は「復活する」をクリックしてください。
          </div>

          <form onSubmit={submitForm}>
            <button type="submit">復活する</button>
          </form>
        </>
      )}
    </GuestLayout>
  );
};

export default Restore;
