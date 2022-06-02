import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CommonDialog = ({ children, openEvent, setOpenEvent, clearUpEvent }) => {

  const handleClose = () => {
    setOpenEvent(false);
    clearUpEvent();
  };

  return (
    <div>
      <Dialog
        open={openEvent}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cola Day Booking Event"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} /*autoFocus*/>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommonDialog;