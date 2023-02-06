import { createSlice } from "@reduxjs/toolkit/";

export type tokenData = {
  name?: string;
  price?: number;
  img?: string;
  quantity?: number;
  totalValue?: number;
  lastDayProfit?: number;
  symbol?: string;
};

export type tokenSelected = {
  name: string;
  side: string;
  data: tokenData;
};

const initialState: tokenSelected = {
  name: "",
  side: "buy",
  data: {},
};

export const tokenSelectedReducer = createSlice({
  initialState: initialState,
  name: "tokenSelected",
  reducers: {
    selectToken(state, action) {
      state.name = action.payload;
    },
    changeSide(state, action) {
      state.side = action.payload;
    },
    tokenSelectedData(state, action) {
      const { name, price, img, lastDayProfit, symbol } = action.payload;
      state.data.name = name;
      state.data.price = price;
      state.data.img = img;
      state.data.lastDayProfit = lastDayProfit;
      state.data.symbol = symbol;
    },
    tokenDefineData(state, action) {
      const { quantity, totalValue } = action.payload;
      state.data.quantity = quantity;
      state.data.totalValue = totalValue;
    },
  },
});

export const tokenSelectedActions = tokenSelectedReducer.actions;
