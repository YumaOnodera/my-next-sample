import type { PostSearchState } from "./postSearchState";

type RootState = {
  postSearch: PostSearchState;
  postModal: boolean;
};

export type { RootState };
