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
        required: 'El teléfono es requerido',
        pattern: {
          value: /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          message: 'Ingresar solo 10 dígitos.',
        },
        validate: value => value !== '(000) 000-0000' || 'El teléfono no puede contener solo ceros.'
      })}
    >
      {() => {
        return (
          <TextField
            name={name}
            label="Teléfono Personal"
            placeholder="Ingrese número"
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
