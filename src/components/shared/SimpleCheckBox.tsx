import { ReactNode } from 'react';
import { Checkbox, Typography } from '@material-ui/core';
import { useController, UseControllerProps } from 'react-hook-form';

interface SimpleCheckBoxProps<FieldValues> extends UseControllerProps<FieldValues> {
  className: string;
  children: ReactNode | string;
}

const SimpleCheckBox = <T,>({
  className,
  control,
  rules = {},
  defaultValue,
  name,
  children,
}: SimpleCheckBoxProps<T>): JSX.Element => {
  const {
    field: { onChange, value },
  } = useController({ control, rules, defaultValue: defaultValue ?? false, name });

  return (
    <Typography className={className}>
      <Checkbox
        size="small"
        checked={value as boolean}
        color="primary"
        onChange={e => {
          onChange(e.target.checked);
        }}
      />
      {children}
    </Typography>
  );
};

export default SimpleCheckBox;
