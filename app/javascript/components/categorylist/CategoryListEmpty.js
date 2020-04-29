import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import EmptyIconSmall from "../../../../public/empty-box-small.svg";

const useStyle = makeStyles(theme => ({
  emptyIconRoot: {
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

export default function CategoryListEmpty() {
  const classes = useStyle();
  return (
    <>
      <div className={classes.emptyIconRoot}>
        <img src={EmptyIconSmall} className={classes.emptyIcon} />
      </div>
      <Typography
        variant="inherit"
        component="p"
        color="textSecondary"
        align="center"
      >
        No categories available.
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
