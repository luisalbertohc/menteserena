import { Stepper, Step, StepLabel, makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(5),
  },
  label: {
    fontWeight: 700,
    fontSize: 10,
    lineHeight: '16.41px',
    [theme.breakpoints.up('sm')]: {
      fontSize: 14
    }
  },
  stepper: {
    padding: 0,
  },
  step: {
    paddingLeft: 0,
  },
}));

interface StepsIndicatorProps {
  step: number;
  steps: string[];
}

const StepsIndicator = ({ step, steps }: StepsIndicatorProps) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Stepper classes={{ root: classes.stepper }} activeStep={step} alternativeLabel>
        {steps.map((label, idx) => (
          <Step classes={{ root: classes.step }} key={idx}>
            <StepLabel>
              <Typography className={classes.label}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Grid>
  );
};

export default StepsIndicator;
