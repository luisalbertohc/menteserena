import { Grid, makeStyles } from '@material-ui/core';

import Header from './Header';
import Feature from './Feature';
import AboutUs from './About';
import Directory from './Directory';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.common.white,
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Header />
      <Feature />
      <AboutUs />
      <Directory />
      <Footer />
    </Grid>
  );
};

export default Landing;
