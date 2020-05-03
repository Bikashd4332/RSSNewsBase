import React, { useEffect, useState } from "react";
import { withStyles, Typography, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import NewsFetchService from "../../services/NewsFetchService";
import { style } from "./PostStyle";
import PostLoading from "./PostLoading";
import PostEmpty from "./PostEmpty";
import CardListInflator from "./CardListInflator";
import InfiniteScroll from "react-infinite-scroll-component";

function PostList({ navbarActions, showPostsOf, classes }) {
  // news is the list of news that is fetched from Service.
  const [news, setNews] = useState([]);
  // booleans representing the states of empty or loading.
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { searchText } = navbarActions;
  const { category, agency } = showPostsOf;

  // for calling service func. for fetching news.
  const handleNewsFetch = async (
    searchText,
    categoryId,
    agencyId,
    isFethingMore = true
  ) => {
    if (!isFethingMore) setLoading(true);
    try {
      // NewsFetchService gets the next set of available records.
      const newsItems = await NewsFetchService.fetchNews(
        searchText,
        categoryId,
        agencyId,
        isFethingMore
      );
      if (newsItems === null) return;
      if (newsItems.length !== 0 && !isFethingMore) {
        // not fetch more and we got fresh data here.
        setLoading(false);
        setIsEmpty(false);
        setNews(newsItems);
      } else if (newsItems.length === 0 && !isFethingMore) {
        // not fetch more and did get any data then.
        setNews(newsItems);
        setLoading(false);
        setIsEmpty(true);
      } else {
        // if its fetch more just attach more data.
        setNews(prevState => {
          return [...prevState, ...newsItems];
        });
        setIsEmpty(false);
      }
    } catch (reason) {
      setLoading(false);
      setIsEmpty(true);
      throw reason;
    }
  };

  // On every change in searchText prop execute this.
  useEffect(() => {
    const prepareFetch = () => {
      // Pretend its a new fetch and forget all the previous.
      NewsFetchService.clear();
      handleNewsFetch(searchText, category, agency, false);
    };
    prepareFetch();
  }, [searchText, agency, category]);

  return (
    <div id="postList" className={classes.root}>
      {/* Search text will show up here. */}
      <Typography
        component="h4"
        hidden={searchText === ""}
        className={classes.searchResult}
      >
        Search Results for: {searchText}
      </Typography>

      {isLoading ? (
        <PostLoading />
      ) : isEmpty ? (
        <PostEmpty searchText={searchText} />
      ) : (
        <InfiniteScroll
          dataLength={news.length}
          next={handleNewsFetch}
          hasMore={NewsFetchService.hasMore}
          loader={
            <div className={classes.progress}>
              {" "}
              <CircularProgress />
            </div>
          }
        >
          <CardListInflator newsList={news} />
        </InfiniteScroll>
      )}
    </div>
  );
}

PostList.propTypes = {
  navbarActions: PropTypes.shape({ searchText: PropTypes.string.isRequired }).isRequired,
  showPostsOf: PropTypes.shape({ category: PropTypes.number, agency: PropTypes.number}),
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(PostList);
