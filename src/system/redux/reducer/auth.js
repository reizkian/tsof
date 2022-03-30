import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    firebaseAuth: {},
    personalData: {},
  },
  reducers: {
    setFirebaseAuth: (state, action) => {
      state.firebaseAuth = action.payload;
    },
    setPersonalData: (state, action) => {
      state.personalData = action.payload;
    },
  },
});

export const { setFirebaseAuth, setPersonalData } = authSlice.actions;
export default authSlice.reducer;