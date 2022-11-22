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

const { toggleModal } = postModal.actions;

export { toggleModal };
export default postModal.reducer;
