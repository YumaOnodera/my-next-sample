import { Dispatch, SetStateAction } from "react";

import type { SetErrors } from "types/errors";
import type { SetStatus } from "types/status";

type AuthProps = {
  middleware?: string;
  redirectIfAuthenticated?: string;
};

type User = {
  id: number;
  name: string;
  email?: string;
  email_verified_at?: string;
  is_admin?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type Register = (params: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: SetErrors;
}) => Promise<void>;

type RestoreToken = (params: {
  email: string;
  password: string;
  setErrors: SetErrors;
}) => Promise<string>;

type Restore = (params: {
  restore_token: string;
  setErrors: SetErrors;
  setRestoreCompleted: Dispatch<SetStateAction<boolean>>;
}) => Promise<void>;

type Login = (params: {
  setErrors: SetErrors;
  setStatus: SetStatus;
  email: string;
  password: string;
}) => Promise<void>;

type ForgotPassword = (params: {
  setErrors: SetErrors;
  setStatus: SetStatus;
  email: string;
}) => Promise<void>;

type ResetPassword = (params: {
  setErrors: SetErrors;
  setStatus: SetStatus;
  email: string;
  password: string;
  password_confirmation: string;
}) => Promise<void>;

type ResendEmailVerification = (params: { setStatus: SetStatus }) => void;

export type {
  AuthProps,
  User,
  Register,
  RestoreToken,
  Restore,
  Login,
  ForgotPassword,
  ResetPassword,
  ResendEmailVerification,
};
