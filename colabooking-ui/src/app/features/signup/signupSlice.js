import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColaBookingSC } from "../../../components/common/CommonEthereum/CommonEthereum";

const initialState = {
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
  }, extraReducers(builder) {
    builder
      .addCase(requestSignup.pending, () => {
        console.log("loading");
      })
      .addCase(requestSignup.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.roomsArrayAt = action.payload;
      })
      .addCase(requestSignup.rejected, () => {
        console.log("rejegected");
      });
  }
});

const sc = getColaBookingSC();

export const requestSignup = createAsyncThunk("signup/requestSignup", async (company) => {
  await sc.signUpEmployee(company);
});

export default signupSlice.reducer;