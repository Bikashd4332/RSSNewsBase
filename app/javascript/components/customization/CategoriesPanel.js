import React, { useState, useEffect } from "react";
import { Typography, Grid, makeStyles, Paper, Fab } from "@material-ui/core";
import Favourite from "@material-ui/icons/Favorite";
import PropType from "prop-types";
import PanelGridItem from "./PanelGridItem";
import CategoryFetchService from "../../services/CategoryFetchService";
import selectionDiff from "../../services/SelectionDiff";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    position: "relative"
  },
  selection: {
    margin: theme.spacing(2, 0, 3),
    display: "flex",
    overflowY: "scroll",
    width: "100%",
    height: 300,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  },
  submitFab: {
    position: "absolute",
    bottom: theme.spacing(7),
    right: theme.spacing(6)
  }
}));

function CategoriesPanel({ value, index, setIsSuccess, setIsError }) {
  const classes = useStyle();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickToggleSelection = e => {
    const key = e.target.getAttribute("data-id");
    const stateDup = JSON.parse(JSON.stringify(categories));
    // Toggle selection of the category in key'th index
    stateDup[key]["selected"] = !stateDup[key]["selected"];
    setCategories(stateDup);
  };

  const onClickSubmit = async () => {
    const stateDup = JSON.parse(JSON.stringify(categories));
    const categoryIds = selectionDiff(
      CategoryFetchService.recentlyFetchedCategories,
      stateDup
    );
    // send only if there's any difference in categories.
    if (categoryIds.length) {
      setIsLoading(true);
      try {
        await CategoryFetchService.subscribe(categoryIds);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (reason) {
        setIsLoading(false);
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    const categoriesFetch = async () => {
      const categories = await CategoryFetchService.fetchAll();
      if (categories && categories.length) {
        setCategories(categories);
      }
    };
    categoriesFetch();
  }, []);

  const renderCategories = categories => {
    return (
      <>
        {categories.map((category, idx) => (
          <PanelGridItem
            key={idx}
            index={idx}
            item={category}
            onClick={onClickToggleSelection}
          />
        ))}
      </>
    );
  };

  return (
    <div className={classes.root} hidden={value !== index}>
      <Typography component="h5" variant="h5">
        Category Selection
      </Typography>
      <Typography component="p" variant="body1">
        Please choose the categories that you want news of.
      </Typography>
      <Grid
        container
        component={Paper}
        className={classes.selection}
        elevation={2}
      >
        {renderCategories(categories)}
      </Grid>
      <Fab
        onClick={onClickSubmit}
        disabled={isLoading}
        color="primary"
        className={classes.submitFab}
      >
        <Favourite />
      </Fab>
    </div>
  );
}

CategoriesPanel.propTypes = {
  value: PropType.any.isRequired,
  index: PropType.any.isRequired,
  setIsSuccess: PropType.func.isRequired,
  setIsError: PropType.func.isRequired
};

export default CategoriesPanel;
