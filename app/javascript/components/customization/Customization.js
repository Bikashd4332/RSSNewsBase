import React from "react";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import Gravatar from 'react-awesome-gravatar';
import ProfilePlaceholder from '../../../../public/user-placeholder.jpg'

// for relative time
import TimeAgo from 'javascript-time-ago';
import localeEN from 'javascript-time-ago/locale/en';

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(3)
  },
  profile: {
    borderRadius: '50%',
    border: 5,
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderColor: theme.palette.grey,
    display: 'block',
    margin: 'auto'
  },
  info: {
    paddingTop: theme.spacing(2)
  },
}));

const gravatarOptions = {
  size: 200
};
TimeAgo.addLocale(localeEN);

export default function Customization({ loggedInUser }) {
  const timeAgo = new TimeAgo('en-US');
  const classes = useStyle();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify="space-around" alignItems="center">
          <Grid item xs={12} sm={4}> 
            <Gravatar email={loggedInUser.email} options={gravatarOptions}>
              {url => 
               <img 
                  className={classes.profile}
                  src={url}
                  onError={(e => e.target.src=ProfilePlaceholder)}
                />
              }
            </Gravatar>
          </Grid>
          <Grid item xs={12} sm={8} className={classes.bio}>
            <Typography variant="h3" component="h3">
              {loggedInUser.name}
            </Typography>
            <Typography variant="p">
              {loggedInUser.email}
            </Typography>
            <div className={classes.info}>
              <Typography variant="p" component="h4">
                User ID: { loggedInUser.id }
              </Typography>
              <Typography variant="p" component="h4">
                User Since: {timeAgo.format(Date.parse(loggedInUser.created_at))}
              </Typography>
              <Typography variant="p" component="h4">
                Account Customization Since: {timeAgo.format(Date.parse(loggedInUser.updated_at))}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

