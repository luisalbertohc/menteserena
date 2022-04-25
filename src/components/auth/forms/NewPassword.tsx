import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

import SubmitButton from '@components/shared/SubmitButton';
import Header from '@components/shared/Header';
import SubHeader from './shared/SubHeader';
import PasswordInput from './shared/PasswordInput';
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

const NewPassword = () => {
  const classes = useStyles();
  const router = useRouter();

  const [cognitoError, setCognitoError] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<{
    code: string;
    email: string;
    password: string;
  }>({
    defaultValues: {
      code: '',
      email: '',
      password: '',
    },
  });

  const authContext = useCognito();

  const isPasswordReseted = isSubmitted && isSubmitSuccessful;

  const onSubmit = async submitValues => {
    if (isPasswordReseted && !Boolean(cognitoError)) {
      return router.push('/auth/login');
    }

    try {
      await authContext.forgotPassword(submitValues.email, submitValues.code, submitValues.password);
      setCognitoError('');
    } catch (err) {
      setCognitoError(cognitoErrorHandling(err.code));
    }
  };

  return (
    <Grid container direction="column">
      <Header
        label={isPasswordReseted && !Boolean(cognitoError) ? 'Contraseña Restablecida Con Éxito' : 'Nueva Contraseña'}
      />
      {isPasswordReseted && !Boolean(cognitoError) ? (
        <SubHeader>Tu contraseña ha sido actualizada.</SubHeader>
      ) : (
        <>
          <form>
            <Grid className={classes.inputContainer} container item direction="column">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="Código"
                placeholder="Código"
                inputProps={{
                  ...register('code', {
                    required: 'El codigo es requerido',
                  }),
                }}
                error={Boolean(cognitoError || errors.code?.message)}
                helperText={Boolean(cognitoError) ? cognitoError : errors.code?.message}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="Correo Electrónico"
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
                  ...register('password', {
                    required: 'El password es requerido.',
                    minLength: {
                      value: 8,
                      message: 'La contraseña debe tener al menos 8 caracteres',
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message: 'La contraseña debe contener una letra mayuscúla, un carácter especial y un numero)',
                    },
                  }),
                }}
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
              />
            </Grid>
          </form>
        </>
      )}

      <Grid container item justify="center">
        <SubmitButton
          label={isPasswordReseted && !Boolean(cognitoError) ? 'Volver a Iniciar sesión' : `Guardar Contraseña`}
          onClick={handleSubmit(onSubmit)}
        />
      </Grid>
      {!isPasswordReseted && (
        <Grid container item justify="center">
          <Typography className={classes.login} variant="body2">
            <Link passHref href={`/auth/login?email=${encodeURIComponent(getValues('email') || '')}`}>
              <a className={classes.link}>Volver a Iniciar sesión</a>
            </Link>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default NewPassword;
