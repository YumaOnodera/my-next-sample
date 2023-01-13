import { Dispatch, SetStateAction } from "react";

import type { SetErrors } from "types/errors";
import type { SetStatus } from "types/status";

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
  setStatus: SetStatus;
  setErrors: SetErrors;
}) => Promise<void>;

type Restore = (params: {
  setRestoreCompleted: Dispatch<SetStateAction<boolean>>;
  setErrors: SetErrors;
}) => Promise<void>;

type Login = (params: {
  email: string;
  password: string;
  setStatus: SetStatus;
  setErrors: SetErrors;
}) => Promise<void>;

type ForgotPassword = (params: {
  email: string;
  setStatus: SetStatus;
  setErrors: SetErrors;
}) => Promise<void>;

type ResetPassword = (params: {
  email: string;
  password: string;
  password_confirmation: string;
  setStatus: SetStatus;
  setErrors: SetErrors;
}) => Promise<void>;

type ResendEmailVerification = (params: { setStatus: SetStatus }) => void;

export type {
  User,
  Register,
  RestoreToken,
  Restore,
  Login,
  ForgotPassword,
  ResetPassword,
  ResendEmailVerification,
};
