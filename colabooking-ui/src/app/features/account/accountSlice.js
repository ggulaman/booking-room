import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getColaBookingSC } from "../../../components/common/CommonEthereum/CommonEthereum";

const initialState = {
  address: null,
  isCocacolaEmployee: false,
  isPepsiEmployee: false,
  isCocacolaPendingEmployee: false,
  isPepsiPendingEmployee: false,
  numberOfAddressBookings: 0,
  isAdmin: false
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.address = action.payload;
    },
    clearUpAccount: (state, ) => {
      state.isCocacolaEmployee = false;
      state.isPepsiEmployee = false;
      state.isCocacolaPendingEmployee = false;
      state.isPepsiPendingEmployee = false;
    },
  }, extraReducers(builder) {
    builder
      .addCase(fetchUserIsCocacolaEmployee.pending, () => {
        console.log("loading");
      })
      .addCase(fetchUserIsCocacolaEmployee.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.isCocacolaEmployee = action.payload;
      })
      .addCase(fetchUserIsCocacolaEmployee.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchUserIsPepsiEmployee.pending, () => {
        console.log("loading");
      })
      .addCase(fetchUserIsPepsiEmployee.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.isPepsiEmployee = action.payload;
      })
      .addCase(fetchUserIsPepsiEmployee.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchUserIsCocacolaPendingEmployee.pending, () => {
        console.log("loading");
      })
      .addCase(fetchUserIsCocacolaPendingEmployee.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.isCocacolaPendingEmployee = action.payload;
      })
      .addCase(fetchUserIsCocacolaPendingEmployee.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchUserIsPepsiPendingEmployee.pending, () => {
        console.log("loading");
      })
      .addCase(fetchUserIsPepsiPendingEmployee.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.isPepsiPendingEmployee = action.payload;
      })
      .addCase(fetchUserIsPepsiPendingEmployee.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchNumberOfUserBookings.pending, () => {
        console.log("loading");
      })
      .addCase(fetchNumberOfUserBookings.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.numberOfAddressBookings = action.payload;
      })
      .addCase(fetchNumberOfUserBookings.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchIfUserIsAdmin.pending, () => {
        console.log("loading");
      })
      .addCase(fetchIfUserIsAdmin.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.isAdmin = action.payload;
      })
      .addCase(fetchIfUserIsAdmin.rejected, () => {
        console.log("rejegected");
      });
  }
});

const sc = getColaBookingSC();

export const fetchUserIsCocacolaEmployee = createAsyncThunk("account/fetchUserIsCocacolaEmployee", async (_, thunkAPI) => {
  const { account: { address } } = thunkAPI.getState();
  const userIs = await sc.getIfUserBelongsTo(0, address);
  return userIs;
});

export const fetchUserIsPepsiEmployee = createAsyncThunk("account/fetchUserIsPepsiEmployee", async (_, thunkAPI) => {
  const { account: { address } } = thunkAPI.getState();
  const userIs = await sc.getIfUserBelongsTo(1, address);
  return userIs;
});

export const fetchUserIsCocacolaPendingEmployee = createAsyncThunk("account/fetchUserIsCocacolaPendingEmployee", async (_, thunkAPI) => {
  const { account: { address } } = thunkAPI.getState();
  const userIs = await sc.getIfUserPendingFor(0, address);
  return userIs;
});

export const fetchUserIsPepsiPendingEmployee = createAsyncThunk("account/fetchUserIsPepsiPendingEmployee", async (_, thunkAPI) => {
  const { account: { address } } = thunkAPI.getState();
  const userIs = await sc.getIfUserPendingFor(1, address);
  return userIs;
});

export const fetchNumberOfUserBookings = createAsyncThunk("account/fetchNumberOfUserBookings", async () => {
  const numberOfUserBookings = await sc.getNumberOfUserBookings();
  return numberOfUserBookings.toNumber();
});

export const fetchIfUserIsAdmin = createAsyncThunk("account/fetchIfUserIsAdmin", async (_, thunkAPI) => {
  const { account: { address } } = thunkAPI.getState();
  const ownerAddress = await sc.owner();

  return ethers.utils.getAddress(ownerAddress) === ethers.utils.getAddress(address);
});

export const { setAccount, clearUpAccount } = accountSlice.actions;

export const accountAddress = (state) => state.account.address;

export const accountIsCocacolaEmployee = (state) => state.account.isCocacolaEmployee;

export const accountIsPepsiEmployee = (state) => state.account.isPepsiEmployee;

export const accountRegistered = (state) => state.account.isCocacolaEmployee || state.account.isPepsiEmployee || state.account.isCocacolaPendingEmployee || state.account.isPepsiPendingEmployee;

export const accountIsAdmin = (state) => state.account.isAdmin;

export const numberOfUserBookings = (state) => state.account.numberOfAddressBookings;

export default accountSlice.reducer;