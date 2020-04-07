import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";

import NewsFetchService from "../../services/NewsFetchService";
import { style } from "./PostStyle";
import PostLoading from "./PostLoding";
import PostEmpty  from "./PostEmpty";
import CardListInflator  from "./CardListInflator";

function PostList(props) {
  const { classes } = props;

  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleNewsFetch = async () => {
    setLoading(true);
    try {
      const newsItems = await NewsFetchService .fetchNews();
      if (newsItems.length === 0) {
        setIsEmpty(true);
      }
      else {
        setNews(news.concat(newsItems));
        setLoading(false);
      }
    }
    catch (reason) {
      throw reason;
    }
  }

  useEffect(() => {
    handleNewsFetch();
  }, []);

  return (
    <div className={classes.root}>
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