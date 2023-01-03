import { useState } from "react";

import AuthSessionStatus from "components/AuthSessionStatus";
import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";
import type { Errors } from "types/errors";
import type { Status } from "types/status";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [status, setStatus] = useState<Status>(null);

  const { forgotPassword } = useAuth();

  const execForgotPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <AppLayout
      title="パスワードリセットリンク送信"
      description="パスワードリセットリンク送信画面"
      middleware="guest"
    >
      <div>
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {/* Session Status */}
      <AuthSessionStatus status={status} />

      {/* Validation Errors */}
      <AuthValidationErrors errors={errors} />

      <form onSubmit={execForgotPassword}>
        {/* Email Address */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <button type="submit">Email Password Reset Link</button>
        </div>
      </form>
    </AppLayout>
  );
};

export default ForgotPassword;
