import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";

import CategoryFetchService from "../../services/CategoryFetchService";
import { renderCategoryListItems, renderEmpty, renderLoading } from "./CategoryHelper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    maxHeight: 350,
    overflowY: "scroll"
  },
  smallHeader: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    'borderBottom': '1px solid #e3e3e3',
    textAlign: "center",
    padding: theme.spacing(1)
  }
}));

export default function CategoryList({ selectedCategory, setCategory }) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO:- Remeber to test renderEmpty

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const fetchedItems = await CategoryFetchService.fetch();
        if (fetchedItems.length === 0) {
          setIsEmpty(true);
          setIsLoading(false);
        } else {
          setCategories(fetchedItems);
          setIsLoading(false);
          setIsEmpty(false);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchCategories();
  }, [])

  return (
    <>
      <Paper elevation={3} className={classes.root} overflow="scroll">
        <Typography
          component="p"
          className={classes.smallHeader}
        >
          Categories
        </Typography>
        <List component="nav">
          {isLoading
            ? renderLoading()
            : isEmpty
              ? renderEmpty()
              : renderCategoryListItems (
                categories,
                selectedCategory,
                setCategory
              )}
        </List>
      </Paper>
    </>
  );
}