import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/feedbackDetails/commentSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    comments: commentReducer,
  },
});
