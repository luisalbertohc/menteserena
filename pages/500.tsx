import { Grid, makeStyles, Typography } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 33,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  iconContainer: {
    '& > svg': {
      fontSize: 50,
    },
  },
}));

const Custom500 = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column">
      <Grid item className={classes.iconContainer}>
        <SentimentVeryDissatisfiedIcon color="error" />
      </Grid>
      <Grid item>
        <Typography className={classes.title}>Ha ocurrido un error, porfavor vuelva a intentarlo.</Typography>
      </Grid>
    </Grid>
  );
};

export default Custom500;
