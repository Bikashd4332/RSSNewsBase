import React, { useEffect, useState } from "react";
import { withStyles, Typography } from "@material-ui/core";

import NewsFetchService from "../../services/NewsFetchService";
import { style } from "./PostStyle";
import PostLoading from "./PostLoading";
import PostEmpty  from "./PostEmpty";
import CardListInflator  from "./CardListInflator";

function PostList(props) {
  const { classes } = props;

  // news is the list of news that is fetched from Service.
  const [news, setNews] = useState([]);
  // booleans representing the states of empty or loading.
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { searchText } = props.navbarActions

  // for calling service func. for fetching news.
  const handleNewsFetch = async (searchText) => {
    setLoading(true);
    try {
      // NewsFetchService remembers the previously fetched records.
      const newsItems = await NewsFetchService.fetchNews(searchText);
      if (newsItems.length === 0) {
        setLoading(false);
        setIsEmpty(true);
      }
      else {
        setNews(newsItems);
        setLoading(false);
        setIsEmpty(false);
      }
    }
    catch (reason) {
      setLoading(false);
      throw reason;
    }
  }

  // On every change in searchText prop execute this.
  useEffect(() => {
    const prepareFetch = () => {
      // Pretend its a new fetch and forget all the previous.
      NewsFetchService.clear();
      if (searchText !== '') {
        handleNewsFetch(searchText);
      } else {
        handleNewsFetch();
      }
    }
    prepareFetch();
  }, [searchText]);


  return (
    <div className={classes.root}>
      {/* Search text will show up here. */}
      <Typography component="h4" hidden={searchText === ''}>
        Search Results for: {props.navbarActions.searchText}
      </Typography>

      { isLoading
        ? <PostLoading />
        : isEmpty
          ? <PostEmpty handleNewsFetch={handleNewsFetch} />
          : <CardListInflator newsList={news} />
      }
    </div>
  );
}

export default withStyles(style)(PostList);