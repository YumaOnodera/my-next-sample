import { useRouter } from "next/router";

import type { SearchAction } from "types/searchAction";
import type { SearchQuery } from "types/searchQuery";

export const useSearch = () => {
  const router = useRouter();

  const searchAction: SearchAction = async ({
    keyword,
    user,
    order,
    setSearchBarOpen,
    setSortSelectionOpen,
  }) => {
    setSearchBarOpen(false);
    setSortSelectionOpen(false);

    const query: SearchQuery = {};

    if (keyword) query["keyword"] = keyword;
    if (user) query["user"] = user;
    if (order) query["order"] = order;

    await router.push({
      query,
    });
  };

  return {
    searchAction,
  };
};
