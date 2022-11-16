import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthSessionStatus from "components/AuthSessionStatus";
import AuthValidationErrors from "components/AuthValidationErrors";
import GuestLayout from "components/Layouts/GuestLayout";
import { useAuth } from "hooks/auth";

import type { NextPage } from "next";
import type { Errors } from "types/errors";
import type { Status } from "types/status";

const Login: NextPage = () => {
  const router = useRouter();

  const { restoreToken, login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    const reset = router.query.reset?.toString();
    if (reset && errors.length === 0) {
      setStatus(decodeURIComponent(window.atob(reset)));
    } else {
      setStatus(null);
    }
  }, [router, errors]);

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const token = await restoreToken({
      email,
      password,
      setErrors,
    });

    if (token) {
      await router.push("/restore?token=" + token);
    } else {
      await login({ email, password, setErrors, setStatus });
    }
  };

  return (
    <GuestLayout>
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
            autoComplete="current-password"
          />
        </div>

        {/* Remember Me */}
        <div>
          <label htmlFor="remember_me">
            <input id="remember_me" type="checkbox" name="remember" />

            <span>Remember me</span>
          </label>
        </div>

        <div>
          <Link href="/forgot-password">
            <a>Forgot your password?</a>
          </Link>

          <button type="submit">Login</button>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Login;
