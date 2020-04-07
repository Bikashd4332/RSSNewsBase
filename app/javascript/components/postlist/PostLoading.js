import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  withStyles
 } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { style } from "./PostStyle";
import RssFeedIcon from "@material-ui/icons/RssFeed";

function PostLoading(props) {
  const { classes } = props;

  return [1, 2, 3, 4].map((num, array) => (
  <Card elevation={3} className={classes.newsCards} key={num}>
    <CardContent>
      <Grid container >
        <Grid item className={classes.cardAvatar}>
          <Avatar variant="circle">
            <RssFeedIcon />
          </Avatar>
        </Grid>
        <Grid item xs={11}>
          <Skeleton variant="text" animation={"wave"} />
          <Skeleton variant="text" animation={"wave"} />
        </Grid>
      </Grid>
      <Skeleton variant="text" animation={"wave"} />
      <Skeleton variant="text" animation={"wave"} />
      <Skeleton variant="text" animation={"wave"} />
    </CardContent>
  </Card>
  ))
};

export default withStyles(style)(PostLoading);