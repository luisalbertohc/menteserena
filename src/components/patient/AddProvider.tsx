import { Grid, makeStyles } from '@material-ui/core';

import ProviderCodeInput from './ProviderCodeInput';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
  },
}));

interface AddProviderProps {
  openMessageTab: () => void;
}

const AddProvider = ({ openMessageTab }: AddProviderProps) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" alignItems="center" className="center">
      <ProviderCodeInput className={classes.container} openMessageTab={openMessageTab} />
    </Grid>
  );
};

export default AddProvider;
