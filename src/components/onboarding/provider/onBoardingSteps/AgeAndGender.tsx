import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { COUNTRY_LIST, GENDER_LIST, LANGUAGES } from '../../constants';
import { Select, EditableSelect, DatePickerField, PhoneField } from '@components/shared';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    maxWidth: 312,
    '& > div': {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '18.75px',
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(5),
  },
  textField: {
    height: 40,
    padding: 'unset',
    '&.dateOfBirth': {
      width: 174,
    },
  },
  icon: {
    marginLeft: theme.spacing(2),
  },
}));

const AgeAndGender = () => {
  const classes = useStyles();
  const {
    getValues,
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container direction="column" justify="center" alignItems="center" item>
      <Grid container item justify="center" direction="column" alignItems="center">
        <Typography className={classes.title} color="primary">
          ¡Bienvenido a Mente Serena!
        </Typography>
        <Typography className={classes.subTitle} color="primary">
          Configura tu perfil.
        </Typography>
      </Grid>
      <Grid className={classes.inputContainer} container item direction="column" justify="center">
        <DatePickerField
          control={control}
          name="date_of_birth"
          rules={{ required: 'Es requerido ingresar su fecha de nacimiento.' }}
          placeHolder="mm/dd/yyyy"
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
          label="Pueblo Donde Ejerce"
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
              getOptionSelected={(option, value) => option.title === value.title}
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
      </Grid>
    </Grid>
  );
};

export default AgeAndGender;
