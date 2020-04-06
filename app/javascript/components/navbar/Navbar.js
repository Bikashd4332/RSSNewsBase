import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, InputBase, Avatar, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

import UserLoginStateContext from "../contexts/UserLoginStatecontext";

import Logo from "../../../../public/logo.svg";
import NavbarClickables from "./navcomponents/NavbarClickables";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: 0,
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  }
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    // The whole navbar div element
    <div className={classes.grow}>
      {/* AppBar element provides the layout of navbar. */}
      <AppBar position="static"
        color="inherit">
        {/* Keep items inside navbar aligned */}
        <Container maxWidth="lg">
        {/* The use of toolbar is to give layout to menus. */}
          <Toolbar variant="dense">
            <div className={classes.logo}>
              <Avatar variant="square" src={Logo} />
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />

            <UserLoginStateContext.Consumer>
              { (loginStateProps) => <NavbarClickables {...loginStateProps} />}
            </UserLoginStateContext.Consumer>

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}