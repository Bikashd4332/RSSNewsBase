import React, { useState } from "react";
import { SwipeableDrawer, Grid, IconButton, Typography } from "@material-ui/core";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import CategoryIcon from "@material-ui/icons/Category";

import CategoryList from "../categorylist/CategoryList";
import AgencyList from "../agencylist/AgencyList";

const NewsFilterDrawer = ({ selectedCategory, selectedAgency, setCategory, setAgency }) => {
  // drawer state
  const [isOpenAgency, setIsOpenAgency] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  // handle each button open.
  const handleCategoryDrawerOpen = () => {
    setIsOpenCategory(true);
  }
  const handleAgencyDrawerOpen = () => {
    setIsOpenAgency(true);
  }

  // handle Each drawer close
  const handleCategoryDrawerClose = () => {
    setIsOpenCategory(false);
  }
  const handleAgencyDrawerClose = () => {
    setIsOpenAgency(false);
  }

  return (
    <Grid container justify="space-between"  alignItems="center">
      <Grid item>
        <IconButton
          size="medium"
          onClick={handleCategoryDrawerOpen}>
          <CategoryIcon scale={3} />
        </IconButton>
        <SwipeableDrawer
          anchor='left'
          open={isOpenCategory}
          onClose={handleCategoryDrawerClose}
          onOpen={handleCategoryDrawerOpen}
        >
          <CategoryList
            selectedCategory={selectedCategory}
            setCategory={setCategory}
          />
        </SwipeableDrawer>
      </Grid>
      <Grid item>
        <Typography component={"body"}>
          News Feeds
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          size="medium"
          onClick={handleAgencyDrawerOpen}
        >
          <RssFeedIcon />
        </IconButton>
        <SwipeableDrawer
          anchor='right'
          open={isOpenAgency}
          onClose={handleAgencyDrawerClose}
          onOpen={handleAgencyDrawerOpen}
        >
          <AgencyList
            selectedAgency={selectedAgency}
            setAgency={setAgency}
          />
        </SwipeableDrawer>
      </Grid>
    </Grid>
  );
}

export default NewsFilterDrawer;