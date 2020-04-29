import React from "react";
import { ListItem, ListItemIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

const renderLoading = () => {
  return (
    <>
      {[1, 2, 3, 4].map(category => (
        <ListItem button key={category} divider>
          <ListItemIcon>
            <LabelOutlinedIcon />
          </ListItemIcon>
          <Skeleton component="p" width={"100%"} />
        </ListItem>
      ))}
    </>
  );
};

export default renderLoading;
