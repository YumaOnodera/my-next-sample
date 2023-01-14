import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PostModal from "components/PostModal";
import SideMenu from "components/SideMenu";
import { useAuth } from "hooks/useAuth";

import type { AppLayoutProps } from "types/appLayoutProps";

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  description,
  middleware,
  children,
}) => {
  const router = useRouter();

  const [postModalOpen, setPostModalOpen] = useState(false);

  const { auth, errorAuth, logout } = useAuth();

  useEffect(() => {
    if (middleware === "guest" && auth) router.push("/");
    if (middleware === "auth" && errorAuth) logout();
  }, [auth, errorAuth, logout, middleware, router]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideMenu setPostModalOpen={setPostModalOpen} />

      {postModalOpen && <PostModal setPostModalOpen={setPostModalOpen} />}

      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
