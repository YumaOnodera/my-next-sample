import React, { ReactNode } from "react";

import { useAuth } from "hooks/auth";

const AppLayout: React.FC<{ header: ReactNode; children: ReactNode }> = ({
  header,
  children,
}) => {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div>
      {/* Page Heading */}
      <header>
        <div>{header}</div>
      </header>

      {/* Page Content */}
      <main>
        {children}
        {user?.name}
        {user?.email}
      </main>
    </div>
  );
};

export default AppLayout;
