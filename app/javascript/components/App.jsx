import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import "typeface-roboto";

import Navbar from "./navbar/Navbar";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import Customization from "./customization/Customization";
import Dashboard from "./dashboard/Dashboard";
import NavbarSearchContextProvider from "./providers/NavbarSearchTextProvider";
import UserLoginStateProvider from "./providers/UserLoginStateProvider";
import AuthService from "../services/AuthService";

const getRememberedThemePreference = () => {
  const theme = localStorage.getItem("themePreference");
  return theme === null ? "light" : theme;
};

const getRememberedLoggedInUser = () => {
  return AuthService.isAuthenticated() ? AuthService.user : null;
};

export default function App() {
  // Represents the theme preference either dark or light.
  const [themePreference, setThemePreference] = React.useState(
    getRememberedThemePreference()
  );
  // Represents the state of logged in user.
  const [loggedInUser, setLoggedInUser] = useState(getRememberedLoggedInUser());
  // Represents the state for navbar actions
  const [navbarActions, setNavbarActions] = useState({ searchText: "" });

  useEffect(() => {
    const saveThemePreferenceToLocalStorage = () => {
      localStorage.setItem("themePreference", themePreference);
    };
    saveThemePreferenceToLocalStorage();
  }, [themePreference]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themePreference
        }
      }),
    [themePreference]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserLoginStateProvider
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        >
          <Navbar
            setThemePreference={setThemePreference}
            themePreference={themePreference}
            setNavbarAction={setNavbarActions}
          />
          <NavbarSearchContextProvider
            setNavbarActions={setNavbarActions}
            navbarActions={navbarActions}
          >
            <Route path={"/app/news"} exact component={Dashboard} />
          </NavbarSearchContextProvider>

          <Route
            path={"/app/customization"}
            render={() =>
              loggedInUser !== null ? (
                <Customization
                  setLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              ) : (
                <Redirect to={"/app/signin"} />
              )
            }
          />
          <Route
            path={"/app/signin"}
            render={() =>
              loggedInUser === null ? (
                <SignIn setLoggedInUser={setLoggedInUser} />
              ) : (
                <Redirect to={"/app/news"} />
              )
            }
          />
          <Route
            path={"/app/signup"}
            render={() =>
              loggedInUser === null ? (
                <SignUp setLoggedInUser={setLoggedInUser} />
              ) : (
                <Redirect to={"/app/news"} />
              )
            }
          />
        </UserLoginStateProvider>
      </ThemeProvider>
    </Router>
  );
}
