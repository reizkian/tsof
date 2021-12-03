import { configureStore } from "@reduxjs/toolkit";
import authReducer from "system/redux/reducer/auth";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
