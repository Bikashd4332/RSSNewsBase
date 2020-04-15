import React from 'react';
import { Button, Grid, Link as MuiLink, makeStyles } from "@material-ui/core";
import { Link  } from "react-router-dom";

const useStyle = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignUpAction = () => {
  const classes = useStyle();
  return (
    <>
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
    </>
  );
}

export default SignUpAction;