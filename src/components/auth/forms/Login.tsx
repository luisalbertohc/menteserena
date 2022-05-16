import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SubmitButton from '@components/shared/SubmitButton';
import Header from '@components/shared/Header';
import PasswordInput from './shared/PasswordInput';
import { Loading } from '@components/shared';
import { useCognito } from '@components/context/AuthContext';
import { cognitoErrorHandling } from './utils/cognitoErrorHandling';
// import * as firebase from '@libs/firebase'

const useStyles = makeStyles(theme => ({
  inputContainer: {
    '& > div': {
      marginBottom: 45,
    },
  },
  link: {
    textDecoration: 'underline',
    fontSize: 13,
    lineHeight: '15px',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  register: {
    fontSize: 13,
    lineHeight: '15.23px',
    fontWeight: 500,
    color: theme.palette.grey[500],
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [cognitoError, setCognitoError] = useState('');
  // const [isTokenFound, setTokenFound] = useState(false)

  const router = useRouter();
  const {
    query: { emailQuery },
  } = router;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: emailQuery ? decodeURIComponent(emailQuery as string) : '',
      password: '',
    },
  });

  const authContext = useCognito();

  const onSubmit = async submitValues => {
    try {
      await authContext.signInWithEmail(submitValues.email, submitValues.password);
      // firebase.getTokenFirebase()
      router.push('/portal');
    } catch (err) {
      setCognitoError(cognitoErrorHandling(err.code));
    }
  };

  return (
    <Grid container direction="column">
      <Header label="Iniciar Sesión" />
      <form>
        <Grid className={classes.inputContainer} container item direction="column">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            label="Email"
            placeholder="correo@ejemplo.com"
            inputProps={{
              ...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Entrar un email valido',
                },
              }),
            }}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
          />
          <PasswordInput
            inputProps={{
              ...register('password', { required: 'El password es requerido.' }),
            }}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
          />
          {cognitoError && (
            <Grid container justify="center">
              <Typography variant="caption" color="error">
                {cognitoError}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
      <Grid container item justify="center">
        <Typography variant="body2" color="primary">
          <Link href="/auth/reset-password">
            <a className={classes.link}>¿Olvidó su contraseña?</a>
          </Link>
        </Typography>
      </Grid>
      <Grid container item justify="center">
        <SubmitButton label={isSubmitting ? <Loading /> : `Iniciar Sesión`} onClick={handleSubmit(onSubmit)} />
      </Grid>
      <Grid item>
        <Typography className={classes.register} variant="body2">
          No tienes una cuenta?{' '}
          <Link passHref href="/auth/register">
            <a className={classes.link}>Registrarse</a>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
