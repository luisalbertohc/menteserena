import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

import { COUNTRY_LIST, GENDER_LIST } from '../../constants';
import { Select, EditableSelect, DatePickerField } from '@components/shared';

const useStyles = makeStyles(theme => ({
  inputContainer: {
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
    '&.dateOfBirth': {
      width: 174,
    },
  },
  icon: {
    fill: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
  },
}));

const PersonalInformation = () => {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container direction="column" justifyContent="center" item>
      <Grid container item justifyContent="center" direction="column" alignItems="center">
        <Typography className={classes.title} color="primary">
          ¡Bienvenido a Mente Serena!
        </Typography>
        <Typography className={classes.subTitle} color="primary">
          Configura tu perfil.
        </Typography>
      </Grid>
      <Grid className={classes.inputContainer} container item direction="column" justifyContent="center">
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
          label="Pueblo Donde Reside"
          placeholder="Seleccione su municipio"
          control={control}
          name="place_of_residence"
          options={COUNTRY_LIST}
          rules={{ required: 'Es requerido ingresar su municipio.' }}
        />

        <Controller
          control={control}
          name="reason_to_referral"
          rules={{
            required: 'Es requerido ingresar razon por la que busca ayuda.',
            maxLength: {
              value: 512,
              message: 'No más de 512 caracteres.',
            },
          }}
          render={({ field }) => (
            <TextField
              label="Razón por la que Busca Ayuda"
              rows={5}
              multiline
              placeholder="Ingrese el motivo por el que se registra"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                ...field,
              }}
              error={Boolean(errors.reason_to_referral?.message)}
              helperText={errors.reason_to_referral?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default PersonalInformation;
