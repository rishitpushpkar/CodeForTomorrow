import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../reducers/newsSlice"

export const store = configureStore({
  reducer: {
    news:newsReducer
  },
});

