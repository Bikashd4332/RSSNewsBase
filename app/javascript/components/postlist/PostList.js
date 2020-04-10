import React, { useEffect, useState } from "react";
import { withStyles, Typography } from "@material-ui/core";

import NewsFetchService from "../../services/NewsFetchService";
import { style } from "./PostStyle";
import PostLoading from "./PostLoading";
import PostEmpty  from "./PostEmpty";
import CardListInflator  from "./CardListInflator";

function PostList({ navbarActions, showPostsOf, classes }) {

  // news is the list of news that is fetched from Service.
  const [news, setNews] = useState([]);
  // booleans representing the states of empty or loading.
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { searchText } = navbarActions
  const { category, agency } = showPostsOf;

  // for calling service func. for fetching news.
  const handleNewsFetch = async (searchText, categoryId, agencyId) => {
    setLoading(true);
    try {
      // NewsFetchService remembers the previously fetched records.
      const newsItems = await NewsFetchService.fetchNews(searchText, categoryId, agencyId);
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
      handleNewsFetch(searchText, category, agency);
    }
    prepareFetch();
  }, [ searchText, agency, category ]);


  return (
    <div className={classes.root}>
      {/* Search text will show up here. */}
      <Typography component="h4" hidden={searchText === ''}>
        Search Results for: { searchText }
      </Typography>

      { isLoading
        ? <PostLoading />
        : isEmpty
          ? <PostEmpty handleNewsFetch={handleNewsFetch} searchText={searchText} />
          : <CardListInflator newsList={news} />
      }
    </div>
  );
}

export default withStyles(style)(PostList);