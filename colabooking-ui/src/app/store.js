import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./features/account/accountSlice";
import adminSlice from "./features/admin/adminSlice";
import homeSlice from "./features/home/homeSlice";
import bookingSlice from "./features/booking/bookingSlice";
import signupSlice from "./features/signup/signupSlice";
import makercheckerSlice from "./features/makerchecker/makercheckerSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    admin: adminSlice,
    home: homeSlice,
    booking: bookingSlice,
    signup: signupSlice,
    makerchecker: makercheckerSlice,
  }
});