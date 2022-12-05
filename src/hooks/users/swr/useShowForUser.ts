import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import { useConfig } from "hooks/swr/useConfig";
import { useFetcher } from "hooks/swr/useFetcher";
import { User } from "types/users";

export const useShowForUser = () => {
  const router = useRouter();

  const { data: user, error } = useSWR<User>(
    `/api/users/${router.query.user}`,
    useFetcher,
    useConfig()
  );

  useEffect(() => {
    error && router.push("/404");
  }, [error, router]);

  return user;
};
