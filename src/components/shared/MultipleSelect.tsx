import { OutlinedTextFieldProps, TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useController, RegisterOptions, Control } from 'react-hook-form';

interface MultipleSelectProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  label: string;
  options: {
    title: string;
  }[];
  control: Control;
  defaultValue?: string;
  name: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
}

interface OptionType {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<OptionType>();

const MultipleSelect = ({
  options,
  label,
  control,
  rules = {},
  defaultValue,
  name,
}: MultipleSelectProps): JSX.Element => {
  const {
    field: { onChange, value: values },
    formState: { errors },
  } = useController({ control, rules, defaultValue: defaultValue ?? [], name });

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      size="small"
      value={values.map(value => ({ title: value }))}
      onChange={(_, currentValues) => {
        const valuesAsArray = currentValues.map(value => {
          if ('inputValue' in value) {
            return value.inputValue;
          }
          if ('title' in value) {
            return value.title;
          }
        });

        onChange(valuesAsArray);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder="Seleccione según orden de preferencia"
          variant="outlined"
          error={Boolean(errors[name])}
          helperText={errors[name]?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      getOptionSelected={(option, value) => option.title === value.title}
      filterOptions={(options, params) => {
        const filtered = filter(options, params) as OptionType[];
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Añadir "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      getOptionLabel={({ title, inputValue }: OptionType) => inputValue || title}
      renderOption={option => option.title}
    />
  );
};

export default MultipleSelect;
