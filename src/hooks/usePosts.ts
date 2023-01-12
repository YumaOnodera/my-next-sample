import { ParsedUrlQuery } from "querystring";

import { useRouter } from "next/router";
import useSWR from "swr";

import { useFormat } from "hooks/useFormat";
import { useSwrSettings } from "hooks/useSwrSettings";
import axios from "libs/axios";

import type { Post, Posts, StorePost, UpdatePost } from "types/posts";

export const usePosts = () => {
  const router = useRouter();

  const { createQueryString, objectValuesToString } = useFormat();
  const { fetcher, config } = useSwrSettings();

  const formatQuery = (query: ParsedUrlQuery) => {
    let formattedQuery = { ...query };

    if (query.user) {
      formattedQuery["user_ids"] = [...query.user];
      delete formattedQuery.user;
    }

    return formattedQuery;
  };

  const query = formatQuery(router.query);

  const {
    data: posts,
    mutate: mutatePosts,
    error: errorPosts,
  } = useSWR<Posts>(
    !router.query.post ? `/api/posts?${createQueryString(query)}` : null,
    fetcher,
    config()
  );

  const {
    data: post,
    mutate: mutatePost,
    error: errorPost,
  } = useSWR<Post>(
    router.query.post ? `/api/posts/${router.query.post}` : null,
    fetcher,
    config()
  );

  const storePost: StorePost = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/api/posts", props)
      .then(() => mutatePosts())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  const updatePost: UpdatePost = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put(`/api/posts/${router.query.post}`, props)
      .then(() => mutatePost())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  const deletePost = async () => {
    axios
      .delete(`/api/posts/${router.query.post}`)
      .then(() => router.push("/"))
      .catch((error) => {
        throw error;
      });
  };

  return {
    posts,
    mutatePosts,
    errorPosts,
    post,
    mutatePost,
    errorPost,
    storePost,
    updatePost,
    deletePost,
  };
};
