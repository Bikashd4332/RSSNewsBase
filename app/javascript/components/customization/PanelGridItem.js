import React from "react";
import { Typography, Grid, makeStyles, ButtonBase } from "@material-ui/core";
import PropType from "prop-types";

const useStyle = makeStyles(theme => ({
  item: {
    margin: theme.spacing(2),
    display: "flex",
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
    flexBasis: "auto",
    height: "40%",
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  selectedItem: {
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper
  },
  itemTitle: {
    marginTop: 10
  },
  itemIcon: {
    width: 40,
    height: 40
  }
}));

const PanelGridItem = ({ item, index, onClick }) => {
  const classes = useStyle();
  return (
    <Grid
      item
      xs={12}
      sm={3}
      component={ButtonBase}
      className={`${classes.item} ${item.selected && classes.selectedItem}`}
      elevation={1}
      key={item.id}
      onClick={onClick}
      data-id={index}
    >
      <img
        src={item.icon && item.icon.url}
        className={classes.itemIcon}
        data-id={index}
      />
      <Typography
        variant="inherit"
        component="i"
        align="center"
        data-id={index}
        className={classes.itemTitle}
      >
        {item.name}
      </Typography>
    </Grid>
  );
};

PanelGridItem.propTypes = {
  item: PropType.shape({
    name: PropType.string.isRequired,
    id: PropType.number.isRequired,
    selected: PropType.bool.isRequired,
    icon: PropType.shape({
      url: PropType.string.isRequired
    })
  }),
  index: PropType.any,
  onClick: PropType.func.isRequired
};
export default PanelGridItem;
