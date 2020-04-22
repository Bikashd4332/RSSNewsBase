import React from "react";
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ListAltIcon from "@material-ui/icons/Label";
import EmptyIconSmall from "../../../../public/empty-box-small.svg"

// Style for empty categories view
const emptyStyle = makeStyles(theme => ({
  iconRoot: {
    margin: theme.spacing(3),
  },
  emptyIcon: {
    width: 60,
    height: 60,
    display: 'block',
    margin: 'auto',
  },
  emptyNotice: {
    fontSize: 10,
    display: 'inline-block',
  }

}));

const renderCategoryListItems = (categoryLists, selectedCategory, setCategory) => {
  return (
    <>
      <ListItem
        button
        key={0}
        divider
        onClick={() => setCategory(0)}
      >
        <ListItemIcon >
          {0 === selectedCategory
            ? <ListAltIcon />
            : <LabelOutlinedIcon />}
        </ListItemIcon>
        <ListItemText
          primary={"All"}
          primaryTypographyProps={{ "variant": "inherit" }}
        />
      </ListItem>
      {categoryLists.map((category) => (
        <ListItem
          button
          key={category.id}
          divider
          onClick={() => setCategory(category.id)}
        >
          <ListItemIcon >
            {category.id === selectedCategory
              ? <ListAltIcon />
              : <LabelOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            primary={category.title}
            primaryTypographyProps={{ "variant": "inherit" }}
          />
        </ListItem>
      ))}
    </>
  );
}

const renderLoading = () => {
  return (
    <>
      {[1, 2, 3, 4].map(category => (
        <ListItem button key={category.id} divider>
          <ListItemIcon >
            <LabelOutlinedIcon />
          </ListItemIcon>
          <Skeleton component="p" width={'100%'} />
        </ListItem>
      ))}
    </>
  )
}

const renderEmpty = () => {
  const classes = emptyStyle();
  return (
    <>
      <div className={classes.iconRoot}>
        <img src={EmptyIconSmall} className={classes.emptyIcon} />
      </div>
      <Typography variant="inherit"
        component="p"
        color="textSecondary"
        align="center"
      >
        No categories available.
      </Typography>
      <Typography
        component="i"
        color="textSecondary"
        align="center"
        className={classes.emptyNotice}
      >
        You should customize your account to add agencies.
      </Typography>
    </>
  )
}

export { renderEmpty, renderLoading, renderCategoryListItems };
