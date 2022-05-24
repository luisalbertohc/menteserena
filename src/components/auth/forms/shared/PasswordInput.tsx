import { TextField, InputAdornment, IconButton, TextFieldProps } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';

const PasswordInput = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      label="Contraseña"
      placeholder="Su Contraseña"
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;
