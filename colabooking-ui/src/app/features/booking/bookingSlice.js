import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColaBookingSC } from "../../../components/common/CommonEthereum/CommonEthereum";

const initialState = {
  roomsArrayAt: [],
  newBookingEvent: {}
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearUpNewBookingEvent: (state, ) => {
      state.newBookingEvent = {};
    },
  }, extraReducers(builder) {
    builder
      .addCase(fetchBookingsAt.pending, () => {
        console.log("loading");
      })
      .addCase(fetchBookingsAt.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.roomsArrayAt = action.payload;
      })
      .addCase(fetchBookingsAt.rejected, () => {
        console.log("rejegected");
      })

      .addCase(fetchBookingARoom.pending, () => {
        console.log("loading");
      })
      .addCase(fetchBookingARoom.fulfilled, (state, action) => {
        console.log("succeding");
        state.status = "succeeded";
        state.newBookingEvent = action.payload;
      })
      .addCase(fetchBookingARoom.rejected, () => {
        console.log("rejegected");
      });

  }
});

const sc = getColaBookingSC();

export const fetchBookingsAt = createAsyncThunk("booking/fetchBookingsAt", async ({ companyId, hour }) => {
  const userBookings = await sc.getRoomsStatusPerCompanyAt(companyId, hour);
  return userBookings;
});

export const fetchBookingARoom = createAsyncThunk("booking/fetchBookingARoom", async ({ hour, roomId },) => {

  const tx = await sc.bookARoom(hour, roomId);
  const receipt = await tx.wait();
  const events = receipt.events;
  console.log("events ", JSON.stringify(events));
  if (events.some( ({ event }) => event === "newBooking")){
    const { bookingId, companyId, hour, roomId} = events.find(({ event }) => event === "newBooking").args;

    return ({
      bookingId: bookingId.toNumber(),
      companyId: companyId.toNumber(),
      hour: hour.toNumber(),
      roomId: roomId.toNumber()
    });
  }
});

export const { clearUpNewBookingEvent } = bookingSlice.actions;

export const roomsArrayAt = (state) => state.booking.roomsArrayAt;

export const newBookingEvent = (state) => state.booking.newBookingEvent;

export default bookingSlice.reducer;