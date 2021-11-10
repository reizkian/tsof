import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth.js";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
