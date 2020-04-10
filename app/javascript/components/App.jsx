import React, {  useState, useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import 'typeface-roboto';

import Navbar from "./navbar/Navbar";
import SignIn from "./signin/SignIn"
import SignUp from "./signup/SignUp"
import Dashboard from "./dashboard/Dashboard"
import NavbarSearchContextProvider from "./providers/NavbarSearchTextProvider";
import UserLoginStateProvider from "./providers/UserLoginStateProvider";

const getRememberedThemePreference = () => {
  const theme = localStorage.getItem('themePreference');
  return (theme === null )? 'light' : theme;
}

export default function App() {
  const [themePreference, setThemePreference] = React.useState(getRememberedThemePreference());
  // Represents the state for navbar actions
  const [navbarActions, setNavbarActions] = useState({ searchText: '' });

  useEffect(() => {
    const saveThemePreferenceToLocalStorage = () => {
      localStorage.setItem('themePreference', themePreference);
    }
    saveThemePreferenceToLocalStorage();
  }, [themePreference])

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
            setNavbarAction={setNavbarActions}
          />
        </UserLoginStateProvider>
        <NavbarSearchContextProvider
          setNavbarActions={setNavbarActions}
          navbarActions={navbarActions}
        >
          <Route path={"/"} exact component={Dashboard} />
        </NavbarSearchContextProvider>
        <Route path={"/signin"} component={SignIn} />
        <Route path={"/signup"} component={SignUp} />
      </ThemeProvider>
    </BrowserRouter>
  );
}
