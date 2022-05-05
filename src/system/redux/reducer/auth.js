import { createSlice } from "@reduxjs/toolkit";
import { jwtDecodeUtil } from "system/util/jwt";

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
    refreshPersonalData: (state, action) => {
      const encodedPersonalData = localStorage.getItem("personalData");
      const decodedPersonalData = jwtDecodeUtil(encodedPersonalData);

      state.personalData = decodedPersonalData;
    },
  },
});

export const {
  setFirebaseAuth,
  setPersonalData,
  refreshPersonalData,
} = authSlice.actions;
export default authSlice.reducer;
