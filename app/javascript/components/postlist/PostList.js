import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Avatar } from "@material-ui/core";
import RssFeedIcon from "@material-ui/icons/RssFeed";

const newsPosts = [
  {title: 'Lorem impsum amit getor seni silae ginad.', description: "industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", agency: 'Times of India', url: 'https://timesofindia.hindustantimes.com' },
  {title: 'Lorem impsum amit getor seni silae ginad.', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum', agency: 'Times of India', url: 'https://timesofindia.hindustantimes.com' },
  {title: 'Lorem impsum amit getor seni silae ginad.', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', agency: 'Times of India', url: 'https://timesofindia.hindustantimes.com' },
  {title: 'Lorem impsum amit getor seni silae ginad.', description: 'Lorem impusm amit getor seni sila ginad iti semi mgedi ti aor senfo licker dakij.', agency: 'Times of India', url: 'https://timesofindia.hindustantimes.com' },
]

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2)
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  agency: {
    fontSize: 14,
    fontWeight: 'light'
  },
  description: {
    fontSize: 15,
    paddingTop: theme.spacing(1)
  },
  newsCards: {
    marginTop: theme.spacing(3)
  },
  cardAvatar: {
    paddingRight: theme.spacing(1)
  }

}))

export default function PostList() {
  const classes = useStyle()

  const cardListPopulate = (cardLists) => {
    return cardLists.map((post, idx) => (
      <Card elevation={3} className={classes.newsCards} key={idx}>
        <CardContent>
          <Grid container >
            <Grid item className={classes.cardAvatar}>
              <Avatar variant="circle">
                <RssFeedIcon />
              </Avatar>
            </Grid>
            <Grid item>
            <Typography className={classes.title}>
              {post.title}
            </Typography>
            <Typography className={classes.agency} gutterBottom>
              {post.agency}
            </Typography>
            </Grid>
          </Grid>
          <Typography paragraph className={classes.description}> {post.description} </Typography>
        </CardContent>
      </Card>
    ))
  };

  return (
    <div className={classes.root}>
      {cardListPopulate(newsPosts)}
    </div>
  );
}