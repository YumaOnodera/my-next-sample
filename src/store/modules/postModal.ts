import { createSlice } from "@reduxjs/toolkit";

const postModal = createSlice({
  name: "postModal",
  initialState: false,
  reducers: {
    togglePostModal(state) {
      return !state;
    },
  },
});

export const { togglePostModal } = postModal.actions;

export default postModal.reducer;
