import { Dispatch, SetStateAction } from "react";

type Status = string | null;
type SetStatus = Dispatch<SetStateAction<Status>>;

export type { Status, SetStatus };
