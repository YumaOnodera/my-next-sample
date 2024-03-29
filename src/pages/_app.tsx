import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { usePosts } from "hooks/usePosts";
import { useUsers } from "hooks/useUsers";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { errorPost, errorPosts } = usePosts();
  const { errorUser } = useUsers();

  useEffect(() => {
    if (errorPost || errorPosts || errorUser) {
      router.push("/404");
    }
  }, [errorPost, errorPosts, errorUser, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
