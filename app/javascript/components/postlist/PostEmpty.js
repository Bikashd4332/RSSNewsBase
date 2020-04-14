import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { style } from "./PostStyle";
import EmptyBoxImg from '../../../../public/empty-box.png'

function PostEmpty({ classes, searchText }) {
  return (
    <Card elevation={3} className={classes.newsCards}>
      <CardContent>
        <Grid container
          justify="center"
          alignContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item xs={7}>
            <img src={EmptyBoxImg} className={classes.emptyStateImg} />
          </Grid>
          <Grid item >
            <Typography paragraph color="textSecondary" align="center" >
              There is nothing here to show.
              {(searchText)
                ? " Please try searching with some different keywords."
                : " Please add some categories and RSS providers and try fetching news again."}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles(style)(PostEmpty);