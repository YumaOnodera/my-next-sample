import { Dispatch, SetStateAction } from "react";

type SearchAction = (params: {
  keyword?: string;
  user?: string | string[];
  sortValue?: string;
  setSort: Dispatch<SetStateAction<string>>;
  setSearchBarOpen: Dispatch<SetStateAction<boolean>>;
  setSortSelectionOpen: Dispatch<SetStateAction<boolean>>;
}) => Promise<void>;

export type { SearchAction };
