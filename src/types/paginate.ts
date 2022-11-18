type Paginate = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_item: number;
  last_item: number;
  has_more_pages: boolean;
};

export type { Paginate };
