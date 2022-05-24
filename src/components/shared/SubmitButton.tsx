import { Button, makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    height: 44,
    textTransform: 'none',
  },
}));

interface ButtonProps {
  onClick: () => void;
  label: string | ReactNode;
  disabled?: boolean;
}

const SubmitButton = ({ onClick, label, disabled }: ButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
