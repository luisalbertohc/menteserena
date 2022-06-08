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
  // button: {
  //   marginBottom: 20,
  //   display: 'flex',
  //   alignItems: 'flex-end',
  //   width: '100%',
  //   '& button': {
  //     width: '100%',
  //     height: 35,
  //     textTransform: 'none',
  //     '& .MuiButton-label': {
  //       fontSize: 16
  //     },
  //     [theme.breakpoints.up('sm')]: {
  //       width: 169,
  //       margin: '0 auto'
  //     }
  //   }
  // },
  button: {
    width: '100%',
    height: 35,
    textTransform: 'none',
    '& .MuiButton-label': {
      color: '#fff',
      fontSize: 16,
      textTransform: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      width: 169,
      margin: '0 auto'
    }
  },
}));

const CheckEmail = ({ email }: { email: string }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column">
      <Grid item>
        <img src="/images/checkEmail.svg" alt="email" />
      </Grid>
      <Grid item>
        <Typography className={classes.title}>Verifica tu correo electrónico.</Typography>
        <Grid container justifyContent="center" alignItems="center" className={classes.buttonContainer}>
          <Button 
            variant="contained"
            color="primary"
            disableElevation
            href={`/auth/login?email=${encodeURIComponent(email || '')}`}
            classes={{ root: classes.button }}
          >
            Iniciar Sesión
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckEmail;
