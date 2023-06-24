import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import authSlice from "./slices/authSlice";
import walletSlice from "./slices/walletSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wallet:walletSlice
  },
  middleware: [thunk],
});
