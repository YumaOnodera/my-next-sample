import { createSlice } from "@reduxjs/toolkit";

import type { PostSearchState } from "store/types/postSearchState";

const initialState: PostSearchState = {
  page: 1,
  keyword: "",
  per_page: 10,
  order_by: "created_at",
  order: "desc",
  user_ids: [],
};

const postSearch = createSlice({
  name: "postSearch",
  initialState: initialState,
  reducers: {
    setPage(state, { payload }) {
      state.page = payload;
    },
    setKeyword(state, { payload }) {
      state.keyword = payload;
    },
    setPerPage(state, { payload }) {
      state.per_page = payload;
    },
    setOrderBy(state, { payload }) {
      state.order_by = payload;
    },
    setOrder(state, { payload }) {
      state.order = payload;
    },
    setUserId(state, { payload }) {
      state.user_ids = [...state.user_ids, payload];
    },
    reset(state) {
      state.page = 1;
      state.keyword = "";
      state.per_page = 10;
      state.order_by = "created_at";
      state.order = "desc";
      state.user_ids = [];
    },
  },
});

export const {
  setPage,
  setKeyword,
  setPerPage,
  setOrderBy,
  setOrder,
  setUserId,
  reset,
} = postSearch.actions;

export default postSearch.reducer;
