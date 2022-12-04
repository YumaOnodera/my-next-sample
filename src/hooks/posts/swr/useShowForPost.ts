import { useRouter } from "next/router";
import useSWR from "swr";

import { useConfig } from "hooks/swr/useConfig";
import { useFetcher } from "hooks/swr/useFetcher";

import type { Post } from "types/posts";

export const useShowForPost = () => {
  const router = useRouter();

  const { data: post } = useSWR<Post>(
    `/api/posts/${router.query.post}`,
    useFetcher,
    useConfig()
  );

  return post;
};
