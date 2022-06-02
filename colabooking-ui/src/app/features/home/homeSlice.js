import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColaBookingSC } from "../../../components/common/CommonEthereum/CommonEthereum";

const initialState = {
  userBookings: [],
  newCancelationEvent: {}
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearUpNewCancelationEvent: (state, ) => {
      state.newCancelationEvent = {};
    },
  }, extraReducers(builder) {
    builder
      .addCase(fetchUserBookings.pending, () => {
        console.log("loading");
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, () => {
        console.log("rejegected");
      })

      .addCase(cancelBooking.pending, () => {
        console.log("loading");
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.newCancelationEvent = action.payload;
      })
      .addCase(cancelBooking.rejected, () => {
        console.log("rejegected");
      });
  }
});

const sc = getColaBookingSC();

export const fetchUserBookings = createAsyncThunk("home/fetchUserBookings", async () => {
  const userBookings = await sc.getUserBookings();
  return userBookings;
});

export const cancelBooking = createAsyncThunk("home/cancelBooking", async ({ hour, roomId }) => {
  const tx = await sc.cancelABooking(hour, roomId);
  const receipt = await tx.wait();
  const events = receipt.events;
  console.log("events ", JSON.stringify(events));
  if (events.some( ({ event }) => event === "bookingCancelation")){
    const { addresscompanyId, _hour, _roomId} = events.find(({ event }) => event === "bookingCancelation").args;

    return ({
      addresscompanyId: addresscompanyId.toNumber(),
      hour: _hour.toNumber(),
      roomId: _roomId.toNumber(),
    });
  }
});

export const { clearUpNewCancelationEvent } = homeSlice.actions;

export const newCancelationEvent = (state) => state.home.newCancelationEvent;

export const userBookings = (state) => state.home.userBookings;
export default homeSlice.reducer;