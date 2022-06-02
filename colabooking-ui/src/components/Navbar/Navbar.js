import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { userNavItems, adminNavItems } from "./NavbarItems";
import WalletButton from "../WalletButton/WalletButton";
import { navbarStyles } from "./styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  ...navbarStyles.drawerHeader,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    ...navbarStyles.drawer,
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": { ...openedMixin(theme), /*backgroundColor: '#101F33', color: 'rgb(255,255,255,0.7)'*/ },
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": { ...closedMixin(theme), /*backgroundColor: '#101F33', color: 'rgb(255,255,255,0.7)'*/ },
    }),
  }),
);

const NavBar = () => {
  const [open, setOpen] = useState(true);

  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation() ;
  const title = `Cola Booking System ${pathname ? "- " + pathname.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, " ") : "" }`;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navItems = (items) => items.map((item, ) =>
    <ListItem key={item.id} disablePadding sx={ navbarStyles.listItem } onClick={()=> navigate(item.route) } >
      <ListItemButton
        sx={ navbarStyles.itemButton }
      >
        <ListItemIcon
          sx={open ? navbarStyles.iconsExpanded : navbarStyles.iconsCompressed}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} sx={ open ? navbarStyles.ListItemTextOpen : navbarStyles.ListItemTextClose } />
      </ListItemButton>
    </ListItem>
  );

  return(
    <Box>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={ open ? navbarStyles.iconAppOpen : navbarStyles.iconAppClose }
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            textTransform= 'capitalize'
            sx={ navbarStyles.typography }
          >
            {title}
          </Typography>
          <WalletButton
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={ navbarStyles.divider }/>
        <List component="nav">

          {/* <ListItem key={0} disablePadding sx={ navbarStyles.listItem }>
            <ListItemText primary={'Build'}  sx={ open ? navbarStyles.ListItemTextOpen : navbarStyles.ListItemTextClose } />
          </ListItem>  */}

          {navItems(userNavItems,)}
        </List>
        <Divider sx={ navbarStyles.divider }/>
        <List>
          {navItems(adminNavItems)}
        </List>
        <Divider sx={ navbarStyles.divider }/>
      </Drawer>
    </Box>
  );
};

export default NavBar;