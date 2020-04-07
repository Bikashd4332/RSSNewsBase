import React, { useReducer, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Avatar,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import RssFeedIcon from "@material-ui/icons/RssFeed";

import EmptyBoxImg from '../../../../public/empty-box.png'
import NewsFetchService from "../../services/NewsFetchService";

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2)
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  agency: {
    fontSize: 14,
    fontWeight: 'light'
  },
  description: {
    fontSize: 15,
    paddingTop: theme.spacing(1)
  },
  newsCards: {
    marginTop: theme.spacing(3)
  },
  cardAvatar: {
    paddingRight: theme.spacing(1)
  },
  emptyStateImg: {
    width: 320,
    height: 320
  }
}))

const newsReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state.concat(action.data);
  }
}

export default function PostList() {
  const classes = useStyle()
  const [news, dispatchNews] = useReducer(newsReducer, [])
  let [isLoading, setLoading] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);

  const handleNewsFetch = () => {
    setLoading(true);
    return NewsFetchService
      .fetchNews()
      .then(newsItems => {
        if (newsItems.length === 0) {
          setIsEmpty(true);
        } else {
          dispatchNews({ type: 'add', data: newsItems });
          setLoading(false);
        }
      }).catch(reason => { throw reason })
  }

  useEffect(() => {
    handleNewsFetch();
  }, []);

  const cardListPopulate = (newsList) => {
    return newsList.map((post, idx) => (
      <Card elevation={3} className={classes.newsCards} key={idx}>
        <CardContent>
          <Grid container >
            <Grid item className={classes.cardAvatar}>
              <Avatar variant="circle">
                <RssFeedIcon />
              </Avatar>
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.title}>
                {post.title}
              </Typography>
              <Typography className={classes.agency} gutterBottom>
                {post.agency}
              </Typography>
            </Grid>
          </Grid>
          <Typography paragraph className={classes.description}> {post.description} </Typography>
        </CardContent>
      </Card>
    ))
  };

  const showEmptyNews = () => (
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
            <Typography paragraph color="textSecondary" align="center">
              There is nothing here to show. Please add some categories and RSS providers and try fetching news again.
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleNewsFetch}>Fetch News</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const showLoadingNews = () => {
    return [1, 2, 3].map((num, array) => (
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


  return (
    <div className={classes.root}>
      { isLoading
        ? showLoadingNews()
        : isEmpty
          ? showEmptyNews()
          : cardListPopulate(news)}
    </div>
  );
}