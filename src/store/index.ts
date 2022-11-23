import { configureStore } from "@reduxjs/toolkit";

import postModalReducer from "store/modules/postModal";
import postSearchReducer from "store/modules/postSearch";

export default configureStore({
  reducer: {
    postModal: postModalReducer,
    postSearch: postSearchReducer,
  },
});
