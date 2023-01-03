import { useRouter } from "next/router";
import useSWR from "swr";

import { useFormat } from "hooks/useFormat";
import { useSwrSettings } from "hooks/useSwrSettings";
import axios from "libs/axios";

import type { DeleteUser, UpdateUser, User } from "types/users";

export const useUsers = () => {
  const router = useRouter();

  const { objectValuesToString } = useFormat();
  const { fetcher, config } = useSwrSettings();

  const {
    data: user,
    mutate: mutateUser,
    error: errorUser,
  } = useSWR<User>(
    router.query.user ? `/api/users/${router.query.user}` : null,
    fetcher,
    config()
  );

  const updateUser: UpdateUser = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put(`/api/users/${props.userId}`, props)
      .then(() => mutateUser())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const deleteUser: DeleteUser = async ({ setErrors, logout, ...props }) => {
    setErrors([]);

    axios
      .delete(`/api/users/${props.userId}`, { data: props })
      .then(() => logout())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  return {
    user,
    mutateUser,
    errorUser,
    updateUser,
    deleteUser,
  };
};
