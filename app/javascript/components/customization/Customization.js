import React from "react";
import {
  Avatar,
  Grid,
  Typography,
  makeStyles,
  Paper,
  Box,
  Container
} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))

// User profile page
export default function Customization(props) {
  const classes = useStyle();

  return (
    // TODO:- First develop user profile component.
    <Container maxWidth="md" className={classes.root}>
      {/* Profile section  */}
      <Paper>
        <Box sizeheight="300" sizewidth="100%" >
          <Typography component="h1"> Profile </Typography>
        </Box>
      </Paper>

      {/* Cateogry and agency grid */}
      <Grid container >
        {/* Category */}
        <Grid item sm={12} md={6}>
          <Paper>
            <Box sizeheight="300" className="300" >
              <Typography component="h1">Category</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Agency */}
        <Grid item sm={12} md={6}>
          <Paper>
            <Box sizeheight="300" sizewidth="300" >
              <Typography component="h1">Agency</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}