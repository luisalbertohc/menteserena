import { Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { api } from '@api';
import { Patient } from '@types';
import Router from 'next/router';
import { formatISO } from 'date-fns';

import { PersonalInformation, EmergencyContact } from '@components/onboarding/patient/onBoardingSteps';
import { StepsIndicator, ProfilePicture, StepsControllers } from '@components/shared';
import { OnBoardingLayout } from '@components/layout';
import { useCognito } from '@components/context/AuthContext';
import { IdleTimerContext } from '@components/context';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 370,
    margin: 'auto',
  },
  indicatorContainer: {
    marginTop: '33px',
  },
}));

const SelectedStepForm = ({ step }: { step: number }) => {
  switch (step) {
    case 0:
      return <PersonalInformation />;
    case 1:
      return <EmergencyContact />;
    case 2:
      return <ProfilePicture />;
    default:
      return null;
  }
};

const STEPS = ['Información Personal', 'Contacto de Emergencia', 'Foto de Perfil'];

const STEPS_ERROR_VALIDATION_FIELDS = {
  0: ['date_of_birth', 'gender', 'place_of_residence', 'reason_to_referral'],
  1: ['contact_first_name', 'contact_last_name', 'contact_phone'],
};

type FormValues = {
  profile_picture: FileList | string;
  date_of_birth: Date | null;
} & Omit<Patient, 'profile_picture' | 'date_of_birth'>;

const defaultValues: FormValues = {
  profile_picture: '',
  date_of_birth: null,
  contact_first_name: '',
  contact_last_name: '',
  contact_phone: '',
  gender: '',
  onboarding_completed: false,
  place_of_residence: '',
  reason_to_referral: '',
};

const onSubmit = async (submitValues: FormValues, getSession) => {
  const session = await getSession();

  const formData = new FormData();

  Object.entries({
    ...submitValues,
    profile_picture: submitValues.profile_picture?.length ? submitValues.profile_picture[0] : '',
    date_of_birth: submitValues.date_of_birth ? formatISO(submitValues.date_of_birth) : '',
  }).forEach(([key, value]: [string, any]) => formData.append(key, value));

  const response = await api.post('api/patient/onboarding', formData, {
    headers: {
      authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
    },
  });

  if (response.status === 200) {
    Router.push('/portal/patient');
  }
};

const PatientOnboardingScreen = () => {
  const classes = useStyles();
  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues,
  });
  const { getSession } = useCognito();
  const [step, setStep] = useState(0);

  return (
    <IdleTimerContext>
      <OnBoardingLayout>
        <Grid container justifyContent="center" direction="column">
          <Grid className={classes.indicatorContainer}>
            <StepsIndicator step={step} steps={STEPS} />
          </Grid>
          <Grid className={classes.root} container justifyContent="center">
            <FormProvider {...formMethods}>
              <SelectedStepForm step={step} />
              <StepsControllers
                step={step}
                setStep={setStep}
                steps={STEPS}
                handleSubmit={formMethods.handleSubmit(values => onSubmit(values, getSession))}
                stepsErrorValidationFields={STEPS_ERROR_VALIDATION_FIELDS}
              />
            </FormProvider>
          </Grid>
        </Grid>
      </OnBoardingLayout>
    </IdleTimerContext>
  );
};

export default PatientOnboardingScreen;
