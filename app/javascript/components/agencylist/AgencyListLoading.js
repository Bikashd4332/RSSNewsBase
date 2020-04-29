import React from "react";
import { Skeleton } from "@material-ui/lab";
import { ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";

export default function renderAgencyLoading() {
  return (
    <>
      {[1, 2, 3, 4].map(num => (
        <ListItem button key={num} divider>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText>
            <Skeleton component="p" width={"100%"} />
          </ListItemText>
        </ListItem>
      ))}
    </>
  );
}
