import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Restore: NextPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<Errors>([]);
  const [restoreCompleted, setRestoreCompleted] = useState(false);
  const [restoreToken, setRestoreToken] = useState("");

  const { restore } = useAuth();

  const execRestore = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await restore({
      restore_token: restoreToken,
      setErrors,
      setRestoreCompleted,
    });
  };

  useEffect(() => {
    const token = router.query.token?.toString();

    if (token) {
      setRestoreToken(token);
    } else {
      router.push("/404");
    }
  }, [router]);

  return (
    <AppLayout
      title="アカウント復活"
      description="アカウント復活画面"
      middleware="guest"
    >
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

          <form onSubmit={execRestore}>
            <button type="submit">復活する</button>
          </form>
        </>
      )}
    </AppLayout>
  );
};

export default Restore;
