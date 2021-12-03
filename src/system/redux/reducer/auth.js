import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    firebaseAuth: {},
    test:"test",
  },
  reducers: {
    setFirebaseAuth: (state, action) => {
      state.firebaseAuth = action.payload;
    },
    setTest: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const { setFirebaseAuth, setTest } = authSlice.actions;
export default authSlice.reducer;