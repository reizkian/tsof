import { configureStore } from "@reduxjs/toolkit";
import authReducer from "system/redux/reducer/auth";
import tableReducer from "system/redux/reducer/table";

export default configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer
  },
});
