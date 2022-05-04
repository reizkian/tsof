import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    unReadNotifications: {},
  },
  reducers: {
    setUnReadNotifications: (state, action) => {
      state.unReadNotifications = action.payload;
    },
  },
});

export const { setUnReadNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
