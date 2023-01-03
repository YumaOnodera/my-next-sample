import { Dispatch, SetStateAction } from "react";

import type { SetErrors } from "types/errors";

type UpdatePassword = (params: {
  password: string;
  new_password: string;
  new_password_confirmation: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setNewPasswordConfirmation: Dispatch<SetStateAction<string>>;
  setUpdatePasswordCompleted: Dispatch<SetStateAction<boolean>>;
  setErrors: SetErrors;
}) => Promise<void>;

export type { UpdatePassword };
