import React from "react";
import { ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessTwoToneIcon from "@material-ui/icons/BusinessTwoTone";
import PropTypes from "prop-types";

export default function AgencyListRender({
  agencyList,
  selectedAgency,
  setAgency
}) {
  return (
    <>
      <ListItem button key={0} divider onClick={() => setAgency(0)}>
        <ListItemIcon>
          {selectedAgency === 0 ? <BusinessTwoToneIcon /> : <BusinessIcon />}
        </ListItemIcon>
        <ListItemText
          primary={"All Agencies"}
          primaryTypographyProps={{ variant: "inherit" }}
        />
      </ListItem>
      {agencyList.map(agency => (
        <ListItem
          button
          key={agency.id}
          divider
          onClick={() => setAgency(agency.id)}
        >
          <ListItemIcon>
            {agency.id === selectedAgency ? (
              <BusinessTwoToneIcon />
            ) : (
              <BusinessIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary={agency.name}
            primaryTypographyProps={{ variant: "inherit" }}
          />
        </ListItem>
      ))}
    </>
  );
}

AgencyListRender.propTypes = {
  agencyList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  selectedAgency: PropTypes.number.isRequired,
  setAgency: PropTypes.func.isRequired
};
