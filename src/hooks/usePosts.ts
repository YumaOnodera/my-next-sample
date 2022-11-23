import { useSelector } from "react-redux";
import useSWR from "swr";

import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";
import { RootState } from "store/types/rootState";

import type { Posts, StorePost } from "types/posts";

export const usePosts = () => {
  const state = useSelector((state: RootState) => state);

  const { objectValuesToString, createQuery } = useFormat();

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });

  const { data: posts, mutate } = useSWR<Posts>(
    "/api/posts?" + createQuery(state.postSearch),
    fetcher
  );

  const storePost: StorePost = async ({ setErrors, ...props }) => {
    axios
      .post("/api/posts", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  return {
    posts,
    storePost,
  };
};
