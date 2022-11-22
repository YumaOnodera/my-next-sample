import useSWR from "swr";

import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";
import { StorePost } from "types/posts";

import type { Posts, PostsProps } from "types/posts";

export const usePosts = (props?: PostsProps) => {
  const { objectValuesToString, createQuery } = useFormat();

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  const url = props
    ? "/api/posts?" + createQuery<PostsProps>(props)
    : "/api/posts";

  const { data: posts, mutate } = useSWR<Posts>(url, fetcher);

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
