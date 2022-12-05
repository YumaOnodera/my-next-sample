import type { SetErrors } from "types/errors";
import type { Paginate } from "types/paginate";

type Post = {
  id: number;
  user_id: number;
  text: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

type Posts =
  | ({
      data: Post[];
    } & Paginate)
  | null;

type StorePost = (params: {
  text: string;
  setErrors: SetErrors;
}) => Promise<void>;

type UpdatePost = (params: {
  text: string;
  setErrors: SetErrors;
}) => Promise<void>;

export type { Post, Posts, StorePost, UpdatePost };
