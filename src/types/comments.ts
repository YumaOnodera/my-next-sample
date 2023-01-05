import type { SetErrors } from "types/errors";

type Comments = {
  id: number;
  post_id: number;
  user_id: number;
  text: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}[];

type StoreComment = (params: {
  post_id: string;
  text: string;
  setErrors: SetErrors;
}) => Promise<void>;

export type { Comments, StoreComment };
