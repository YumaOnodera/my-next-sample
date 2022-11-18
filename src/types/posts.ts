import { Dispatch, SetStateAction } from "react";

import type { Paginate } from "types/Paginate";

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

type PostsParams = (params: {
  setPosts: Dispatch<SetStateAction<Posts>>;
  page: number;
  keyword?: string;
  per_page?: number;
  order_by?: string;
  order?: string;
  user_ids?: number[];
}) => Promise<void>;

export type { Post, Posts, PostsParams };
