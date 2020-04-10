import React from "react";
import {
  makeStyles,
  List,
  Typography,
  ListItemIcon,
  ListItem,
  Paper,
  ListItemText  } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    maxHeight: 350,
    overflowY: "scroll"
   },
  smallHeader: {
    textAlign: "center",
    fontSize: 14,
    color: theme.palette.text.secondary,
    'borderBottom': '1px solid #e3e3e3',
    padding: theme.spacing(1)
  },
}));

const agencyList = ["Times of India", "Hindustan Times", "The Hindu"]


export default function AgencyList (props) {
  const classes = useStyle();

  const makeAgencyList = (agencyList) => {
    return (
      <>
      {agencyList.map((agency, idx) => (
        <ListItem button key={idx} divider>
          <ListItemIcon >
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText
            primary={agency}
            primaryTypographyProps={{ "variant": "inherit" }}
          />
        </ListItem>
      ))}
      </>
    )
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography
        component="p"
        className = {classes.smallHeader}
      >
        RSS Providers
      </Typography>
      <List>
        { makeAgencyList(agencyList)}
      </List>
    </Paper>
  );
}