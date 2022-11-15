import Link from "next/link";
import { useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import GuestLayout from "components/Layouts/GuestLayout";
import { useAuth } from "hooks/auth";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Register: NextPage = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Errors>([]);

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return (
    <GuestLayout>
      {/* Validation Errors */}
      <AuthValidationErrors errors={errors} />

      <form onSubmit={submitForm}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            autoComplete="new-password"
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
          <Link href="/login">
            <a>Already registered?</a>
          </Link>

          <button type="submit">Register</button>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Register;
