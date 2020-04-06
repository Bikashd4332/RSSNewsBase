import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import 'typeface-roboto';
import Navbar from "./navbar/Navbar";
import UserLoginStateProvider from "./providers/UserLoginStateProvider";


export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <UserLoginStateProvider >
        <Navbar />
      </UserLoginStateProvider>
    </BrowserRouter>
  );
}
