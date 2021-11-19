import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    firebaseAuth: {},
  },
  reducers: {
    setFirebaseAuth: (state, action) => {
      console.log("REDUX: execute setFirebaseAuth() method")
      state.firebaseAuth = action.payload;
      console.log("REDUX PAYLOAD: ", action.payload)
    },
  },
});

export const { setFirebaseAuth } = authSlice.actions;
export default authSlice.reducer;