import React, { useState, useEffect } from "react";
import {
  Grid,
  Link as MuiLink,
  Button,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
// Service for Sign up.
import AuthService from "../../services/AuthService";

const useStyle = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = ({ setLoggedInUser }) => {
  const classes = useStyle();

  // Text Field value states.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  // Validation state
  const [validEmail, setValidEmail] = useState({ error: false, message: '' });
  const [validPassword, setValidPassword] = useState({ error: false, message: '' });

  // Operation state.
  const [serverState, setServerState] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', value => !(value !== password));
    ValidatorForm.addValidationRule('minLength', value => !(value.length < 8));
    ValidatorForm.addValidationRule('maxLength', value => !(value.length > 20));
  }, [password]);

  // Handle on submit of form.
  const handleSubmit = async () => {
    const user = await AuthService.signUp({ name, email, password }, errors => {
      // On error it returns some server validation error.
      // .... logic to take those messages and show them in text fields.
      errors.details.forEach(({ field, message }) => {
        if (field === 'email') {
          setValidEmail({ error: true, message: message });
        } else {
          setValidPassword({ error: true, message: message });
        }
      });
      setServerState(true);
    });
    if (user) {
      setLoggedInUser(user);
      history.push('/news');
    }
  };

  // Handle text field's value change.
  const onNameChange = e => setName(e.target.value);
  const onEmailChange = e => {
    setValidEmail({ error: false, message: '' });
    setEmail(e.target.value);
  }
  const onPasswordChange = e => {
    setPassword(e.target.value);
    setValidEmail({ error: false, message: '' });
  }
  const onConfirmationPasswordChange = e => setConfirmationPassword(e.target.value);

  //handle snackbar close or exit
  const handleClose = () => setServerState(false);

  return (
    <>
      <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextValidator
              autoComplete="fname"
              name="Name"
              variant="outlined"
              value={name}
              fullWidth
              id="Name"
              label="Name"
              autoFocus
              onChange={onNameChange}
              errorMessages={["Name can not be left empty", "Invalid name."]}
              validators={['required', 'matchRegexp:^[^0-9]+$']}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              error={validEmail.error}
              variant="outlined"
              value={email}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={validEmail.message}
              errorMessages={"Please enter a valid email"}
              validators={['isEmail', 'required']}
              onChange={onEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              error={validPassword.error}
              helperText={validPassword.message}
              variant="outlined"
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              errorMessages={["password can not be left empty", "should at lest be 8 chars.", " should be below 20 chars."]}
              autoComplete="current-password"
              validators={['required', 'minLength', 'maxLength']}
              onChange={onPasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              variant="outlined"
              fullWidth
              value={confirmationPassword}
              name="confirmationPassword"
              label="Confirmation Password"
              type="password"
              helperText={"Please retype password."}
              id="passwordConfirmation"
              errorMessages={["password confirmation can not be left empty as well.", "Passowrd did not match."]}
              autoComplete="current-password"
              validators={['required', 'isPasswordMatch']}
              onChange={onConfirmationPasswordChange}
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
      </ValidatorForm>
      <Snackbar open={serverState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error from Server! Please check fields again.
        </Alert>
      </Snackbar>
    </>
  )
};

export default SignUpForm;