import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import { useFormat } from "hooks/useFormat";
import { useSwrConfig } from "hooks/useSwrConfig";
import { useSwrFetcher } from "hooks/useSwrFetcher";
import axios from "libs/axios";

import type { UpdateUser, User } from "types/users";

export const useUsers = () => {
  const router = useRouter();

  const { objectValuesToString } = useFormat();

  const {
    data: user,
    mutate: mutateShow,
    error,
  } = useSWR<User>(
    router.query.user ? `/api/users/${router.query.user}` : null,
    useSwrFetcher,
    useSwrConfig()
  );

  const update: UpdateUser = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put(`/api/users/${props.userId}`, props)
      .then(() => mutateShow())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  useEffect(() => {
    error && router.push("/404");
  }, [error, router]);

  return {
    user,
    update,
  };
};
