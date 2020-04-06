import React from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  makeStyles,
  Container,
  Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { Link } from "react-router-dom";

import RssFeedOutlined from '@material-ui/icons/RssFeedOutlined';
import Copyright from "../copyright/Copyright";
import Logo from '../../../../public/logo.svg'

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
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
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <MuiLink
                variant="body2"
                to='/signin'
                component={Link}
               >
                {"Have an account already! Sign In."}
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}