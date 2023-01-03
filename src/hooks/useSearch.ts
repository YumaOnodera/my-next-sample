import { useRouter } from "next/router";

import type { SearchAction } from "types/searchAction";
import type { SearchQuery } from "types/searchQuery";

export const useSearch = () => {
  const router = useRouter();

  const searchAction: SearchAction = async ({
    keyword,
    user,
    sortValue,
    setSort,
    setSearchBarOpen,
    setSortSelectionOpen,
  }) => {
    const query: SearchQuery = {};

    if (keyword) query["keyword"] = keyword;
    if (user) query["user"] = user;

    let orderValues = ["", ""];

    if (sortValue) {
      orderValues = sortValue.split(":");
      query["order_by"] = orderValues[0];
      query["order"] = orderValues[1];
    }

    if (sortValue || sortValue === "") setSort(sortValue);

    setSearchBarOpen(false);
    setSortSelectionOpen(false);

    await router.push({
      query,
    });
  };

  return {
    searchAction,
  };
};
