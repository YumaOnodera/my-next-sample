import { configureStore } from "@reduxjs/toolkit";

import postReducer from "store/modules/post";
import postModalReducer from "store/modules/postModal";

export default configureStore({
  reducer: {
    post: postReducer,
    postModal: postModalReducer,
  },
});
