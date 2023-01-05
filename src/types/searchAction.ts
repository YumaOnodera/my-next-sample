import { Dispatch, SetStateAction } from "react";

type SearchAction = (params: {
  keyword?: string;
  user?: string | string[];
  order?: string;
  setSearchBarOpen: Dispatch<SetStateAction<boolean>>;
  setSortSelectionOpen: Dispatch<SetStateAction<boolean>>;
}) => Promise<void>;

export type { SearchAction };
