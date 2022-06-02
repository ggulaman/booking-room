import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";

export const userNavItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: "Home",
    route: "home"
  },
  {
    id: 1,
    icon: <MeetingRoomIcon />,
    label: "Booking",
    route: "booking"
  },
  {
    id: 2,
    icon: <FollowTheSignsIcon />,
    label: "Sign Up",
    route: "signup"
  },
];

export const adminNavItems = [
  {
    id: 0,
    icon: <CheckBoxIcon />,
    label: "Sing Ups Maker Checker",
    route: "admin-maker-checker"
  },
  {
    id: 1,
    icon: <SettingsIcon />,
    label: "Settings",
    route: "admin-settings"
  }
];