import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

import { useConfig } from "hooks/swr/useConfig";
import { useFetcher } from "hooks/swr/useFetcher";
import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";
import { reset, setUserId } from "store/modules/postSearch";
import { Post, Posts } from "types/posts";

import type { RootState } from "store/types/rootState";
import type { StorePost, UpdatePost } from "types/posts";

export const usePosts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { createQuery, objectValuesToString } = useFormat();

  const { data: posts, mutate: mutateIndex } = useSWR<Posts>(
    Object.keys(router.query).length === 0
      ? `/api/posts?${createQuery(state.postSearch)}`
      : null,
    useFetcher,
    useConfig()
  );

  const {
    data: post,
    mutate: mutateShow,
    error,
  } = useSWR<Post>(
    router.query.post ? `/api/posts/${router.query.post}` : null,
    useFetcher,
    useConfig()
  );

  const storePost: StorePost = async ({ setErrors, ...props }) => {
    axios
      .post("/api/posts", props)
      .then(() => mutateIndex())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  const updatePost: UpdatePost = async ({ setErrors, ...props }) => {
    axios
      .put(`/api/posts/${router.query.post}`, props)
      .then(() => mutateShow())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  useEffect(() => {
    error && router.push("/404");
  }, [error, router]);

  useEffect(() => {
    dispatch(reset());
    router.query.user && dispatch(setUserId(router.query.user));
  }, [dispatch, router.query.user]);

  return {
    posts,
    post,
    storePost,
    updatePost,
  };
};
