import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import 'typeface-roboto';

import Navbar from "./navbar/Navbar";
import SignIn from "./signin/SignIn"
import SignUp from "./signup/SignUp"
import Dashboard from "./dashboard/Dashboard"
import UserLoginStateProvider from "./providers/UserLoginStateProvider";


export default function App() {
  const [themePreference, setThemePreference] = React.useState('light');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themePreference
        }
      }), [themePreference]
   );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserLoginStateProvider >
          <Navbar
            setThemePreference={setThemePreference}
            themePreference={themePreference}
            />
        </UserLoginStateProvider>
        <Route path={"/signin"} component={SignIn} />
        <Route path={"/signup"} component={SignUp} />
        <Route path={"/dashboard"} component={Dashboard} />
      </ThemeProvider>
    </BrowserRouter>
  );
}
