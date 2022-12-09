import Head from "next/head";
import React from "react";

import SideMenu from "components/SideMenu";

import type { AppLayoutProps } from "types/appLayoutProps";

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  description,
  auth,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideMenu auth={auth} />

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
