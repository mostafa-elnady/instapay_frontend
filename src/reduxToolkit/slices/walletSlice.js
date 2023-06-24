import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../../database/useInsertData";
import { useGetDataToken } from "../../database/useGetData";
import notify from "../../components/shared/useNotification";

//get all user Transaction
export const getAllUserTransactions = createAsyncThunk(
  "/walletSlice/allTransactions",
  async (userId) => {
    try {
      const response = await useGetDataToken(`/wallets/${userId}`);
      // console.log("response");
      // console.log(response);
      return response;
    } catch (error) {
      console.log("errror");
      console.log(error);
      if (error.message === "Network Error" && !error.response)
        return notify("Network Error - make sure Api is Running ", "error");
      return error.response;
    }
  }
);

//add Transaction
export const addUserTransaction = createAsyncThunk(
  "/walletSlice/addTransaction",
  async (data) => {
    try {
      const response = await useInsertData(`/wallets/`, data);
      // console.log("response");
      // console.log(response);
      return response;
    } catch (error) {
      console.log("errror");
      console.log(error);
      if (error.message === "Network Error" && !error.response)
        return notify("Network Error - make sure Api is Running ", "error");
      return error.response;
    }
  }
);

//get All Users
export const getAllUsers = createAsyncThunk(
    "/authSlice/allUsers",
    async () => {
      try {
        const response = await useGetDataToken("/users/");
        console.log("response");
        console.log(response);
        return response;
      } catch (error) {
        console.log("errror");
        console.log(error);
        if (error.message === "Network Error" && !error.response)
          return notify("Network Error - make sure Api is Running ", "error");
        return error.response;
      }
    }
  );


const initialState = {
  walletTransactions: [],
  addTransaction: [],
  allUsers:[]
};

const walletSlice = createSlice({
  initialState,
  name: "walletSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserTransactions.fulfilled, (state, action) => {
      state.walletTransactions = action.payload;
    });
    builder.addCase(addUserTransaction.fulfilled, (state, action) => {
      state.addTransaction = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = walletSlice.actions;
export default walletSlice.reducer;
