import { useState } from "react";

import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { Status } from "types/status";

const VerifyEmail = () => {
  const { auth, logout, resendEmailVerification } = useAuth("auth");

  const [status, setStatus] = useState<Status>(null);

  return (
    <AppLayout
      title="メールアドレス確認"
      description="メールアドレス確認画面"
      auth={auth}
    >
      <div>
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === "verification-link-sent" && (
        <div>
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => resendEmailVerification({ setStatus })}
        >
          Resend Verification Email
        </button>

        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </AppLayout>
  );
};

export default VerifyEmail;
