import React from 'react';
import {
 Avatar,
 Button,
 TextField,
 FormControlLabel,
 Checkbox,
 Grid,
 Box,
 Typography,
 Container,
 makeStyles
} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { Link } from "react-router-dom";

import Logo from '../../../../public/logo.svg'
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
      <Grid container justify='center'  alignItems='center'>
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink href="#" variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink
                variant="body2"
                to='/signup'
                component={Link}
               >
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
