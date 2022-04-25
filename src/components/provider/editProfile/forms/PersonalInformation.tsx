import { Grid, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useFormContext, Controller } from 'react-hook-form';

import { COUNTRY_LIST, GENDER_LIST } from '@components/onboarding/constants';
import { DatePickerField, EditableSelect, Select, PhoneField } from '@components/shared';
import { LANGUAGES } from '@components/onboarding/constants';
import Title from '../Title';

const useStyles = makeStyles(theme => ({
  textField: {
    height: 40,
    padding: 'unset',
    width: '100%',
    '&.dateOfBirth': {
      width: 174,
    },
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.grey[600],
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
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
        inputProps={{
          ...register('first_name', { required: 'El nombre es requerido' }),
        }}
      />
      <TextField
        label="Apellido(s)"
        placeholder="Ingrese su apellido"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ className: classes.textField }}
        error={Boolean(errors.last_name?.message)}
        helperText={errors.last_name?.message}
        inputProps={{
          ...register('last_name', { required: 'El apellido es requerido' }),
        }}
      />
      <TextField
        disabled
        label="Correo Electrónico"
        placeholder="Ingrese su email"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ className: classes.textField }}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        inputProps={{ ...register('email', { required: 'El email es requerido' }) }}
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
        label="Ubicación de la Práctica"
        placeholder="Seleccione su municipio"
        control={control}
        name="country"
        options={COUNTRY_LIST}
        rules={{ required: 'Es requerido ingresar su municipio.' }}
      />

      <PhoneField errors={errors} register={register} defaultValue={getValues('phone')} name="phone" />

      <Controller
        control={control}
        name="spoken_languages"
        defaultValue={getValues('spoken_languages')}
        render={({ field: { onChange, value: values } }) => (
          <Autocomplete
            value={values.map(value => ({ title: value }))}
            onChange={(_, currentValues) => {
              const valuesAsArray = currentValues.map(value => {
                if ('title' in value) {
                  return value.title;
                }
              });
              onChange(valuesAsArray);
            }}
            multiple
            size="small"
            options={LANGUAGES}
            getOptionLabel={option => option.title}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                name="spoken_languages"
                label="Idiomas Hablados"
                placeholder="Seleccione las que apliquen"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Grid container>
        <Title label="Información Personal" />
      </Grid>

      <TextField
        name="bio"
        rows={5}
        multiline
        label="Biografía"
        placeholder="Ingrese su biografía"
        variant="outlined"
        error={Boolean(errors?.bio?.message)}
        helperText={errors?.bio?.message}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          ...register('bio', {
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
