import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getColaBookingSC } from "../../../components/common/CommonEthereum/CommonEthereum";

const initialState = {
  cocacolaPendingAddresses: [],
  pepsiPendingAddresses: [],
};

const makercheckerSlice = createSlice({
  name: "makerchecker",
  initialState,
  reducers: {
  }, extraReducers(builder) {
    builder
      .addCase(fetchCocacolaPendingAddresses.pending, () => {
        console.log("loading");
      })
      .addCase(fetchCocacolaPendingAddresses.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.cocacolaPendingAddresses = action.payload;
      })
      .addCase(fetchCocacolaPendingAddresses.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchPepsiPendingAddresses.pending, () => {
        console.log("loading");
      })
      .addCase(fetchPepsiPendingAddresses.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.pepsiPendingAddresses = action.payload;
      })
      .addCase(fetchPepsiPendingAddresses.rejected, () => {
        console.log("rejegected");
      })

      .addCase(approvePendingAddress.pending, () => {
        console.log("loading");
      })
      .addCase(approvePendingAddress.fulfilled, (state, ) => {
        console.log("succeding");
        state.status = "succeeded";
      })
      .addCase(approvePendingAddress.rejected, () => {
        console.log("rejegected");
      });
  }
});

const sc = getColaBookingSC();

const filter0xAddresses = list => list.filter(address => ethers.utils.getAddress("0x0000000000000000000000000000000000000000") !== ethers.utils.getAddress(address));

export const fetchCocacolaPendingAddresses = createAsyncThunk("makerchecker/fetchCocacolaPendingAddresses", async () => {
  const employeesList = await sc.getPendingEmployeesOf(0);
  const employeesListFiltered = filter0xAddresses(employeesList);
  return employeesListFiltered;
});

export const fetchPepsiPendingAddresses = createAsyncThunk("makerchecker/fetchPepsiPendingAddresses", async () => {
  const employeesList = await sc.getPendingEmployeesOf(1);
  const employeesListFiltered = filter0xAddresses(employeesList);
  return employeesListFiltered;
});

export const approvePendingAddress = createAsyncThunk("makerchecker/approvePendingAddress", async ({ companyId, address }) => {
  await sc.approveEmployee(companyId, address);
});

export const cocacolaPendingAddresses = (state) => state.makerchecker.cocacolaPendingAddresses;
export const pepsiPendingAddresses = (state) => state.makerchecker.pepsiPendingAddresses;

export default makercheckerSlice.reducer;