import { makeStyles, OutlinedTextFieldProps, TextField, Paper } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useController, Control, RegisterOptions } from 'react-hook-form';

const useStyles = makeStyles({
  menuContainer: {
    position: 'absolute',
    width: '100%',
    fontSize: 16,
  },
});

interface SelectProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  options: string[];
  label: string;
  control: Control;
  name: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
}

const Select = ({ options, label, control, rules = {}, name, placeholder }: SelectProps) => {
  const classes = useStyles();

  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({ control, rules, name });

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      size="small"
      options={options}
      PaperComponent={({ children }) => <Paper className={classes.menuContainer}>{children}</Paper>}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          error={Boolean(errors[name])}
          helperText={errors[name]?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};

export default Select;
