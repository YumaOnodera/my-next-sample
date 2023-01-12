import { useRouter } from "next/router";

import type { SearchAction } from "types/searchAction";
import type { SearchQuery } from "types/searchQuery";

export const useSearch = () => {
  const router = useRouter();

  const searchAction: SearchAction = async ({
    keyword,
    user,
    order,
    activeOnly,
    setSearchBarOpen,
    setSortSelectionOpen,
  }) => {
    if (setSearchBarOpen) setSearchBarOpen(false);
    if (setSortSelectionOpen) setSortSelectionOpen(false);

    const query: SearchQuery = {};

    if (keyword) query["keyword"] = keyword;
    if (user) query["user"] = user;
    if (order) query["order"] = order;
    if (activeOnly) query["active_only"] = true;

    await router.push({
      query,
    });
  };

  return {
    searchAction,
  };
};
