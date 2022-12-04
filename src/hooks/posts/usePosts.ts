import { useIndexForPosts } from "hooks/posts/swr/useIndexForPosts";
import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";

import type { StorePost } from "types/posts";

export const usePosts = () => {
  const { mutate } = useIndexForPosts();
  const { objectValuesToString } = useFormat();

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
    storePost,
  };
};
