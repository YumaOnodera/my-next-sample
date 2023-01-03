import { useRouter } from "next/router";
import useSWR from "swr";

import { useCsrf } from "hooks/useCsrf";
import { useFormat } from "hooks/useFormat";
import { useSwrSettings } from "hooks/useSwrSettings";
import axios from "libs/axios";

import type {
  ForgotPassword,
  Login,
  Register,
  ResendEmailVerification,
  ResetPassword,
  Restore,
  RestoreToken,
  User,
} from "types/auth";

export const useAuth = () => {
  const router = useRouter();

  const csrf = useCsrf();
  const { objectValuesToString } = useFormat();
  const { config } = useSwrSettings();

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      });

  const {
    data: auth,
    mutate: mutateAuth,
    error: errorAuth,
  } = useSWR<User>("/api/user", fetcher, config());

  const register: Register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutateAuth())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const restoreToken: RestoreToken = async ({
    setErrors,
    setStatus,
    ...props
  }) => {
    await csrf();

    setErrors([]);
    setStatus("");

    return axios
      .post("/restore-token", props)
      .then((response) => {
        const token = response.data.restore_token;

        token
          ? router.push("/restore?token=" + token)
          : login({ setErrors, setStatus, ...props });
      })
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
      .then(() => mutateAuth())
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
    if (!errorAuth) {
      await axios.post("/logout").then(() => mutateAuth());
    }

    window.location.pathname = "/login";
  };

  return {
    auth,
    mutateAuth,
    errorAuth,
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
