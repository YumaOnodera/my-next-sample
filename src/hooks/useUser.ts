import { useRouter } from "next/router";
import useSWR from "swr";

import axios from "libs/axios";

export const useUser = () => {
  const router = useRouter();
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  return {
    user,
    error,
    mutate,
  };
};
