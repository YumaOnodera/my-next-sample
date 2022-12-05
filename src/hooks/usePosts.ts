import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

import { useFormat } from "hooks/useFormat";
import { useSwrConfig } from "hooks/useSwrConfig";
import { useSwrFetcher } from "hooks/useSwrFetcher";
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
    !router.query.post ? `/api/posts?${createQuery(state.postSearch)}` : null,
    useSwrFetcher,
    useSwrConfig()
  );

  const {
    data: post,
    mutate: mutateShow,
    error,
  } = useSWR<Post>(
    router.query.post ? `/api/posts/${router.query.post}` : null,
    useSwrFetcher,
    useSwrConfig()
  );

  const storePost: StorePost = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/api/posts", props)
      .then(() => mutateIndex())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  const updatePost: UpdatePost = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put(`/api/posts/${router.query.post}`, props)
      .then(() => mutateShow())
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
    deletePost,
  };
};
