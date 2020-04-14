import React from "react";

import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  withStyles
} from "@material-ui/core";
import RssFeedIcon from "@material-ui/icons/RssFeed";

// Import the styles and use in this component.
import { style } from "./PostStyle";

function NewsListInflator(props) {
  const { classes } = props;
  const { newsList } = props;
  return newsList.map((news, idx) => (
    <Card elevation={3} className={classes.newsCards} key={idx}>
      <CardContent>
        <Grid container wrap="nowrap">
          <Grid item xs={2} md={1} className={classes.cardAvatar}>
            <Avatar variant="circle">
              <RssFeedIcon />
            </Avatar>
          </Grid>
          <Grid item >
            <Typography className={classes.title}>
              {news.title}
            </Typography>
            <Typography className={classes.agency} gutterBottom>
              {news.agency}
            </Typography>
          </Grid>
        </Grid>
        <Typography paragraph className={classes.description}> {news.description} </Typography>
      </CardContent>
    </Card>
  ))
};

/* withStyles will wrapping our component
* with the provided before exporting */
export default withStyles(style)(NewsListInflator);