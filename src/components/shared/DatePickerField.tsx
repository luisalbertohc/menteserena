import { makeStyles } from '@material-ui/core';
import { useController, RegisterOptions, Control } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { es } from 'date-fns/locale';

const useStyles = makeStyles(theme => ({
  calendarField: {
    width: 180,
  },
  calendarInputField: {
    height: '40px !important',
    padding: '0px 9.6px',
  },
  icon: {
    fill: theme.palette.grey[500],
  },
}));

const checkForErrors = errors => {
  if (errors.date_of_birth?.message) {
    return {
      error: Boolean(errors.date_of_birth?.message),
      helperText: errors.date_of_birth?.message,
    };
  }
};

interface DatePickerFieldProps {
  control: Control;
  name: string;
  placeHolder: string;
  label: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  defaultValue?: Date;
}

const DatePickerField = ({
  control,
  rules,
  name,
  defaultValue,
  placeHolder,
  label,
}: DatePickerFieldProps): JSX.Element => {
  const classes = useStyles();

  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({ control, rules, name, defaultValue: defaultValue ?? new Date() });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
      <KeyboardDatePicker
        className={classes.calendarField}
        format="MM/dd/yyyy"
        label={label}
        okLabel="Guardar"
        cancelLabel="Cancelar"
        minDate={new Date('1911-01-01')}
        value={value}
        minDateMessage="La fecha no debe ser anterior a la fecha mínima"
        invalidDateMessage="Formato Invalido"
        placeholder={placeHolder}
        DialogProps={{
          //This will prevent that the navbar blocks the calendar dialog on mobile
          style: { zIndex: 1350 },
        }}
        onChange={date => onChange(date)}
        inputVariant="outlined"
        inputProps={{
          className: classes.calendarInputField,
        }}
        InputProps={{
          endAdornment: <EventIcon className={classes.icon} />,
        }}
        InputLabelProps={{ shrink: true }}
        {...checkForErrors(errors)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
