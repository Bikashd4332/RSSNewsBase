import React from 'react';
import {
  Avatar,
  Grid,
  Box,
  makeStyles,
  Container,
  Typography
} from '@material-ui/core';

import Copyright from "../copyright/Copyright";
import Logo from '../../../../public/logo.svg'
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
}));

export default function SignUp({ setLoggedInUser }) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Grid container justify='center' alignContent='space-between' alignItems='baseline'>
          <Grid item >
            <Avatar
              className={classes.avatar}
              variant="square"
              src={Logo} />
          </Grid>
          <Grid item >
            <Typography component="h1" variant="h4">
              RSSNewsBase
            </Typography>
          </Grid>
        </Grid>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
      </div>
      <SignUpForm setLoggedInUser={setLoggedInUser} />
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}