import type { SetErrors } from "types/errors";
import type { Paginate } from "types/paginate";

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

type Users =
  | ({
      data: User[];
    } & Paginate)
  | null;

type UpdateUser = (params: {
  user_id: number;
  name: string;
  setErrors: SetErrors;
}) => Promise<void>;

type DeleteUser = (params: {
  user_id: number;
  password?: string;
  setErrors: SetErrors;
}) => Promise<void>;

type UpdatePermission = (params: {
  user_id: number;
  is_admin: boolean;
  setErrors: SetErrors;
}) => Promise<void>;

type RestoreUser = (params: {
  user_id: number;
  setErrors: SetErrors;
}) => Promise<void>;

export type {
  User,
  Users,
  UpdateUser,
  DeleteUser,
  UpdatePermission,
  RestoreUser,
};
