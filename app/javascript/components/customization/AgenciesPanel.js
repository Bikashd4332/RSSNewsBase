import React, { useState, useEffect } from "react";
import { Typography, makeStyles, Grid, Paper, Fab } from "@material-ui/core";
import PropType from "prop-types";
import Favourite from "@material-ui/icons/Favorite";
import selectionDiff from "../../services/SelectionDiff";
import PanelGridItem from "./PanelGridItem";
import AgencyFetchService from "../../services/AgencyFetchService";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    position: "relative"
  },
  selection: {
    marginTop: theme.spacing(2),
    display: "flex",
    overflowY: "scroll",
    width: "100%",
    height: 300,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  },
  submitFab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(6)
  }
}));

const AgenciesPanel = ({ value, index, setIsError, setIsSuccess }) => {
  const classes = useStyle();
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickToggleSelection = e => {
    const key = e.target.getAttribute("data-id");
    const stateDup = JSON.parse(JSON.stringify(agencies));
    // Toggle selection of the category in key'th index
    stateDup[key]["selected"] = !stateDup[key]["selected"];
    setAgencies(stateDup);
  };

  const onClickSubmit = async () => {
    const stateDup = JSON.parse(JSON.stringify(agencies));
    const agencyIds = selectionDiff(
      AgencyFetchService.recentlyFetchedAgencies,
      stateDup
    );
    // send only if there's any difference in categories.
    if (agencyIds.length) {
      setIsLoading(true);
      try {
        await AgencyFetchService.subscribe(agencyIds);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (reason) {
        setIsLoading(false);
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    const fetchAgencies = async () => {
      const agencies = await AgencyFetchService.fetchAll();
      if (agencies && agencies.length) {
        setAgencies(agencies);
      }
    };
    fetchAgencies();
  }, []);

  const renderAgencies = () => {
    return (
      <>
        {agencies.map((agency, idx) => (
          <PanelGridItem
            key={idx}
            index={idx}
            item={agency}
            onClick={onClickToggleSelection}
          />
        ))}
      </>
    );
  };

  return (
    <div className={classes.root} hidden={value !== index}>
      <Typography component="h5" variant="h5">
        Agencies Selection
      </Typography>
      <Typography component="p" variant="body1">
        Please choose the Agencies that you want news of.
      </Typography>
      <Grid
        container
        component={Paper}
        className={classes.selection}
        elevation={2}
      >
        {renderAgencies(agencies)}
      </Grid>
      <Fab
        onClick={onClickSubmit}
        disabled={isLoading}
        color="primary"
        className={classes.submitFab}
      >
        <Favourite />
      </Fab>
    </div>
  );
};

AgenciesPanel.propTypes = {
  value: PropType.any.isRequired,
  index: PropType.any.isRequired,
  setIsError: PropType.func.isRequired,
  setIsSuccess: PropType.func.isRequired
};

export default AgenciesPanel;
