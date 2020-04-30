import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  InputBase,
  Avatar,
  Container,
  withStyles,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import { styles } from "./NavbarStyles";
import UserLoginStateContext from "../contexts/UserLoginStatecontext";
import Logo from "../../../../public/logo.svg";
import NavbarClickables from "./navcomponents/NavbarClickables";
import PropType from "prop-types";

Navbar.propTypes = {
  classes: PropType.shape({}),
  setNavbarAction: PropType.func.isRequired,
  setThemePreference: PropType.func.isRequired,
  themePreference: PropType.string.isRequired
};

function Navbar({
  classes,
  setNavbarAction,
  setThemePreference,
  themePreference
}) {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleDoSearch = e => {
    // update the state navbar which is in parent component.
    if (e.key === "Enter") {
      setNavbarAction({ searchText: e.target.value });
      if (history.location !== "/app/news") history.push("/app/news");
    }
  };
  const handleClear = () => {
    setSearchText("");
    setNavbarAction({ searchText: "" });
  };
  return (
    // The whole navbar div element
    <div className={classes.grow}>
      {/* AppBar element provides the layout of navbar. */}
      <AppBar position="static" color="inherit">
        {/* Keep items inside navbar aligned */}
        <Container maxWidth="md">
          {/* The use of toolbar is to give layout to menus. */}
          <Toolbar variant="dense">
            <div className={classes.logo}>
              <Link to={"/app"}>
                <Avatar variant="square" src={Logo} />
              </Link>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleDoSearch}
                inputProps={{ "aria-label": "search" }}
              />
              {searchText && (
                <div className={classes.clear}>
                  <IconButton size="small" onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <div className={classes.grow} />

            <UserLoginStateContext.Consumer>
              {loginStateProps => (
                <NavbarClickables
                  setThemePreference={setThemePreference}
                  themePreference={themePreference}
                  {...loginStateProps}
                />
              )}
            </UserLoginStateContext.Consumer>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Navbar);
