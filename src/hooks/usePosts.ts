import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";

import type { PostsParams } from "types/posts";

export const usePosts = () => {
  const { objectValuesToString } = useFormat();

  const getPosts: PostsParams = async ({ setPosts, page, ...props }) => {
    axios
      .post("/api/posts?page=" + page, props)
      .then((response) => setPosts(response.data))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  return {
    getPosts,
  };
};
