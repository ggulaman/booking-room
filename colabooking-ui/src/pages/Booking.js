import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CommonSelect from "../components/common/CommonSelect/CommonSelect";
import CommonPaper from "../components/common/CommonPaper/CommonPaper";
import CommonButton from "../components/common/CommonButton/CommonButton";
import CommonDialog from "../components/common/CommonDialog/CommonDialog";
import { fetchBookingsAt, fetchBookingARoom, roomsArrayAt, newBookingEvent, clearUpNewBookingEvent } from "../app/features/booking/bookingSlice";
import { accountAddress, accountIsCocacolaEmployee, accountIsPepsiEmployee, numberOfUserBookings, fetchNumberOfUserBookings } from "../app/features/account/accountSlice";
import { numberOfBookingsPerUser } from "../app/features/admin/adminSlice";

const Booking = () => {
  const [time, setTime] = useState(1);
  const [openEvent, setOpenEvent] = useState(false);

  const dispatch = useDispatch();
  const getRoomArrayAt = useSelector(roomsArrayAt);

  const userAccount = useSelector(accountAddress);
  const getIfUserIsCocacolaEmployee = useSelector(accountIsCocacolaEmployee);
  const getIfUserIsPepsiEmployee = useSelector(accountIsPepsiEmployee);
  const getNumberOfUserBookings = useSelector(numberOfUserBookings);
  const getMaxNumberBookingsPerUser = useSelector(numberOfBookingsPerUser);
  const bookingEvent = useSelector(newBookingEvent);
  const clearUpBookingEvent = () => dispatch(clearUpNewBookingEvent());

  useEffect(() => {
    if (Object.keys(bookingEvent).length !== 0) {
      setOpenEvent(true);
    }
  }, [bookingEvent]);

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  dispatch(fetchNumberOfUserBookings());

  useEffect(() => {
    if (getIfUserIsCocacolaEmployee || getIfUserIsPepsiEmployee) {
      console.log("numbner of userBookings ", getNumberOfUserBookings);
      console.log("numbner of max Bookings ", getMaxNumberBookingsPerUser);
      dispatch(fetchBookingsAt({ companyId: getIfUserIsCocacolaEmployee ? 0 : 1, hour: time }));
    }
  }, [time, userAccount]);

  const timeList = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
  ];

  const roomPaper = (roomId, disabled) =>
    <CommonButton
      variant="contained"
      onClick={() => dispatch(fetchBookingARoom({ hour: time, roomId }))}
      color='primary'
      disabled={disabled || getMaxNumberBookingsPerUser === getNumberOfUserBookings}
      sx={{ maxWidth: 200, marginLeft: "0px", marginTop: "0px" }}
    >
      {`Room ${roomId}`}
    </CommonButton>;

  const selectBooking = () => <CommonSelect title='Hour to Book' value={time} handleChange={handleChange} items={timeList} disabled={!companyName} />;

  const paperBooking = (receiptId, index) =>
    <Grid item xs={6} xl={4} sx={{ mt: 4, mb: 4, ml: 4, mr:4 }} key={1}>
      <CommonPaper
        title={`Room ${index}`}
      >
        {receiptId === 0 ? roomPaper(index, receiptId > 0) : "Booked"}
      </CommonPaper>
    </Grid>;

  const companyName = getIfUserIsCocacolaEmployee ? "Cocacola" : getIfUserIsPepsiEmployee ? "Pepsi" : false ;

  return (
    <Box sx={{ flexGrow: 1 }}/*sx={{ minWidth: 120 }}*/ /*width='300px'*/ >

      <Grid container spacing={1} >
        <Box sx={{ width: "100%", flexGrow: 1}}>
          <Grid item xs={12} /*xl={5}*/ sx={{ mt: 4, mb: 4, ml: 4, mr:4 }}>
            <CommonPaper
              title={companyName ? getMaxNumberBookingsPerUser > getNumberOfUserBookings ? companyName : "Reached Max. Num. of Bookings" : "Please, connect Metamask and select your valid Employee address"}
            >
              {companyName && selectBooking()}
            </CommonPaper>
          </Grid>
        </Box>

        <Divider sx={{ marginTop: "15px", marginBottom: "15px"}}/>

        {(getIfUserIsCocacolaEmployee || getIfUserIsPepsiEmployee) && getRoomArrayAt.map((receiptId, index) =>
          paperBooking(receiptId.toNumber(), index)
        )}
      </Grid>
      <CommonDialog
        openEvent={openEvent}
        setOpenEvent={setOpenEvent}
        clearUpEvent={clearUpBookingEvent}
      >
        {`Booking Completed: book receipt Id ${bookingEvent.bookingId} for room ${bookingEvent.roomId} at ${bookingEvent.hour}:00`}
      </CommonDialog>
    </Box>
  );
};

export default Booking;