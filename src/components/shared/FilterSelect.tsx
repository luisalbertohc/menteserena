import { TextField, MenuItem } from '@material-ui/core';
import { useController, UseControllerProps } from 'react-hook-form';

interface FilterSelectProps extends UseControllerProps {
  label: string;
  options: string[] | { title: string; value?: string }[];
  className: string;
  isSingleValue?: boolean;
}

const FilterSelect = ({ label, options, className, isSingleValue, control, name }: FilterSelectProps) => {
  const {
    field: { onChange, value: values },
  } = useController({ control, name });

  return (
    <TextField
      select
      SelectProps={{
        multiple: !isSingleValue,
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        },
      }}
      variant="outlined"
      value={values || []}
      onChange={event => onChange(event.target.value)}
      InputProps={{
        className: className,
      }}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {options.map((option, idx) => (
        <MenuItem key={idx} value={option?.value ?? option?.title ?? option}>
          {option?.title ? option.title : option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterSelect;
