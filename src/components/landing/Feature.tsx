import { Grid, makeStyles, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    background: '#F3F4F6',
  },
  title: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(7),
    fontWeight: 900,
    lineHeight: '64px',
  },
  featureContainer: {
    marginBottom: theme.spacing(9),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginBottom: theme.spacing(5),
    },
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '32px',
    marginBottom: theme.spacing(1),
    color: '#18191F',
  },
  featureSubTitle: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '26px',
    color: '#18191F',
  },
  feature: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
  },
}));

const FEATURES = [
  { image: 'chat.png', title: 'Seguridad', subTitle: 'en cumplimiento con HIPAA.' },
  {
    image: 'directory.png',
    title: 'Directorio de Profesionales	',
    subTitle: 'para evaluar y seleccionar según tu interés.',
  },
  { image: 'security.png', title: 'Video, chat y llamada	', subTitle: 'para fácil acceso y participación de terapia.' },
];

const Feature = () => {
  const classes = useStyles();
  return (
    <Grid id="feature" container justifyContent="flex-start" className={classes.container}>
      <Container>
        <Typography variant="h3" className={classes.title}>
          Nuestras Funcionalidades
        </Typography>
        <Grid container justifyContent="space-between" className={classes.featureContainer}>
          {FEATURES.map(feature => {
            return (
              <Grid key={feature.title} className={classes.feature} item>
                <img src={`/images/landing/feature/${feature.image}`} alt="mente-serena" />
                <Typography className={classes.featureTitle}>{feature.title}</Typography>
                <Typography className={classes.featureSubTitle}>{feature.subTitle}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Grid>
  );
};

export default Feature;
