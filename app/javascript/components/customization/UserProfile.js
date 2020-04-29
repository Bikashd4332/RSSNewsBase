import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Gravatar from "react-awesome-gravatar";
import ProfilePlaceholder from "../../../../public/user-placeholder.jpg";
import PropType from "prop-types";
import TimeAgo from 'javascript-time-ago';
import LocaleEn from 'javascript-time-ago/locale/en';

const useStyle = makeStyles((theme) => ({
  profile: {
    borderRadius: "50%",
    border: 5,
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderColor: theme.palette.grey,
    display: "block",
    margin: "auto",
  },
  info: {
    paddingTop: theme.spacing(2),
  },
}));
TimeAgo.addLocale(LocaleEn);

const UserProfile = ({ loggedInUser }) => {
  const classes = useStyle();
  const timeAgo = new TimeAgo('en-US');
  const gravatarOptions = {
    // Gravatar profiles must be of 200x200
    size: 200,
  };

  return (
    <Grid container spacing={2} justify="space-around" alignItems="center">
      <Grid item xs={12} sm={4}>
        <Gravatar email={loggedInUser.email} options={gravatarOptions}>
          {(url) => (
            <img
              className={classes.profile}
              src={url}
              onError={(e) => (e.target.src = ProfilePlaceholder)}
            />
          )}
        </Gravatar>
      </Grid>
      <Grid item xs={12} sm={8} className={classes.bio}>
        <Typography variant="h3" component="h3">
          {loggedInUser.name}
        </Typography>
        <Typography variant="body1">{loggedInUser.email}</Typography>
        <div className={classes.info}>
          <Typography variant="inherit" component="h4">
            User ID: {loggedInUser.id}
          </Typography>
          <Typography variant="inherit" component="h4">
            User Since: {timeAgo.format(Date.parse(loggedInUser.created_at))}
          </Typography>
          <Typography variant="inherit" component="h4">
            Account Customization Since:{" "}
            {timeAgo.format(Date.parse(loggedInUser.updated_at))}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

UserProfile.propTypes = {
  loggedInUser: PropType.shape({
    name: PropType.string.isRequired,
    email: PropType.string.isRequired,
    id: PropType.number.isRequired,
    created_at: PropType.string.isRequired,
    updated_at: PropType.string.isRequired,
  }),
};

export default UserProfile;
