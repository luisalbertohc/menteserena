import { Grid, Hidden, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formContainer: {
    marginTop: 48,
    '& > div': {
      width: 466,
    },
  },
  imageContainer: {
    marginTop: 27,
    marginBottom: 19,
    '& > img': {
      width: '100%',
    },
  },
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container alignItems="center" justify="center">
        <Grid container className={classes.formContainer} item md={6} sm={12} alignItems="center" justify="center">
          {children}
        </Grid>
        <Hidden mdDown>
          <Grid className={classes.imageContainer} container item xs={6} justify="flex-end">
            <img src="/images/register_placeholder.svg" alt="mente-serena" />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default AuthLayout;
