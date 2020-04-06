import React, {useState} from 'react';
import { Container , Grid, makeStyles, Hidden} from '@material-ui/core';

import PostsList from "../postlist/PostList";
import CategoryList from "../categorylist/CategoryList";
import AgencyList  from "../agencylist/AgencyList";

const useStyle = makeStyles((theme) => ({
  cards: {
    margin: theme.spacing(2)
  }
}))

export default function Dashboard(){
  const classes = useStyle();
  const  [category, setCategory] = useState('all');
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
                <AgencyList />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item lg={8}>
            <PostsList showPostsOf={category} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}