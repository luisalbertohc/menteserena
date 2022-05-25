import { makeStyles, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

import { COUNTRY_LIST, GENDER_LIST } from '@components/onboarding/constants';
import { DatePickerField, EditableSelect, Select } from '@components/shared';

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

const PersonalInformation = () => {
  const classes = useStyles();
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextField
        label="Nombre"
        placeholder="Ingrese su nombre"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ className: classes.textField }}
        error={Boolean(errors.first_name?.message)}
        helperText={errors.first_name?.message}
        inputProps={{ ...register('first_name', { required: 'El nombre es requerido' }) }}
      />
      <TextField
        label="Apellidos"
        placeholder="Ingrese su apellido"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ className: classes.textField }}
        error={Boolean(errors.last_name?.message)}
        helperText={errors.last_name?.message}
        inputProps={{ ...register('last_name', { required: 'El apellido es requerido' }) }}
      />
      <TextField
        disabled
        label="Correo Electrónico"
        placeholder="Ingrese su email"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={getValues('email')}
        InputProps={{ className: classes.textField }}
      />

      <DatePickerField
        control={control}
        name="date_of_birth"
        rules={{ required: 'Es requerido ingresar su fecha de nacimiento.' }}
        placeHolder="MM/DD/YYYY"
        label="Fecha de Nacimiento"
      />

      <EditableSelect
        options={GENDER_LIST}
        label="Género"
        control={control}
        name="gender"
        rules={{ required: 'Es requerido ingresar una opcion.' }}
      />

      <Select
        label="Pueblo Donde Reside"
        placeholder="Seleccione su municipio"
        control={control}
        name="place_of_residence"
        options={COUNTRY_LIST}
        rules={{ required: 'Es requerido ingresar su municipio.' }}
      />

      <TextField
        rows={5}
        multiline
        label="Razón por la que Busca Ayuda"
        placeholder="Ingrese el motivo por el que se registra"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        error={Boolean(errors.reason_to_referral?.message)}
        helperText={errors.reason_to_referral?.message}
        inputProps={{
          ...register('reason_to_referral', {
            required: 'Es requerido ingresar la razon de la remisión.',
            maxLength: {
              value: 512,
              message: 'No más de 512 caracteres.',
            },
          }),
        }}
      />
    </>
  );
};

export default PersonalInformation;
