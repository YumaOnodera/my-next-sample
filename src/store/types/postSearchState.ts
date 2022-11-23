type PostSearchState = {
  page: number;
  keyword: string;
  per_page: number;
  order_by: string;
  order: string;
  user_ids: number[];
};

export type { PostSearchState };
