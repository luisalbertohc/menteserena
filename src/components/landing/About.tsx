import { Container, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(5),
  },
  imageContainer: {
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0),
    },
    '& > img': {
      width: '100%',
    },
  },
  aboutContainer: {
    maxWidth: 540,
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '18px',
    color: '#2EC5CE',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  header: {
    fontSize: 40,
    fontWeight: 900,
    lineHeight: '54px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(4),
  },
  details: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '32px',
    marginBottom: theme.spacing(4),
  },
  link: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    cursor: 'pointer',
  },
}));

const AboutUs = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Container id="about">
      <Grid container justifyContent="center" alignItems="center" className={classes.container}>
        <Hidden smDown>
          <Grid container item md={6} sm={12} justifyContent="flex-end" className={classes.imageContainer}>
            <img src="/images/landing/about/aboutUs.svg" alt="mente-serena" />
          </Grid>
        </Hidden>
        <Grid container item md={6} sm={12} className={classes.aboutContainer}>
          <Typography className={classes.title}>¿Qué Hacemos?</Typography>
          <Typography className={classes.header}>Actualizamos los servicios clínicos a la tecnología</Typography>
          <Hidden mdUp>
            <Grid container item sm={12} justifyContent="center" className={classes.imageContainer}>
              <img src="/images/landing/about/aboutUs.svg" alt="mente-serena" />
            </Grid>
          </Hidden>
          <Typography className={classes.details}>
            Promovemos la salud mental en Puerto Rico, <br />
            facilitándole establecer prácticas clínicas virtuales a profesionales de salud mental mientras
            accesibilizamos los servicios para pacientes, sin costo adicional. Solo debes registrarte y completar tu
            perfíl.
          </Typography>
          <Grid container alignItems="center">
            <Typography onClick={() => router.push('/auth/login')} className={classes.link}>
              Regístrame
            </Typography>
            <img src="/images/landing/about/arrow.svg" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
