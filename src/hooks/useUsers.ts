import { useRouter } from "next/router";
import useSWR from "swr";

import { useAuth } from "hooks/useAuth";
import { useFormat } from "hooks/useFormat";
import { usePosts } from "hooks/usePosts";
import { useSwrSettings } from "hooks/useSwrSettings";
import axios from "libs/axios";

import type {
  DeleteUser,
  RestoreUser,
  UpdatePermission,
  UpdateUser,
  User,
  Users,
} from "types/users";

export const useUsers = () => {
  const router = useRouter();

  const { mutateAuth } = useAuth();
  const { createQueryString, objectValuesToString } = useFormat();
  const { mutatePosts } = usePosts();
  const { fetcher, config } = useSwrSettings();

  const {
    data: users,
    mutate: mutateUsers,
    error: errorUsers,
  } = useSWR<Users>(
    !router.query.user ? `/api/users?${createQueryString(router.query)}` : null,
    fetcher,
    config()
  );

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
      .put(`/api/users/${props.user_id}`, props)
      .then(() => {
        mutateAuth();
        mutatePosts();
        mutateUser();
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const deleteUser: DeleteUser = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .delete(`/api/users/${props.user_id}`, { data: props })
      .then(() => {
        mutateAuth();
        mutateUsers();
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const updatePermission: UpdatePermission = async ({
    setErrors,
    ...props
  }) => {
    setErrors([]);

    axios
      .put(`/api/users/${props.user_id}/update-permission`, props)
      .then(() => mutateUsers())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  const restoreUser: RestoreUser = async ({ user_id, setErrors }) => {
    setErrors([]);

    axios
      .post(`/api/users/${user_id}/restore`)
      .then(() => mutateUsers())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  return {
    users,
    mutateUsers,
    errorUsers,
    user,
    mutateUser,
    errorUser,
    updateUser,
    deleteUser,
    updatePermission,
    restoreUser,
  };
};
