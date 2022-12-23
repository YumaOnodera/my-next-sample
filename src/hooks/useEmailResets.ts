import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";

import type { SendEmailResetLink, UpdateEmail } from "types/emailResets";

export const useEmailResets = () => {
  const { objectValuesToString } = useFormat();

  const sendEmailResetLink: SendEmailResetLink = async ({
    setErrors,
    setSendResetLinkCompleted,
    setUpdateEmailCompleted,
    ...props
  }) => {
    setErrors([]);
    setSendResetLinkCompleted(false);
    setUpdateEmailCompleted(false);

    axios
      .post(`/api/email-resets/send-reset-link`, props)
      .then(() => setSendResetLinkCompleted(true))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const updateEmail: UpdateEmail = async ({
    setErrors,
    setUpdateEmailCompleted,
    ...props
  }) => {
    setErrors([]);

    axios
      .put(`/api/email-resets/${props.token}`, props)
      .then(() => setUpdateEmailCompleted(true))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  return {
    sendEmailResetLink,
    updateEmail,
  };
};
