import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import CommonButton from "../components/common/CommonButton/CommonButton";
import CommonPaper from "../components/common/CommonPaper/CommonPaper";
import CommonSelect from "../components/common/CommonSelect/CommonSelect";
import {
  fetchMaxNumberOfBookingsPerUser,
  fetchNumberOfTotalBookings,
  fetchBookingIsAvailable,
  setDisableEnableBooking,
  setNewMaxBookingsPerUser,
  numberOfBookingsPerUser,
  numberOfTotalBookings,
  bookingIsAvailable,

} from "../app/features/admin/adminSlice";
import { accountIsAdmin } from "../app/features/account/accountSlice";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Settings = () => {
  const [maxBookingsPerUser, setMaxBookingsPerUser] = useState(0);

  const listOfBookingPerUserOptions = [...Array(10).keys()];

  const dispatch = useDispatch();
  const getMaxNumberBookingsPerUser = useSelector(numberOfBookingsPerUser);
  const getNumberOfTotalBookings = useSelector(numberOfTotalBookings);
  const getIfBookingIsAvailable = useSelector(bookingIsAvailable);
  const getIfUserIsAdmin = useSelector(accountIsAdmin);

  useEffect(() => {
    dispatch(fetchNumberOfTotalBookings());
    dispatch(fetchMaxNumberOfBookingsPerUser());
    dispatch(fetchBookingIsAvailable());
  }, []);

  useEffect(() => {
    setMaxBookingsPerUser(getMaxNumberBookingsPerUser);
  }, [getMaxNumberBookingsPerUser]);

  const handleSwitch = e => {
    console.log(e);
    dispatch(setDisableEnableBooking(e.target.checked));
    dispatch(fetchBookingIsAvailable());
  };

  const handleMaxBookingsPerUser = e => {
    setMaxBookingsPerUser(e.target.value);
  };

  const protocolSettingsPaper = () =>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 10, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12} >
          <FormControlLabel
            control={
              <Switch
                {...label}
                checked={getIfBookingIsAvailable}
                onChange={handleSwitch}
                disabled={!getIfUserIsAdmin}
              />}
            label="Disable Bookings" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
          <CommonSelect
            title='Max. Bookings Per User'
            value={maxBookingsPerUser}
            handleChange={handleMaxBookingsPerUser}
            items={listOfBookingPerUserOptions}
            disabled={!getIfUserIsAdmin}
          />
        </Grid>
        <Grid item xs={12} sm={4} >
          <CommonButton
            variant="contained"
            onClick={() => dispatch(setNewMaxBookingsPerUser(maxBookingsPerUser))}
            color='primary'
            sx={{ width: 200, marginLeft: "-25px", marginTop: "5px" }}
            disabled={!getIfUserIsAdmin}
          >
            Save
          </CommonButton>
        </Grid>
      </Grid>
    </Box>;

  const protocolStatistics = () =>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12} >
          <Box>
            <Box sx={{ display: "inline", co: "text.primary", fontWeight: "medium" }}>
                Max Num. Bookings Per User:
            </Box>
            <Box sx={{ color: "text.secondary", display: "inline"}}>
              {getMaxNumberBookingsPerUser ? ` ${getMaxNumberBookingsPerUser}` : " ... "}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box>
            <Box sx={{ display: "inline", color: "text.primary", fontWeight: "medium" }}>
              Number Of Total Booking Receipts:
            </Box>
            <Box sx={{ color: "text.secondary", display: "inline"}}>
              {getNumberOfTotalBookings ? ` ${getNumberOfTotalBookings}` : " ... "}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>;

  return (
    <Box>
      <Grid container spacing={1} >
        <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
          <CommonPaper
            title={"Protocol Settings"}
          >
            {protocolSettingsPaper()}
          </CommonPaper>
        </Grid>
        <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
          <CommonPaper
            title={"Statistics"}
          >
            {protocolStatistics()}
          </CommonPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;