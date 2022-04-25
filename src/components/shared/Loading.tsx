import { CircularProgress, Grid, CircularProgressProps } from '@material-ui/core';

const Loading = ({ size, ...rest }: CircularProgressProps) => {
  return (
    <Grid container alignItems="center" justify="center">
      <CircularProgress size={size || 40} {...rest} />
    </Grid>
  );
};

export default Loading;
