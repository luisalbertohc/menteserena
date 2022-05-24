import { Grid, Paper, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    borderRadius: 0,
  },
  container: {
    padding: theme.spacing(0, 0, 3),
  },
  banner: {
    height: 62,
    width: '100%',
    background: `linear-gradient(90deg, #57C4C4 -9.68%, #F4DCB3 111.21%)`,
  },
}));

const OnBoardingLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Container component={Paper} maxWidth="md" className={classes.root}>
      <Grid container className={classes.container}>
        <Grid container className={classes.banner} />
        {children}
      </Grid>
    </Container>
  );
};

export default OnBoardingLayout;
