import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../../database/useInsertData";
import notify from "../../components/shared/useNotification";

// login
export const login = createAsyncThunk("/authSlice/login", async (data) => {
  try {
    const response = await useInsertData("/users/login", data);
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
});

// register
export const register = createAsyncThunk(
  "/authSlice/register",
  async (data) => {
    try {
      const response = await useInsertData("/users/register", data);
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
  login: [],
  signUp: [],
};

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.login = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.signUp = action.payload;
    });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export default authSlice.reducer;
