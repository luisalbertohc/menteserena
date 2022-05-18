import { useEffect } from 'react';
import { Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: '100%',
  },
  smallButton: {
    height: 38,
    '&.backButton': {
      marginRight: theme.spacing(1),
      border: '2px solid',
      color: theme.palette.primary.main,
    },
  },
}));
interface StepsControllersProps {
  step?: number;
  steps: string[];
  setStep: Dispatch<SetStateAction<number>>;
  handleSubmit?: () => Promise<void>;
  stepsErrorValidationFields?: { [key: number]: string[] | ((param?: () => any) => string[]) };
}

const submitButtonStatus = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  if (isSubmitting) {
    return <CircularProgress color="primary" size={20} />;
  }

  return 'Guardar';
};

const StepsControllers = ({
  setStep,
  step,
  steps,
  handleSubmit,
  stepsErrorValidationFields,
}: StepsControllersProps) => {
  const classes = useStyles();
  const {
    trigger,
    getValues,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useFormContext();

  useEffect(() => {
    // Reset formState only when its submitted and a error is generated
    if (!isSubmitSuccessful && step != steps.length) {
      reset(getValues());
    }
  }, [step]);

  const handleNext = async () => {
    const validationStep = stepsErrorValidationFields[step];

    const arrayToValidate = typeof validationStep === 'function' ? validationStep(getValues) : validationStep;

    const valid = await trigger(arrayToValidate);

    if (!valid) {
      return;
    }

    setStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  return (
    <Grid container className={classes.buttonContainer}>
      {step >= 1 ? (
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={6}>
            <Button
              className={`${classes.smallButton} backButton`}
              variant="outlined"
              fullWidth
              color="primary"
              onClick={handleBack}
            >
              Regresar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={isSubmitting}
              className={classes.smallButton}
              variant="contained"
              fullWidth
              color="primary"
              onClick={step >= steps.length ? handleSubmit : handleNext}
            >
              {step >= steps.length ? submitButtonStatus() : 'Siguiente'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {isSubmitted && !isSubmitSuccessful && (
              <Typography variant="body2" color="error">
                Un error acaba de ocurrir, verifique los valores ingresados
              </Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Button variant="contained" fullWidth color="primary" onClick={handleNext}>
            Siguiente
            {console.log(getValues())}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
export default StepsControllers;
