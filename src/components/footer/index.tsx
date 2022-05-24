import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footer: {
    flexShrink: 0,
    width: '100%',
    height: 64,
    flexWrap: 'nowrap',
    padding: '0px 100px',
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('sm')]: {
      height: 120,
      padding: '24px 16px',
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  copy: {
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  terms: {
    '& > div:first-child': {
      marginRight: 12,
    },
    [theme.breakpoints.down('sm')]: {
      order: 1,
      justifyContent: 'start',
      flexDirection: 'column',
    },
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16.41px',
    color: theme.palette.grey[500],
    [theme.breakpoints.down('sm')]: {
      marginBottom: 12,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.footer} alignItems="center">
      <Grid item xs={6} className={classes.copy}>
        <Typography className={classes.text} variant="body2">
          &copy; Mente Serena {new Date().getFullYear()}
        </Typography>
      </Grid>
      <Grid container item xs={6} justify="flex-end" className={classes.terms}>
        <Grid item>
          <Typography className={classes.text} variant="body2">
            Privacy Policy
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.text} variant="body2">
            Terms of Service
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
