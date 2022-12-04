import { useSelector } from "react-redux";
import useSWR from "swr";

import { useFetcher } from "hooks/swr/useFetcher";
import { useFormat } from "hooks/useFormat";
import { RootState } from "store/types/rootState";

import type { Posts } from "types/posts";

export const useIndexForPosts = () => {
  const state = useSelector((state: RootState) => state);
  const { createQuery } = useFormat();

  const { data: posts, mutate } = useSWR<Posts>(
    `/api/posts?${createQuery(state.postSearch)}`,
    useFetcher
  );

  return { posts, mutate };
};
