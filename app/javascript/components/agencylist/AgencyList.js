import React, { useEffect, useState } from "react";
import {
  makeStyles,
  List,
  Typography,
  Paper
} from "@material-ui/core";

import AgencyFetchService from "../../services/AgencyFetchService";
import { makeAgencyList, renderAgencyEmpty, renderAgencyLoading } from "./AgencyListHelper";

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

export default function AgencyList({ selectedAgency, setAgency }) {
  const classes = useStyle();
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setIsLoading(true);
      const agencies = await AgencyFetchService.fetch();
      if (agencies.length) {
        setIsLoading(false);
        setIsEmpty(false);
        setAgencies(agencies);
      } else {
        setIsLoading(false);
        setIsEmpty(true);
      }
    };
    fetchService();
  }, []);

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography
        component="p"
        className={classes.smallHeader}
      >
        RSS Providers
      </Typography>
      <List>
        {isLoading
          ? renderAgencyLoading()
          : isEmpty
            ? renderAgencyEmpty()
            : makeAgencyList(agencies, selectedAgency, setAgency)}
      </List>
    </Paper>
  );
}