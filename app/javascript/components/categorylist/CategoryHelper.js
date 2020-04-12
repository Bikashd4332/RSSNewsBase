import React from "react";
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ListAltIcon from "@material-ui/icons/Label";

const renderCategoryListItems = (categoryLists, selectedCategory, setCategory) => {
  return (
    <>
      <ListItem
        button
        key={0}
        divider
        onClick={e => setCategory(0)}
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
          onClick={e => setCategory(category.id)}
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
      {[1, 2, 3, 4].map((category, idx) => (
        <ListItem button key={category.id} divider key={idx}>
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
  return (
    <>
      {
        <Typography variant="inherit"
          component="p"
          color="textSecondary"
          align="center"
        >
          No categories available.
      </Typography>
      }
    </>
  )
}

export { renderEmpty, renderLoading, renderCategoryListItems };