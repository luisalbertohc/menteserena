import { api } from '@api';
import { Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { formatISO } from 'date-fns';
import Router from 'next/router';
import { constructArrayFieldValidation } from '@utils';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { StepsIndicator, ProfilePicture, StepsControllers, SubmitOnBoardingForms } from '@components/shared';
import {
  AgeAndGender,
  PersonalInfo,
  PracticeInfo,
  RatesOfService,
} from '@components/onboarding/provider/onBoardingSteps';
import { OnBoardingLayout } from '@components/layout';
import { useForm, FormProvider } from 'react-hook-form';
import { useCognito } from '@components/context/AuthContext';
import { IdleTimerContext } from '@components/context';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 312,
    margin: 'auto',
  },
  indicatorContainer: {
    marginTop: '33px',
  },
}));

const SelectedStepForm = ({ step }: { step: number }) => {
  switch (step) {
    case 0:
      return <AgeAndGender />;
    case 1:
      return <PersonalInfo />;
    case 2:
      return <PracticeInfo />;
    case 3:
      return <RatesOfService />;
    case 4:
      return <ProfilePicture />;
    default:
      return <SubmitOnBoardingForms />;
  }
};

const STEPS = [
  'Detalles de la Práctica',
  'Información de Proveedor',
  'Información de Práctica',
  'Honorarios',
  'Foto de Perfil',
];

const STEPS_ERROR_VALIDATION_FIELDS = {
  // 0: ['date_of_birth', 'gender', 'country', 'phone', 'office_phone', 'personal_phone', 'phone_area_code', 'office_area_code'],
  0: ['date_of_birth', 'gender', 'country', 'office_phone', 'personal_phone', 'phone_area_code', 'office_area_code'],
  1: getValues =>
    constructArrayFieldValidation(getValues, 'academic_histories', ['degree', 'institution', 'year'], ['bio', 'medical_degree']),
  2: [],
  3: getValues =>
    constructArrayFieldValidation(
      getValues,
      'rate_and_services',
      ['session_type', 'session_length', 'cost'],
      ['health_cares']
    ),
};

interface FormValues {
  gender: string;
  date_of_birth: Date | null;
  country: string;
  phone: string;
  spoken_languages: string[];
  bio: string;
  health_cares: string[];
  area_of_focus: string[];
  populations_serve: string[];
  expertises: string[];
  theoretical_approaches: string[];
  academic_histories: {
    degree: string;
    institution: string;
    year: number;
  }[];
  rate_and_services: {
    session_type: string;
    session_length: number;
    cost: number;
    isDisable: boolean;
  }[];
  information_public: boolean;
  profile_picture: FileList | string;
  medical_degree: string;
  office_phone: string;
  personal_phone: string;
  phone_area_code: string;
  office_area_code: string;
}

const ACADEMIC_HISTORIES_DEFAULTS = [
  { degree: '', institution: '', year: null }
]

const RATE_AND_SERVICE_DEFAULTS = [
  { session_type: 'Evaluación inicial ó consulta', session_length: null, cost: null, isDisable: true },
  { session_type: 'Seguimiento', session_length: null, cost: null, isDisable: true },
  { session_type: 'Evaluación Psicométrica (Informe)', session_length: null, cost: null, isDisable: true },
  { session_type: 'Evaluación Psicoeducativa (Informe)', session_length: null, cost: null, isDisable: true },
  { session_type: 'Evaluación Psicológica (Informe)', session_length: null, cost: null, isDisable: true },
];  

const defaultValues: FormValues = {
  date_of_birth: null,
  gender: '',
  country: '',
  phone: '',
  spoken_languages: [],
  bio: '',
  health_cares: [],
  area_of_focus: [],
  populations_serve: [],
  expertises: [],
  theoretical_approaches: [],
  rate_and_services: RATE_AND_SERVICE_DEFAULTS,
  academic_histories: ACADEMIC_HISTORIES_DEFAULTS,
  profile_picture: '',
  information_public: true,
  medical_degree: '',
  office_phone: '',
  personal_phone: '',
  phone_area_code: '',
  office_area_code: ''
};

const onSubmit = async (submitValues: FormValues, getSession: () => Promise<CognitoUserSession>) => {
  const session = await getSession();

  const formData = new FormData();

  Object.entries({
    ...submitValues,
    rate_and_services: JSON.stringify(submitValues.rate_and_services),
    academic_histories: JSON.stringify(submitValues.academic_histories),
    profile_picture: submitValues.profile_picture?.length ? submitValues.profile_picture[0] : '',
    date_of_birth: submitValues.date_of_birth ? formatISO(new Date(submitValues.date_of_birth)) : '',
  }).forEach(([key, value]: [string, any]) => formData.append(key, value));
  
  const response = await api.post('api/provider/onboarding', formData, {
    headers: {
      authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
    },
  });
  // console.log(formData)

  if (response.status === 200) {
    Router.push('/portal/provider');
  }
};

const ProviderOnboardingScreen = () => {
  const classes = useStyles();
  const { getSession } = useCognito();
  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues,
  });
  const [step, setStep] = useState(0);

  return (
    <IdleTimerContext>
      <OnBoardingLayout>
        <Grid container justifyContent="center" direction="column">
          <Grid className={classes.indicatorContainer}>
            <StepsIndicator step={step} steps={STEPS} />
          </Grid>
          <FormProvider {...formMethods}>
            <SelectedStepForm step={step} />
            <Grid className={classes.root} container justifyContent="center">
              <StepsControllers
                step={step}
                setStep={setStep}
                steps={STEPS}
                handleSubmit={formMethods.handleSubmit(values => onSubmit(values, getSession))}
                stepsErrorValidationFields={STEPS_ERROR_VALIDATION_FIELDS}
              />
            </Grid>
          </FormProvider>
        </Grid>
      </OnBoardingLayout>
    </IdleTimerContext>
  );
};

export default ProviderOnboardingScreen;
