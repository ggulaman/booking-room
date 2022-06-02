import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColaBookingSC } from "../../../components/common/CommonEthereum/CommonEthereum";

const initialState = {
  numberOfBookingsPerUser: null,
  numberOfTotalBookings: null,
  bookingIsAvailable: false,
  numberOfCocaColaAvailableRooms: null,
  numberOfPepsiAvailableRooms: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setNumberOfBookingsPerUser: (state, action) => {
      state.numberOfBookingsPerUser = action.payload;
    },
    setNumberOfTotalBookings: (state, action) => {
      state.numberOfTotalBookings = action.payload;
    },
    setNumberOfCocaColaAvailableRooms: (state, action) => {
      state.numberOfCocaColaAvailableRooms = action.payload;
    },
    setPepsiAvailableRooms: (state, action) => {
      state.numberOfPepsiAvailableRooms = action.payload;
    },
  }, extraReducers(builder) {
    builder
      .addCase(fetchNumberOfTotalBookings.pending, () => {
        console.log("loading");
      })
      .addCase(fetchNumberOfTotalBookings.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.numberOfTotalBookings = action.payload;
      })
      .addCase(fetchNumberOfTotalBookings.rejected, () => {
        console.log("rejegected");
      })
      .addCase(fetchMaxNumberOfBookingsPerUser.pending, () => {
        console.log("loading");
      })
      .addCase(fetchMaxNumberOfBookingsPerUser.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.numberOfBookingsPerUser = action.payload;
      })
      .addCase(fetchMaxNumberOfBookingsPerUser.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchBookingIsAvailable.pending, () => {
        console.log("loading");
      })
      .addCase(fetchBookingIsAvailable.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.bookingIsAvailable = action.payload;
      })
      .addCase(fetchBookingIsAvailable.rejected, () => {
        console.log("rejegected");
      })

      .addCase(setDisableEnableBooking.pending, () => {
        console.log("loading");
      })
      .addCase(setDisableEnableBooking.fulfilled, (state) => {
        console.log("succeding");
        state.status = "succeeded";
      })
      .addCase(setDisableEnableBooking.rejected, () => {
        console.log("rejegected");
      })

      .addCase(setNewMaxBookingsPerUser.pending, () => {
        console.log("loading");
      })
      .addCase(setNewMaxBookingsPerUser.fulfilled, (state) => {
        console.log("succeding");
        state.status = "succeeded";
      })
      .addCase(setNewMaxBookingsPerUser.rejected, () => {
        console.log("rejegected");
      });
  }
});

const sc = getColaBookingSC();

export const fetchMaxNumberOfBookingsPerUser = createAsyncThunk("admin/fetchMaxNumberOfBookingsPerUser", async () => {
  const maxBookingsPerUser = await sc.maxBookingsPerUser();
  return maxBookingsPerUser.toNumber();
});

export const fetchNumberOfTotalBookings = createAsyncThunk("admin/fetchNumberOfTotalBookings", async () => {
  const numberOfTotalBookings = await sc.getBookingCounter();
  return numberOfTotalBookings.toNumber();
});

export const fetchBookingIsAvailable = createAsyncThunk("admin/fetchBookingIsAvailable", async () => {
  const bookingIsAvailable = await sc.canBook();
  return bookingIsAvailable;
});

export const setDisableEnableBooking = createAsyncThunk("admin/setDisableEnableBooking", async (checked) => {
  if (checked) {
    await sc.startBookings();
  } else {
    await sc.stopBookings();
  }
});

export const setNewMaxBookingsPerUser = createAsyncThunk("admin/setNewMaxBookingsPerUser", async (numMaxBookings) => {
  await sc.setMaxBookingPerUser(numMaxBookings);
});

export const { setNumberOfBookingsPerUser, setNumberOfCocaColaAvailableRooms, setPepsiAvailableRooms} = adminSlice.actions;

export const numberOfBookingsPerUser = (state) => state.admin.numberOfBookingsPerUser;
export const bookingIsAvailable = (state) => state.admin.bookingIsAvailable;
export const numberOfTotalBookings = (state) => state.admin.numberOfTotalBookings;
export const numberOfCocaColaAvailableRooms = (state) => state.admin.numberOfCocaColaAvailableRooms;
export const numberOfPepsiAvailableRooms = (state) => state.admin.numberOfPepsiAvailableRooms;

export default adminSlice.reducer;