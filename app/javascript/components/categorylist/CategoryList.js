import React, { useState, useEffect } from "react";
import { Paper, List, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import CategoryFetchService from "../../services/CategoryFetchService";
import CategoryRenderList from "./CategoryHelper";
import renderLoading from "./CategoryListLoading";
import CategoryListEmpty from "./CategoryListEmpty";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(3)
    },
    maxHeight: 350,
    overflowY: "scroll"
  },
  smallHeader: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    borderBottom: "1px solid #e3e3e3",
    textAlign: "center",
    padding: theme.spacing(1)
  }
}));

export default function CategoryList({ selectedCategory, setCategory }) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const fetchedItems = await CategoryFetchService.fetch();
      if (fetchedItems.length === 0) {
        setIsEmpty(true);
        setIsLoading(false);
      } else {
        setCategories(fetchedItems);
        setIsLoading(false);
        setIsEmpty(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Paper elevation={3} className={classes.root} overflow="scroll">
        <Typography component="p" className={classes.smallHeader}>
          Categories
        </Typography>
        <List component="nav">
          {isLoading ? (
            renderLoading()
          ) : isEmpty ? (
            <CategoryListEmpty />
          ) : (
            <CategoryRenderList
              categories={categories}
              selectedCategory={selectedCategory}
              setCategory={setCategory}
            />
          )}
        </List>
      </Paper>
    </>
  );
}

CategoryList.propTypes = {
  selectedCategory: PropTypes.number.isRequired,
  setCategory: PropTypes.func.isRequired
};
