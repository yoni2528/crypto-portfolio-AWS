import { createSlice } from "@reduxjs/toolkit/";
import { tokenData } from "./tokenSelectedReducer";

export type Spinner = {
  isChanged: boolean;
  data?: [tokenData];
};

const initialTokenList: Spinner = {
  isChanged: false,
  data: [{}],
};

export const tokenListReducer = createSlice({
  initialState: initialTokenList,
  name: "tokenList",
  reducers: {
    tokenListChanged(state, action) {
      state.isChanged = !state.isChanged;
      state.data = action.payload;
    },
    triggerChange(state) {
      state.isChanged = !state.isChanged;
    },
  },
});

export const tokenListActions = tokenListReducer.actions;
