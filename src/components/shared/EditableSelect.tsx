import { OutlinedTextFieldProps, TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useController, RegisterOptions, Control } from 'react-hook-form';

interface EditableSelectProps extends Omit<OutlinedTextFieldProps, 'variant'> {
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

const EditableSelect = ({
  options,
  label,
  control,
  rules = {},
  defaultValue,
  name,
}: EditableSelectProps): JSX.Element => {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({ control, rules, defaultValue: defaultValue ?? [], name });

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => {
        if (newValue?.inputValue) {
          onChange(newValue.inputValue);
        } else {
          onChange(newValue?.title);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Añadir "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      options={options}
      size="small"
      getOptionLabel={option => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }

        return option.title || '';
      }}
      renderOption={option => option.title}
      freeSolo
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder="Seleccione o añada"
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

export default EditableSelect;
