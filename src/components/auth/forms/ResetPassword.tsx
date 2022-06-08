import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SubmitButton from '@components/shared/SubmitButton';
import Header from '@components/shared/Header';
import SubHeader from './shared/SubHeader';
import { useCognito } from '@components/context/AuthContext';
import { cognitoErrorHandling } from './utils/cognitoErrorHandling';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    '& > div': {
      marginBottom: 29,
    },
  },
  login: {
    fontSize: 13,
    color: theme.palette.grey[500],
    lineHeight: '15px',
    fontWeight: 500,
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const router = useRouter();

  const [cognitoError, setCognitoError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<{
    email: string;
  }>({
    defaultValues: {
      email: '',
    },
  });

  const isEmailSent = isSubmitted && isSubmitSuccessful;

  const authContext = useCognito();

  const onSubmit = async submitValues => {
    if (isEmailSent && !Boolean(cognitoError)) {
      return router.push('/auth/new-password');
    }

    try {
      await authContext.sendCode(submitValues.email);
      setCognitoError('');
    } catch (err) {
      setCognitoError(cognitoErrorHandling(err.code));
    }
  };

  return (
    <Grid container direction="column">
      <Header label="Restablecer Contraseña." />
      {isEmailSent && !Boolean(cognitoError) ? (
        <>
          <SubHeader>
            Hemos enviado un correo electrónico a su dirección con instrucciones para restablecer la contraseña.
          </SubHeader>
          <SubHeader>Si el correo electrónico no aparece en su inbox, verifique en área de spam.</SubHeader>
        </>
      ) : (
        <>
          <SubHeader>
            Por favor ingrese su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.
          </SubHeader>
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
              {Boolean(cognitoError) && (
                <Grid container justifyContent="center">
                  <Typography variant="caption" color="error">
                    {cognitoError}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </>
      )}

      <Grid container item justifyContent="center">
        <SubmitButton
          label={isEmailSent && !Boolean(cognitoError) ? 'Cambiar Contraseña' : 'Enviar Correo Electrónico'}
          onClick={handleSubmit(onSubmit)}
        />
      </Grid>
      {!isEmailSent && (
        <Grid container item justifyContent="center">
          <Typography className={classes.login} variant="body2">
            <Link passHref href="/auth/login">
              <a className={classes.link}>Volver a Iniciar sesión</a>
            </Link>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ResetPassword;
