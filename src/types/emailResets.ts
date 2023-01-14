import { Dispatch, SetStateAction } from "react";

import type { SetErrors } from "types/errors";

type SendEmailResetLink = (params: {
  new_email: string;
  setSendResetLinkCompleted: Dispatch<SetStateAction<boolean>>;
  setUpdateEmailCompleted: Dispatch<SetStateAction<boolean>>;
  setErrors: SetErrors;
}) => Promise<void>;

type UpdateEmail = (params: {
  token: string;
  setUpdateEmailCompleted: Dispatch<SetStateAction<boolean>>;
  setErrors: SetErrors;
}) => Promise<void>;

export type { SendEmailResetLink, UpdateEmail };
