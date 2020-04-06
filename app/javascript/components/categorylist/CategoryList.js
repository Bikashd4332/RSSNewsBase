import React from "react";
import {
  Paper,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography } from "@material-ui/core";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

const categoryLists = ["All", "Technology", "Sports", "Hollywood", "Bollywood", "Tollywood"]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    height: 350,
    overflowY: "scroll"
  },
  smallHeader: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    'borderBottom': '1px solid #e3e3e3',
    textAlign: "center",
    padding: theme.spacing(1)
  }
}))

export default function CategoryList(props) {
  const classes = useStyles();

  const renderCategoryListItems = (selectedCategory) => {
    return (
        <>
          { categoryLists.map((category, idx) => (
            <ListItem button key={idx} divider>
             <ListItemIcon >
              <LabelOutlinedIcon />
             </ListItemIcon>
             <ListItemText primary={category} primaryTypographyProps={{"variant": "caption"}} />
            </ListItem>
          ))}
        </>
      );
  }

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
          {renderCategoryListItems(props.selectedCategory)}
        </List>
      </Paper>
    </>
  );
}