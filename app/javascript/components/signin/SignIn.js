import React from "react";
import {
  Avatar,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles
} from '@material-ui/core';
import Logo from '../../../../public/logo.svg'
import SignInForm from "./SignInForm";
import Copyright from "../copyright/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
}));

const SignIn = ({ setLoggedInUser }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      {/* parent div container for header and form. */}
      <div className={classes.paper}>

        {/* For signin header and app logo..  */}
        <Grid container justify='center' alignItems='center'>
          {/* Logo item. */}
          <Grid item >
            <Avatar
              className={classes.avatar}
              variant="square"
              src={Logo} />
          </Grid>
          {/* App name item. */}
          <Grid item >
            <Typography component="h1" variant="h4">
              NewsForYou
            </Typography>
          </Grid>
        </Grid>
        {/* Page header. */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* Signin Form sub-component. */}
        <SignInForm setLoggedInUser={setLoggedInUser}/>
      </div>
      {/* Copyright information. */}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignIn;
