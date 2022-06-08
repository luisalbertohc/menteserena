import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

import { PhoneField, PhoneFieldPersonal } from '@components/shared';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    '& > div': {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: 18,
    lineHeight: '21.09px',
    fontWeight: 500,
    marginBottom: theme.spacing(3),
  },
  textField: {
    height: 40,
    padding: 'unset',
    '&.dateOfBirth': {
      width: 174,
    },
  },
}));

const EmergencyContact = () => {
  const classes = useStyles();
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container direction="column" justifyContent="center" item>
      <Grid container item justifyContent="center">
        <Typography color="primary" className={classes.title}>
          Información de Contacto de Emergencia
        </Typography>
      </Grid>
      <Grid className={classes.inputContainer} container item direction="column" justifyContent="center">
        <Controller
          control={control}
          name="contact_first_name"
          rules={{ required: 'Es requerido ingresar el nombre del contacto.' }}
          render={({ field }) => (
            <TextField
              label="Nombre "
              placeholder="Ingrese el nombre del contacto "
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ className: classes.textField }}
              error={Boolean(errors.contact_first_name?.message)}
              helperText={errors.contact_first_name?.message}
              inputProps={{
                ...field,
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="contact_last_name"
          rules={{ required: 'Es requerido ingresar el appellido del contacto.' }}
          render={({ field }) => (
            <TextField
              label="Apellidos"
              placeholder="Ingrese los apellido(s) del contacto"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ className: classes.textField }}
              error={Boolean(errors.contact_last_name?.message)}
              helperText={errors.contact_last_name?.message}
              inputProps={{
                ...field,
              }}
            />
          )}
        />

        <PhoneFieldPersonal
          errors={errors}
          register={register}
          defaultValue={getValues('contact_phone')}
          name="contact_phone"
        />
      </Grid>
    </Grid>
  );
};

export default EmergencyContact;
