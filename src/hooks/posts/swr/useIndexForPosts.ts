import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

import { useConfig } from "hooks/swr/useConfig";
import { useFetcher } from "hooks/swr/useFetcher";
import { useFormat } from "hooks/useFormat";
import { reset, setUserId } from "store/modules/postSearch";
import { RootState } from "store/types/rootState";

import type { Posts } from "types/posts";

export const useIndexForPosts = () => {
  const state = useSelector((state: RootState) => state);
  const { createQuery } = useFormat();
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: posts, mutate } = useSWR<Posts>(
    `/api/posts?${createQuery(state.postSearch)}`,
    useFetcher,
    useConfig()
  );

  useEffect(() => {
    dispatch(reset());
    router.query.user && dispatch(setUserId(router.query.user));
  }, [dispatch, router.query.user]);

  return { posts, mutate };
};
