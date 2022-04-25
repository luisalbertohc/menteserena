import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    '& > a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
}));

const CheckEmail = ({ email }: { email: string }) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item>
        <img src="/images/checkEmail.svg" alt="email" />
      </Grid>
      <Grid item>
        <Typography className={classes.title}>Verifica tu correo electrónico.</Typography>
        <Grid container justify="center" alignItems="center" className={classes.buttonContainer}>
          <Typography component="a" href={`/auth/login?email=${encodeURIComponent(email || '')}`}>
            Iniciar Session
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckEmail;
