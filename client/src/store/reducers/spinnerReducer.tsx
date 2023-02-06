import { createSlice } from "@reduxjs/toolkit/";

export type Spinner = {
  isLoading: boolean;
};

const initialSpinnerState: Spinner = {
  isLoading: false,
};

export const spinnerReducer = createSlice({
  initialState: initialSpinnerState,
  name: "errorModal",
  reducers: {
    Loading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const spinnerActions = spinnerReducer.actions;
