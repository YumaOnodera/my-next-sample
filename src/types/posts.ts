import { SetErrors } from "./errors";

import type { Paginate } from "types/Paginate";

type PostsProps = {
  page?: string;
  keyword?: string;
  per_page?: string;
  order_by?: string;
  order?: string;
  user_ids?: string[];
};

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

export type { PostsProps, Post, Posts, StorePost };
