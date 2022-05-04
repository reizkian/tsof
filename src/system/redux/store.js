import { configureStore } from "@reduxjs/toolkit";
import authReducer from "system/redux/reducer/auth";
import tableReducer from "system/redux/reducer/table";
import notificationsReducer from "system/redux/reducer/notifications";

export default configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    notifications: notificationsReducer,
  },
});
