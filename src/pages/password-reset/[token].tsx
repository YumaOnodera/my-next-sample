import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthSessionStatus from "components/AuthSessionStatus";
import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";

import type { NextPage } from "next";
import type { Errors } from "types/errors";
import type { Status } from "types/status";

const PasswordReset: NextPage = () => {
  const router = useRouter();

  const { resetPassword } = useAuth("guest");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [status, setStatus] = useState<Status>(null);

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    const email = router.query.email?.toString();
    setEmail(email || "");
  }, [router]);

  return (
    <AppLayout title="パスワードリセット" description="パスワードリセット画面">
      {/* Session Status */}
      <AuthSessionStatus status={status} />

      {/* Validation Errors */}
      <AuthValidationErrors errors={errors} />

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </AppLayout>
  );
};

export default PasswordReset;
