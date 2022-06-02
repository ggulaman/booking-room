import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import MakerChecker from "./pages/MakerChecker";
import { dashboardTheme } from "./dashboardTheme";
import { store } from "./app/store";

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home/>} />
            <Route path="booking" element={<Booking />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="admin-maker-checker" element={<MakerChecker />} />
            <Route path="admin-settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();