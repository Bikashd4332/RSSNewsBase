import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { useHistory, useLocation } from "react-router-dom";

import AuthService from "../../services/AuthService";
import SigninAction from "./SiginAction";
// import AuthService from "../../services/AuthService";

const useStyle = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignInForm = ({ setLoggedInUser }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyle();
  // Validation states for email and password.
  const [emailValidity, setEmailValidity] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState(false);
  // value states for text email and password.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // auth state.
  const [authState, setAuthState] = useState({ error: false, msg: "" });

  // On change handlers for email and password text field.
  const onChangeEmail = e => {
    // if email is in red, On-change change it to true (normal).
    if (emailValidity) {
      setEmailValidity(false);
    }
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    // if password is in red, On-change change it to true (normal).
    if (passwordValidity) {
      setPasswordValidity(false);
    }
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault()
    if (!emailValidity && !passwordValidity && email !== '' && password !== '') {
      try {
        const user = await AuthService.authenticate(email, password);
        setLoggedInUser(user);
        if ( location.state ) {
          history.push(location.state.from);
        } else {
          history.push('/news');
        }
      } catch (message) {
        setAuthState({ error: true, msg: 'Error Signing In! Please check email and password.'});
      }
    } else {
      setAuthState({ error: true, msg: "Email or password is invalid!" });
      if (password === '') setPasswordValidity(true);
      if (email === '') setEmailValidity(true);
    }
  }
  // Handle close of snack bars.
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAuthState({ error: false, msg: "" });
  };
  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          error={emailValidity}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={onChangeEmail}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          error={passwordValidity}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={onChangePassword}
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
        <SigninAction />
      </form>
      <Snackbar open={authState.error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {authState.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignInForm;