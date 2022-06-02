import { makeStyles, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

import { PhoneField, PhoneFieldPersonal } from '@components/shared';

const useStyles = makeStyles(theme => ({
  textField: {
    height: 40,
    padding: 'unset',
    width: '100%',
    '&.dateOfBirth': {
      width: 174,
    },
  },
}));

const EmergencyContact = () => {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <>
      <TextField
        label="Nombre"
        placeholder="Ingrese el nombre del contacto "
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ className: classes.textField }}
        error={Boolean(errors.contact_first_name?.message)}
        helperText={errors.contact_first_name?.message}
        inputProps={{
          ...register('contact_first_name', { required: 'Es requerido ingresar el nombre del contacto.' }),
        }}
      />

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
          ...register('contact_last_name', { required: 'Es requerido ingresar el appellido del contacto.' }),
        }}
      />

      <PhoneFieldPersonal errors={errors} register={register} defaultValue={getValues('contact_phone')} name="contact_phone" />
    </>
  );
};

export default EmergencyContact;
