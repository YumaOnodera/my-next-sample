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
  userId: number;
  name: string;
  setErrors: SetErrors;
}) => Promise<void>;

type DeleteUser = (params: {
  userId: number;
  password: string;
  setErrors: SetErrors;
}) => Promise<void>;

export type { User, Users, UpdateUser, DeleteUser };
