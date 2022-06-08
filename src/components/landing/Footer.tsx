import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.grey[900],
    height: 256,
    [theme.breakpoints.down('sm')]: {
      height: 321,
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  linkContainer: {
    color: 'white',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '26px',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    '& > p, & > a': {
      marginRight: theme.spacing(3),
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      '& > p, & > a': {
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  line: {
    height: 1,
    background: 'white',
    opacity: 0.2,
  },
  copy: {
    color: theme.palette.grey[300],
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '24px',
  },
  copyAndSocialContainer: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: 'unset',
    },
  },
  copyContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  iconContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
      justifyContent: 'flex-start',
      margin: theme.spacing(2, 0),
    },
  },
  socialMediaIcon: {
    width: 24,
    height: 24,
    background: '#2a2f3c',
    borderRadius: '50%',
    position: 'relative',
    marginRight: theme.spacing(2),
    '& > img': {
      position: 'absolute',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.footer}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Grid container justifyContent="center" item className={classes.image}>
            <img src="/images/mente_serena_logo.svg" alt="mente-serena" />
          </Grid>
          <Grid container item justifyContent="center" className={classes.linkContainer}>
            <Typography>Funcionalidades</Typography>

            <Typography component="a" href="/privacy-policy" target="_blank">
              Política de Privacidad
            </Typography>

            <Typography component="a" href="/terms-of-service" target="_blank">
              Términos del Servicio
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.line}></Grid>
        <Grid container className={classes.copyAndSocialContainer}>
          <Grid container item md={6} sm={12} className={classes.copyContainer}>
            <Typography className={classes.copy}>
              &copy; {new Date().getFullYear()} Mente Serena. All rights reserved
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={6} className={classes.iconContainer}>
            <a href="https://www.instagram.com/tumenteserena/?hl=en" target="_blank">
              <Grid container justifyContent="center" alignItems="center" className={classes.socialMediaIcon}>
                <img src="/images/landing/SocialMedia/instagram.svg" alt="instagram" />
              </Grid>
            </a>
            <a href="https://twitter.com/tumenteserena" target="_blank">
              <Grid container justifyContent="center" alignItems="center" className={classes.socialMediaIcon}>
                <img src="/images/landing/SocialMedia/twitter.svg" alt="twitter" />
              </Grid>
            </a>
            <a href="https://www.facebook.com/tumenteserena" target="_blank">
              <Grid container justifyContent="center" alignItems="center" className={classes.socialMediaIcon}>
                <img src="/images/landing/SocialMedia/facebook.svg" alt="facebook" />
              </Grid>
            </a>
            <a href="https://www.linkedin.com/company/menteserena/" target="_blank">
              <Grid container justifyContent="center" alignItems="center" className={classes.socialMediaIcon}>
                <img src="/images/landing/SocialMedia/linkedin.svg" alt="linkedin" />
              </Grid>
            </a>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Footer;
