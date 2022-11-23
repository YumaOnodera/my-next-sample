import { createSlice } from "@reduxjs/toolkit";

const postModal = createSlice({
  name: "postModal",
  initialState: false,
  reducers: {
    toggleModal(state) {
      return !state;
    },
  },
});

export const { toggleModal } = postModal.actions;

export default postModal.reducer;
