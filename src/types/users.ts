import type { SetErrors } from "types/errors";

type UpdateUser = (params: {
  name: string;
  setErrors: SetErrors;
}) => Promise<void>;

export type { UpdateUser };
