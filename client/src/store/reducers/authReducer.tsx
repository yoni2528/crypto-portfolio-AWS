import { createSlice } from "@reduxjs/toolkit/";

export type Auth = {
  token: string;
  isLoggedIn: boolean;
};

const initialAuthState: Auth = {
  token: "",
  isLoggedIn: false,
};

export const authReducer = createSlice({
  initialState: initialAuthState,
  name: "errorModal",
  reducers: {
    Login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authReducer.actions;
