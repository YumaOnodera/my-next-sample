import React from "react";

import type { Status } from "types/status";

const AuthSessionStatus: React.FC<{ status: Status; props?: Object }> = ({
  status,
  ...props
}) => <>{status && <div {...props}>{status}</div>}</>;

export default AuthSessionStatus;
