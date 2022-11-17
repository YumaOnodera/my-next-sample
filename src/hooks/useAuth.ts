import { useRouter } from "next/router";
import { useEffect } from "react";

import { useCsrf } from "hooks/useCsrf";
import { useFormat } from "hooks/useFormat";
import { useUser } from "hooks/useUser";
import axios from "libs/axios";

import type {
  AuthProps,
  ForgotPassword,
  Login,
  Register,
  ResendEmailVerification,
  ResetPassword,
  Restore,
  RestoreToken,
} from "types/auth";

export const useAuth = (props?: AuthProps) => {
  const router = useRouter();
  const csrf = useCsrf();
  const { objectValuesToString } = useFormat();
  const { user, error, mutate } = useUser();

  const register: Register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const restoreToken: RestoreToken = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    return axios
      .post("/restore-token", props)
      .then((response) => response.data.restore_token)
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const restore: Restore = async ({
    setErrors,
    setRestoreCompleted,
    ...props
  }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/restore", props)
      .then(() => setRestoreCompleted(true))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const login: Login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus("");

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const forgotPassword: ForgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const resetPassword: ResetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }): Promise<void> => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push(
          "/login?reset=" +
            window.btoa(encodeURIComponent(response.data.status))
        )
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const resendEmailVerification: ResendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (props?.middleware === "guest" && props.redirectIfAuthenticated && user)
      router.push(props.redirectIfAuthenticated);
    if (props?.middleware === "auth" && error) logout();
  }, [
    props?.middleware,
    props?.redirectIfAuthenticated,
    user,
    error,
    router,
    logout,
  ]);

  return {
    user,
    register,
    restoreToken,
    restore,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
