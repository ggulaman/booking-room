import React from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Grid container>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Box >
          <Outlet/>
        </Box>
      </Box>
    </Grid>
  );
}

export default App;
