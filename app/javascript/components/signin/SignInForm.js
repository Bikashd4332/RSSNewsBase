import React, { useState, useMemo } from "react";
import {
  makeStyles,
  FormControlLabel,
  Checkbox,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Alert } from "@material-ui/lab";
import { useHistory, useLocation } from "react-router-dom";

import AuthService from "../../services/AuthService";
import SigninAction from "./SiginAction";

const useStyle = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}))

const SignInForm = ({ setLoggedInUser }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyle();
  // value states for text email and password.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // auth state.
  const [authState, setAuthState] = useState(false);
  // Loading state.
  const [isLoading, setIsLoading] = useState(false);

  // Submit logic for user authentication.
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const user = await AuthService.authenticate(email, password);
      setLoggedInUser(user);
      setIsLoading(false);
      if (location.state) {
        history.push(location.state.from);
      } else {
        history.push('/news');
      }
    } catch (message) {
      setIsLoading(false);
      setAuthState(true);
    }
  };
  // On change function for state updation.
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleClose = () => setAuthState(false);

  return (
    <>
      <ValidatorForm
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <TextValidator
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          id="email"
          label="Email Address"
          name="email"
          validators={['required', 'isEmail']}
          errorMessages={["Email is required.", "Please enter a valid email."]}
          autoComplete="email"
          autoFocus
        />
        <TextValidator
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          errorMessages={["Password is required.", "Please enter a valid password."]}
          onChange={handlePasswordChange}
          name="password"
          label="Password"
          type="password"
          validators={['required']}
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {isLoading
          ? <div className={classes.progressDiv}>
              <CircularProgress thickness={5} />
            </div>
          : <SigninAction />}
      </ValidatorForm>
      <Snackbar open={authState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in authentication! Please double check Email and Passowrd.
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignInForm;