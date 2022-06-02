import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommonButton from "../common/CommonButton/CommonButton";
import { connectWalletHandler } from "../common/CommonEthereum/CommonEthereum";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserIsCocacolaEmployee, fetchUserIsPepsiEmployee, fetchUserIsCocacolaPendingEmployee, fetchUserIsPepsiPendingEmployee, fetchNumberOfUserBookings, fetchIfUserIsAdmin, setAccount, clearUpAccount, accountAddress } from "../../app/features/account/accountSlice";
import { fetchMaxNumberOfBookingsPerUser, fetchNumberOfTotalBookings, fetchBookingIsAvailable, } from "../../app/features/admin/adminSlice";
const WalletButton = () => {
  const [anchorConnectWallet, setAnchorConnectWallet] = useState(null);
  const openAnchorConnectWallet = Boolean(anchorConnectWallet);

  const userAddress = useSelector(accountAddress);
  const dispatch = useDispatch();
  const setNewAccount = address => dispatch(setAccount(address));

  const handleClick = (event) => {
    setAnchorConnectWallet(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorConnectWallet(null);
    dispatch(setAccount(null));
    dispatch(clearUpAccount());
  };

  useEffect(() => {
    const { ethereum } = window;
    if(ethereum) {
      ethereum.on("chainChanged", () => {
        connectWalletHandler(setNewAccount);
      });
      ethereum.on("accountsChanged", () => {
        connectWalletHandler(setNewAccount);
      });
    }});

  useEffect(() => {
    const { ethereum } = window;
    if(ethereum) {
      dispatch(fetchUserIsCocacolaEmployee());
      dispatch(fetchUserIsPepsiEmployee());
      dispatch(fetchUserIsCocacolaPendingEmployee());
      dispatch(fetchUserIsPepsiPendingEmployee());
      dispatch(fetchNumberOfUserBookings());
      dispatch(fetchNumberOfTotalBookings());
      dispatch(fetchMaxNumberOfBookingsPerUser());
      dispatch(fetchBookingIsAvailable());
      dispatch(fetchIfUserIsAdmin());
    }}, [userAddress]);
  return (
    <Box>
      <CommonButton
        id="connect-wallet-button"
        color='primary'
        disable={false}
        variant='contained'
        sx={{ width: 200 }}
        onClick={!userAddress ? () => connectWalletHandler(setNewAccount) : (e) => handleClick(e)}
      >
        { !userAddress ? "Connect Wallet" : userAddress }
      </CommonButton>
      <Menu
        id="connect-wallet-menu"
        anchorEl={anchorConnectWallet}
        open={openAnchorConnectWallet}
        MenuListProps={{
          "aria-labelledby": "connect-wallet-button",
        }}
      >
        <MenuItem onClick={handleClose}>Disconnect Wallet</MenuItem>
      </Menu>

    </Box>

  );
};

export default WalletButton;