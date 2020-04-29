import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  Container,
  Tab,
  Tabs,
  AppBar,
  useTheme,
  Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SwipeableViews from "react-swipeable-views";
import UserLoginStateContext from "../contexts/UserLoginStatecontext";
import UserProfile from "./UserProfile";
import CategoriesPanel from "./CategoriesPanel";
import AgenciesPanel from "./AgenciesPanel";

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  userPaper: {
    padding: theme.spacing(3)
  },
  selectionTab: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3)
  }
}));

export default function Customization() {
  const classes = useStyle();
  // state representing which tab is currently open.
  const [value, setValue] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const theme = useTheme();

  // set the state to the index of which tab is clicked.
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleCloseError = () => setIsError(false);
  const handleCloseSuccess = () => setIsSuccess(false);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper className={classes.userPaper}>
        <UserLoginStateContext.Consumer>
          {userLoginProps => <UserProfile {...userLoginProps} />}
        </UserLoginStateContext.Consumer>
      </Paper>

      <Paper className={classes.selectionTab}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Categories and Agencies selection tab"
          >
            <Tab label="Categories" />
            <Tab label="Agencies" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChange}
        >
          <CategoriesPanel
            value={value}
            index={0}
            setIsSuccess={setIsSuccess}
            setIsError={setIsError}
          />
          <AgenciesPanel
            value={value}
            index={1}
            setIsError={setIsError}
            setIsSuccess={setIsSuccess}
          />
        </SwipeableViews>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Backend experienced problem in updating. Try after sometime.
          </Alert>
        </Snackbar>
        <Snackbar
          open={isSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            Successfully Updated.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}
