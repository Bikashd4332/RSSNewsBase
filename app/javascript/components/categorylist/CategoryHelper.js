import React from "react";
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  makeStyles
} from "@material-ui/core";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ListAltIcon from "@material-ui/icons/Label";
import PropType from "prop-types";

// Style for empty categories view
const useStyle = makeStyles(theme => ({
  categoryIcon: {
    display: "inline-block",
    width: 20,
    height: 20
  },
  selected: {
    backgroundColor: theme.palette.action.selected
  }
}));

// style for list image iconse
export default function CategoryRenderList({
  categories,
  selectedCategory,
  setCategory
}) {
  const classes = useStyle();
  return (
    <>
      <ListItem
        button
        key={0}
        divider
        onClick={() => setCategory(0)}
        className={`${0 === selectedCategory && classes.selected}`}
      >
        <ListItemIcon>
          {0 === selectedCategory ? <ListAltIcon /> : <LabelOutlinedIcon />}
        </ListItemIcon>
        <ListItemText
          primary={"All"}
          primaryTypographyProps={{ variant: "inherit" }}
        />
      </ListItem>
      {categories.map(category => (
        <ListItem
          button
          key={category.id}
          divider
          className={`${category.id === selectedCategory && classes.selected}`}
          onClick={() => setCategory(category.id)}
        >
          <ListItemIcon>
            <img src={category.icon.url} className={classes.categoryIcon} />
          </ListItemIcon>
          <ListItemText
            primary={category.name}
            primaryTypographyProps={{ variant: "inherit" }}
          />
        </ListItem>
      ))}
    </>
  );
}

const categoryPropType = {
  name: PropType.string.isRequired,
  id: PropType.number.isRequired,
  icon: PropType.shape({
    url: PropType.string.isRequired
  }),
  created_at: PropType.string,
  updated_at: PropType.string
};
// Prop validation for renderCategory
CategoryRenderList.propTypes = {
  categories: PropType.arrayOf(PropType.shape(categoryPropType)),
  selectedCategory: PropType.number,
  setCategory: PropType.func.isRequired
};
