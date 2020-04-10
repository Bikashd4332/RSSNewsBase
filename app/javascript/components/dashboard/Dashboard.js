import React, { useState } from 'react';
import { Container, Grid, makeStyles, Hidden } from '@material-ui/core';

import PostsList from "../postlist/PostList";
import CategoryList from "../categorylist/CategoryList";
import NavbarSearchContext from "../contexts/NavbarSearchContext";
import AgencyList from "../agencylist/AgencyList";

const useStyle = makeStyles((theme) => ({
  cards: {
    margin: theme.spacing(2)
  }
}))

export default function Dashboard() {
  const classes = useStyle();
  // Represents the selected category id.
  // Initially points to 0 which is for 'all'.
  const [category, setCategory] = useState(0);
  const [agency, setAgency] = useState(0);
  return (
    <>
      <Container maxWidth="md" className={classes.root} >
        <Grid container>
          <Hidden xsDown>
            <Grid item >
              <Grid item className={classes.cards}>
                <CategoryList selectedCategory={category} setCategory={setCategory} />
              </Grid>
              <Grid item className={classes.cards}>
                <AgencyList selectedAgency={agency} setAgency={setAgency} />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item lg={8}>
            <NavbarSearchContext.Consumer>
              {(props) =>
                <PostsList
                  showPostsOf={{ category: category, agency: agency }}
                  {...props}
                />
              }
            </NavbarSearchContext.Consumer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}