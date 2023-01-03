import { Dispatch, SetStateAction } from "react";

import type { User } from "types/users";

type SideMenuProps = {
  setPostModalOpen: Dispatch<SetStateAction<boolean>>;
  auth?: User;
};

export type { SideMenuProps };
