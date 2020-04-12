import React from "react";
import {
  Button,
  Grid,
  Link as MuiLink,
  makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SigninAction = () => {
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
    </>
  );
};

export default SigninAction;