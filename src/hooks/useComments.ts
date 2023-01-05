import { useFormat } from "hooks/useFormat";
import { usePosts } from "hooks/usePosts";
import axios from "libs/axios";

import type { StoreComment } from "types/comments";

export const useComments = () => {
  const { objectValuesToString } = useFormat();
  const { mutatePost } = usePosts();

  const storeComment: StoreComment = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/api/comments", props)
      .then(() => mutatePost())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  const deleteComment = async (id: number) => {
    axios
      .delete(`/api/comments/${id}`)
      .then(() => mutatePost())
      .catch((error) => {
        throw error;
      });
  };

  return {
    storeComment,
    deleteComment,
  };
};
