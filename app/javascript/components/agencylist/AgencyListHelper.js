import React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessTwoToneIcon from "@material-ui/icons/BusinessTwoTone";
import EmptyIconSmall from '../../../../public/empty-box-small.svg'

// Style for empty agencies view
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

const makeAgencyList = (agencyList, selectedAgency, setAgency) => {
  return (
    <>
      <ListItem
        button
        key={0}
        divider
        onClick={() => setAgency(0)}
      >
        <ListItemIcon >
          {selectedAgency === 0
            ? <BusinessTwoToneIcon />
            : <BusinessIcon />
          }
        </ListItemIcon>
        <ListItemText
          primary={"All Agencies"}
          primaryTypographyProps={{ "variant": "inherit" }}
        />
      </ListItem>
      {agencyList.map((agency) => (
        <ListItem
          button
          key={agency.id}
          divider
          onClick={() => setAgency(agency.id)}
        >
          <ListItemIcon >
            {agency.id === selectedAgency
              ? <BusinessTwoToneIcon />
              : <BusinessIcon />
            }
          </ListItemIcon>
          <ListItemText
            primary={agency.name}
            primaryTypographyProps={{ "variant": "inherit" }}
          />
        </ListItem>
      ))}
    </>
  )
};

const renderAgencyLoading = () => {
  return (
    <>
      {[1, 2, 3, 4].map((num) => (
        <ListItem
          button
          key={num}
          divider
        >
          <ListItemIcon >
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText >
            <Skeleton component="p" width={'100%'} />
          </ListItemText>
        </ListItem>
      ))}
    </>
  );
};

const renderAgencyEmpty = () => {
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

export { makeAgencyList, renderAgencyLoading, renderAgencyEmpty };
