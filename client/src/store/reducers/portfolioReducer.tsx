import { createSlice } from "@reduxjs/toolkit/";

export type PortfolioData = {
  totalBalance: number;
  totalProfit?: number;
};

const initialTokenList: PortfolioData = {
  totalBalance: 0,
  totalProfit: 0,
};

export const portfolioReducer = createSlice({
  initialState: initialTokenList,
  name: "tokenList",
  reducers: {
    addPortfolioData(state, action) {
      state.totalBalance = action.payload.totalBalance;
      state.totalProfit = action.payload.totalProfit;
    },
  },
});

export const portfolioActions = portfolioReducer.actions;
