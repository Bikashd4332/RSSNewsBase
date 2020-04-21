/* Stylings of the post compoennt */

export const style = (theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2),
    },
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    cursor: "pointer",
  },
  agency: {
    fontSize: 14,
    fontWeight: "light",
  },
  description: {
    fontSize: 15,
    paddingTop: theme.spacing(1),
  },
  newsCards: {
    margin: theme.spacing(0, 1, 0, 1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
    },
  },
  cardAvatar: {
    paddingRight: theme.spacing(1),
  },
  emptyStateImg: {
    width: "100%",
    margin: "auto auto",
  },
  searchResult: {
    padding: theme.spacing(1),
  },
  progress: {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  timeInfo: {
    display: "block",
    textAlign: "right",
    fontSize: 12,
  },
});
