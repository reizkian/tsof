import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    firebaseAuth: {},
  },
  reducers: {
    setFirebaseAuth: (state, action) => {
      state.firebaseAuth = action.payload;
    },
  },
});

export const { setFirebaseAuth } = authSlice.actions;
export default authSlice.reducer;