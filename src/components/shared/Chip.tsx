import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chip: {
    width: 'auto',
    height: 33,
    borderRadius: 50,
    border: `1px solid ${theme.palette.grey[500]}`,
    marginRight: theme.spacing(2),
    padding: '0px 10px',
    marginBottom: theme.spacing(2),
  },
}));

interface SpecialtyProps {
  label: string;
  className?: string;
}

const Chip = ({ label, className }: SpecialtyProps) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={`${classes.chip} ${className}`}>
      {label}
    </Grid>
  );
};

export default Chip;
