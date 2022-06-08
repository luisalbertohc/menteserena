import { Grid, makeStyles, Typography, Hidden, Container } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  container: {
    background: '#F3F4F6',
  },
  banner: {
    position: 'relative',
    width: '100%',
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0),
      width: 'unset',
    },
  },
  contentContainer: {
    position: 'relative',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
  },
  title: {
    maxWidth: 445,
    fontSize: 33,
    fontWeight: 900,
    lineHeight: '54px',
    color: 'white',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 280,
    },
  },
  directoryButton: {
    textDecoration: 'none',
    color: 'white',
    fontSize: 14,
    background: theme.palette.grey[900],
    width: 164,
    height: 48,
    padding: theme.spacing(1.75),
    borderRadius: 5,
    textAlign: 'center',
  },
}));

const Directory = () => {
  const classes = useStyles();
  return (
    <Grid id="directory" container justifyContent="center" className={classes.container}>
      <Container>
        <Hidden smDown>
          <Grid alignItems="center" container className={classes.contentContainer}>
            <img className={classes.banner} src="/images/landing/directory/banner-desktop.svg" alt="mente-serena" />
            <Grid container justifyContent="center" alignItems="center" className={classes.content}>
              <Grid item container justifyContent="center" xs={6}>
                <img src="/images/landing/directory/inbox.svg" alt="mente-serena" />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.title}>
                  Visita y explora nuestro directorio de profesionales de salud mental.{' '}
                </Typography>
                <Link href="/directory" passHref>
                  <a className={classes.directoryButton}>Ver Directorio</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid justifyContent="center" alignItems="center" container className={classes.contentContainer}>
            <img className={classes.banner} src="/images/landing/directory/banner-mobile.svg" alt="mente-serena" />
            <Grid container justifyContent="center" direction="column" className={classes.content}>
              <Grid item container justifyContent="center">
                <img src="/images/landing/directory/inbox.svg" alt="mente-serena" />
              </Grid>
              <Grid container item direction="column" alignItems="center" justifyContent="center">
                <Typography className={classes.title}>
                  Visita y explora nuestro directorio de profesionales de salud mental.{' '}
                </Typography>
                <Link href="/directory" passHref>
                  <a className={classes.directoryButton}>Ver Directorio</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Container>
    </Grid>
  );
};

export default Directory;
