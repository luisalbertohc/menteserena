import { OutlinedTextFieldProps, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { useController, RegisterOptions, Control } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  checkBoxContainer: {
    alignItems: 'flex-start',
    textAlign: 'left',
    marginBottom: `${theme.spacing(3)}px !important`,
  },
}));

interface LabelCheckBoxProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  label: string;
  control: Control<any>;
  defaultValue?: string;
  name: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
}

const LabelCheckBox = ({ label, control, rules = {}, defaultValue, name }: LabelCheckBoxProps): JSX.Element => {
  const classes = useStyles();
  const {
    field: { onChange, value },
  } = useController({ control, rules, defaultValue: defaultValue ?? false, name });

  return (
    <FormControlLabel
      className={classes.checkBoxContainer}
      control={<Checkbox checked={value} onChange={event => onChange(event.target.checked)} color="primary" />}
      label={label}
    />
  );
};

export default LabelCheckBox;
