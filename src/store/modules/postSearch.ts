import { createSlice } from "@reduxjs/toolkit";

import type { PostSearchState } from "store/types/postSearchState";

const initialState: PostSearchState = {
  page: 1,
  keyword: "",
  per_page: 10,
  order_by: "",
  order: "",
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
    setOrder(state, { payload }) {
      const orderValues = payload ? payload.split(":") : ["", ""];
      state.order_by = orderValues[0];
      state.order = orderValues[1];
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

export const { setPage, setKeyword, setPerPage, setOrder, setUserId, reset } =
  postSearch.actions;

export default postSearch.reducer;
