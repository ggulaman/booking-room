import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommonPaper from "../components/common/CommonPaper/CommonPaper";
import CommonButton from "../components/common/CommonButton/CommonButton";
import CommonDialog from "../components/common/CommonDialog/CommonDialog";
import { fetchUserBookings, cancelBooking, userBookings, newCancelationEvent, clearUpNewCancelationEvent } from "../app/features/home/homeSlice";

const getDateFormat = epox => {
  return new Date(epox).toString();
};
const Home = () => {
  const [openEvent, setOpenEvent] = useState(false);

  const dispatch = useDispatch();
  const getMaxNumberBookingsPerUser = useSelector(userBookings);
  const cancelationEvent = useSelector(newCancelationEvent);
  const clearUpCancelationEvent = () => dispatch(clearUpNewCancelationEvent());

  useEffect(() => {
    if (Object.keys(cancelationEvent).length !== 0) {
      setOpenEvent(true);
    }
  }, [cancelationEvent]);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [cancelationEvent]);

  const bookingPageChildrenForm = (key, value) => {
    const title = `${key}: `;
    return (
      <Grid item xs={12} >
        <Box>
          <Box sx={{ display: "inline", co: "text.primary", fontWeight: "medium" }}>
            {title}
          </Box>
          <Box sx={{ color: "text.secondary", display: "inline"}}>
            {value}
          </Box>
        </Box>
      </Grid>
    );
  };

  const bookingPageChildren = (crTime, hour, roomId) => {
    return (
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          { Object.entries({ "Creation Time": getDateFormat(crTime), "Booked Time": hour, "Room Id": roomId }).map(item => bookingPageChildrenForm(item[0], item[1]) )}
        </Grid>
        <CommonButton
          variant="contained"
          onClick={() => dispatch(cancelBooking({ hour, roomId }))}
          color='primary'
          disabled={false}
          sx={{ width: 200, marginLeft: "0px", marginTop: "0px" }}
        >
          Cancel
        </CommonButton>
      </Box>
    );
  };

  const bookingPage = (crTime, company, hour, roomId) =>
    <Grid item xs={12} xl={5} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
      <CommonPaper
        title={company ? "Cocacola" : "Pespi"}
      >
        {bookingPageChildren(crTime, hour, roomId)}
      </CommonPaper>
    </Grid>;

  return (
    <Box>
      <Grid container spacing={1} >
        {getMaxNumberBookingsPerUser.map(({ crTime, company, hour, roomId, user }) => {
          return bookingPage(crTime.toNumber()*1000, company.toNumber(), hour.toNumber(), roomId.toNumber(), user);
        }
        )}
      </Grid>
      <CommonDialog
        openEvent={openEvent}
        setOpenEvent={setOpenEvent}
        clearUpEvent={clearUpCancelationEvent}
      >
        {`Cancelation Completed for ${cancelationEvent.addresscompanyId} at ${cancelationEvent.hour}:00 for ${cancelationEvent.roomId}`}
      </CommonDialog>
    </Box>
  );
};

export default Home;