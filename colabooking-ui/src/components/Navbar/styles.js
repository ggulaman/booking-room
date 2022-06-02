export const navbarStyles = {
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  },
  iconsExpanded: {
    minWidth: 0,
    mr: 3,
    justifyContent: "center",
  },
  iconsCompressed: {
    minWidth: 0,
    mr: "auto",
    justifyContent: "center",
  },
  iconAppOpen: {
    marginRight: 5,
    display: "none"
  },
  iconAppClose: {
    marginRight: 5
  },
  itemButtonOpen: {
    minHeight: 48,
    justifyContent: "initial",
    px: 2.5,
    color: "primary"
  },
  itemButtonClose: {
    minHeight: 48,
    justifyContent: "center",
    px: 2.5,
    color: "primary"
  },
  listItem: {
    display: "block",
    backgroundColor: "primary"
  },
  ListItemTextOpen: {
    opacity: 1,
    "& span": {
      marginLeft: "-10px",
      fontWeigth: "600",
      fontSize: "16px",
    }
  },
  ListItemTextClose: {
    opacity: 0,
    "& span": {
      marginLeft: "-10px",
      fontWeigth: "600",
      fontSize: "16px",
    }
  },
  typography: {
    flexGrow: 1
  },
  divider: {
  }
};