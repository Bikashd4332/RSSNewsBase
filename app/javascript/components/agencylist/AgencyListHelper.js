import React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessTwoToneIcon from "@material-ui/icons/BusinessTwoTone";

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
      {[1, 2, 3, 4].map((num, idx) => (
        <ListItem
          button
          key={num}
          divider
        >
          <ListItemIcon >
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText >
            <Skeleton />
          </ListItemText>
        </ListItem>
      ))}
    </>
  );
};

const renderAgencyEmpty = () => {
  return (
    <>
      {
        <Typography variant="inherit"
          component="p"
          color="textSecondary"
          align="center"
        >
         No agencies available.
      </Typography>
      }
    </>
  )

}

export { makeAgencyList, renderAgencyLoading, renderAgencyEmpty};