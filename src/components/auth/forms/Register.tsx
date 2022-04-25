import { useState } from 'react';
import Link from 'next/link';
import { Grid, makeStyles, TextField, MenuItem, Typography, Collapse } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { SubmitButton, Header, SimpleCheckBox, Loading } from '@components/shared';
import PasswordInput from './shared/PasswordInput';
import { useCognito } from '@components/context/AuthContext';
import CheckEmail from '@components/layout/CheckEmail';
import { cognitoErrorHandling } from './utils/cognitoErrorHandling';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    '& > div': {
      marginBottom: 45
    },
    '& > .MuiCollapse-root': {
      marginBottom: 20
    }
  },
  terms: {
    fontSize: 13,
    lineHeight: '21.6px',
    fontWeight: 400,
    color: theme.palette.grey[500],
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
  checkbox: {
    background: 'red',
  },
  warningContainer: {
    '&.MuiCollapse-container': {
      marginBottom: '20px'
    }
  },
  warningText: {
    justifyContent: 'center'
  },
  select: {
    '& .MuiSelect-select:focus': {
      background: 'none'
    }
  },
  selected: {
    '& .MuiSelect-select': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  unselected: {
    '& .MuiSelect-select': {
      color: theme.palette.grey[400]
    },
  }
}));

interface SignUpFormValues {
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  // rol: string;
  is_provider: boolean;
  terms_of_services: boolean;
}

const defaultValues = {
  email: '',
  first_name: '',
  password: '',
  last_name: '',
  // rol: '',
  is_provider: false,
  terms_of_services: false,
};

const Register = () => {
  const classes = useStyles();
  const [cognitoError, setCognitoError] = useState('');

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [rol, setRol] = useState<string>('Selecciona tu rol')
  const rolHandler = (e) => {
    let value = e.target.value
    setRol(value)
    if (value === 'Terapeuta') {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  }

  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors, isSubmitted, isSubmitSuccessful, isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues,
  });

  const isTermsAccepted = watch('terms_of_services');

  const { signUpWithEmail } = useCognito();

  const checkEmail = isSubmitted && isSubmitSuccessful;

  const onSubmit = async submitValues => {
    // change the is_provider value for true or false
    if (submitValues.is_provider === 'Terapeuta') {
      submitValues.is_provider = true
    } else {
      submitValues.is_provider = false
    }
    try {
      await signUpWithEmail(
        submitValues.first_name,
        submitValues.last_name,
        submitValues.email,
        submitValues.password,
        submitValues.is_provider,
        submitValues.terms_of_services
      );
      setCognitoError('');
    } catch (err) {
      setCognitoError(cognitoErrorHandling(err.code));
    }
  };

  if (checkEmail && !Boolean(cognitoError)) {
    return <CheckEmail email={getValues('email')} />;
  }

  return (
    <Grid container direction="column">
      <Header label="Registrarse" />
      <form>
        <Grid className={classes.inputContainer} container item direction="column">
          <Collapse in={showAlert} classes={{entered: classes.warningContainer}}>
            <Alert severity="warning" classes={{root: classes.warningText}}>
              Estas a punto de registrarte como <strong>Terapeuta</strong>
            </Alert>
          </Collapse>
          <TextField
            id="select"
            select // tell TextField to render like select element
            variant="outlined"
            InputLabelProps={{shrink: true}}
            label="Rol"
            value={rol}
            onChange={rolHandler}
            classes={{root: classes.select}}
            className={`${rol !== 'Selecciona tu rol' ? classes.selected : classes.unselected }`}
            SelectProps={{
              renderValue: (rol) => rol
            }}
            inputProps={{
              ...register('is_provider', {
                required: 'El rol es requerido'
              })
            }}
            error={Boolean(errors.is_provider?.message)}
            helperText={errors.is_provider?.message}
          >
            <MenuItem key="Paciente" value="Paciente">Paciente</MenuItem>
            <MenuItem key="Terapeuta" value="Terapeuta">Terapeuta</MenuItem>
          </TextField>
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
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            label="Nombre"
            placeholder="Ingrese su nombre"
            name="first_name"
            inputProps={{ ...register('first_name', { required: 'El nombre es requerido' }) }}
            error={Boolean(errors.first_name?.message)}
            helperText={errors.first_name?.message}
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            label="Apellido(s)"
            placeholder="Ingrese sus apellidos"
            inputProps={{ ...register('last_name', { required: 'El apellido es requerido' }) }}
            error={Boolean(errors.last_name?.message)}
            helperText={errors.last_name?.message}
          />
          {cognitoError && (
            <Grid container justify="center">
              <Typography variant="caption" color="error">
                {cognitoError}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid container item justify="flex-start">

          <SimpleCheckBox
            name="terms_of_services"
            control={control}
            defaultValue={getValues('terms_of_services')}
            className={classes.terms}
          >
            <>
              Al suscribirse usted acepta nuestros{' '}
              <Link href="/terms-of-service">
                <a className={classes.link}>Términos del Servicio </a>
              </Link>
              y{' '}
              <Link href="/privacy-policy">
                <a className={classes.link}>Política de Privacidad</a>
              </Link>
            </>
          </SimpleCheckBox>
        </Grid>
      </form>

      <Grid container item justify="center">
        <SubmitButton
          label={isSubmitting ? <Loading /> : `Crear Cuenta`}
          onClick={handleSubmit(onSubmit)}
          disabled={!isTermsAccepted}
        />
      </Grid>
      <Grid container item justify="center">
        <Typography className={classes.login} variant="body2">
          Ya tiene cuenta?{' '}
          <Link passHref href="/auth/login">
            <a className={classes.link}>Iniciar sesión</a>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Register;
