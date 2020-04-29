import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import EmptyIconSmall from "../../../../public/empty-box-small.svg";

// Style for empty agencies view
const emptyStyle = makeStyles(theme => ({
  iconRoot: {
    margin: theme.spacing(3)
  },
  emptyIcon: {
    width: 60,
    height: 60,
    display: "block",
    margin: "auto"
  },
  emptyNotice: {
    fontSize: 10,
    display: "inline-block"
  }
}));

export default function AgencyListEmpty() {
  const classes = emptyStyle();
  return (
    <>
      <div className={classes.iconRoot}>
        <img src={EmptyIconSmall} className={classes.emptyIcon} />
      </div>
      <Typography
        variant="inherit"
        component="p"
        color="textSecondary"
        align="center"
      >
        No agencies available.
      </Typography>
      <Typography
        component="i"
        color="textSecondary"
        align="center"
        className={classes.emptyNotice}
      >
        You should customize your account to add agencies.
      </Typography>
    </>
  );
}
