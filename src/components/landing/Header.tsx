// import { useState } from 'react';
import { Button, Grid, makeStyles, Typography, Hidden, Container } from '@material-ui/core';
import { useRouter } from 'next/router';
// import * as firebase from '@libs/firebase';

const useStyles = makeStyles(theme => ({
  hero: {
    height: 700,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
    },
  },
  detailsContainer: {
    maxWidth: 540,
  },
  title: {
    fontWeight: 900,
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      fontWeight: 700,
    },
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '32px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '24px',
    },
  },
  buttonContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    '& > button': {
      textTransform: 'capitalize',
      width: 144,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  imageContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      margin: theme.spacing(4, 0),
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  // const [notification, setNotification] = useState({title: '', body: ''})

  // firebase.onMessageListener().then(payload => {
  //   setNotification({title: payload.notification.title, body: payload.notification.body})
  //   console.log(payload)
  // }).catch(err => console.log('failed: ', err))

  return (
    <Container>
      <Grid container className={classes.hero} justify="center" alignItems="center">
        <Grid container item md={6} sm={12} className={classes.detailsContainer}>
          <Typography variant="h2" className={classes.title}>
            Mente Serena
          </Typography>
          <Grid container className={classes.imageContainer} item md={6} sm={12}>
            <Hidden mdUp>
              <img src="/images/landing/header/header_placeholder_mobile.svg" alt="mente-serena" />
            </Hidden>
          </Grid>
          <Typography className={classes.subTitle}>
            Mantén tu salud mental donde quieras y cuando quieras <br />
            producto puertorriqueño que actualiza la práctica clínica <br />
            a los tiempos tecnológicos en los que vivimos. <br />
            Fomentamos una comunidad que prioriza la salud mental, <br /> a la vez que los hace más accesibles, cool y
            libres de estigma.
          </Typography>
          <Grid container item className={classes.buttonContainer}>
            <Button onClick={() => router.push('/auth/register')} variant="contained" color="primary">
              Regístrame
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.imageContainer} item md={6} sm={12} justify="flex-end">
          <Hidden smDown>
            <img src="/images/landing/header/header_placeholder_desktop.svg" alt="mente-serena" />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
