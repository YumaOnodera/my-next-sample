import { createSlice } from "@reduxjs/toolkit";

const post = createSlice({
  name: "post",
  initialState: {
    content: "",
  },
  reducers: {
    inputPost(state, { payload }) {
      state.content = payload;
    },
  },
});

const { inputPost } = post.actions;

export { inputPost };
export default post.reducer;
