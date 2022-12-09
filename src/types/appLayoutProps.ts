import { ReactNode } from "react";

import type { User } from "types/users";

type AppLayoutProps = {
  title: string;
  description: string;
  auth?: User;
  children: ReactNode;
};

export type { AppLayoutProps };
