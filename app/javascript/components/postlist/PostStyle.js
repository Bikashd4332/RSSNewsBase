/* Stylings of the post compoennt */

export const style = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2)
    }
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
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  cardAvatar: {
    paddingRight: theme.spacing(1)
  },
  emptyStateImg: {
    width: '100%',
    margin: 'auto auto',
  },
  searchResult: {
    padding: theme.spacing(1)
  }
});