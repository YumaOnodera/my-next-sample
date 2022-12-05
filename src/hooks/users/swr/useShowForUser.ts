import { useRouter } from "next/router";
import useSWR from "swr";

import { useConfig } from "hooks/swr/useConfig";
import { useFetcher } from "hooks/swr/useFetcher";
import { User } from "types/users";

export const useShowForUser = () => {
  const router = useRouter();

  const { data: user } = useSWR<User>(
    `/api/users/${router.query.user}`,
    useFetcher,
    useConfig()
  );

  return user;
};
