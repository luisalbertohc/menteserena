import { makeStyles, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

const useStyles = makeStyles(theme => ({
  textField: {
    height: 40,
    padding: 'unset',
    width: '100%',
  },
}));

const PhoneField = ({ register, errors, defaultValue, name }) => {
  const classes = useStyles();

  return (
    <InputMask
      mask="(999) 999-9999"
      defaultValue={defaultValue}
      {...register(name, {
        required: 'El telefono es requerido',
        pattern: {
          value: /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          message: 'Ingresar solo 10 digitos.',
        },
      })}
    >
      {() => {
        return (
          <TextField
            name={name}
            label="Número de Teléfono"
            placeholder="Ingrese su numero de telefono"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ className: classes.textField }}
            error={Boolean(errors[name]?.message)}
            helperText={errors[name]?.message}
          />
        );
      }}
    </InputMask>
  );
};

export default PhoneField;
