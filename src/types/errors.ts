import { Dispatch, SetStateAction } from "react";

type Errors = string[];
type SetErrors = Dispatch<SetStateAction<Errors>>;

export type { Errors, SetErrors };
