import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";


export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <h1>Hello, RSSNewsBase</h1>
    </BrowserRouter>
  );
}
