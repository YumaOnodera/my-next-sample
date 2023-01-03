import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";

import type { UpdatePassword } from "types/passwordResets";

export const usePasswordResets = () => {
  const { objectValuesToString } = useFormat();

  const updatePassword: UpdatePassword = async ({
    setErrors,
    setUpdatePasswordCompleted,
    setPassword,
    setNewPassword,
    setNewPasswordConfirmation,
    ...props
  }) => {
    setErrors([]);
    setUpdatePasswordCompleted(false);

    axios
      .put(`/api/password-resets`, props)
      .then(() => {
        setPassword("");
        setNewPassword("");
        setNewPasswordConfirmation("");
        setUpdatePasswordCompleted(true);
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  return {
    updatePassword,
  };
};
