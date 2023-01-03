import { ReactNode } from "react";

type AppLayoutProps = {
  title: string;
  description: string;
  middleware?: string;
  children: ReactNode;
};

export type { AppLayoutProps };
