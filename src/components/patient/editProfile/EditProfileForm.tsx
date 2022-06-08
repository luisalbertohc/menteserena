import { api, usePatientProfile } from '@api';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useForm, FormProvider } from 'react-hook-form';
import { formatISO } from 'date-fns';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { ProfilePicture, Loading } from '@components/shared';
import PersonalInformation from './forms/PersonalInformation';
import EmergencyContact from './forms/EmergencyContact';
import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(4),
  },
  headerContainer: {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    width: '100%',
    padding: '28px 0px 12px 14px',
    '& > svg': {
      marginRight: theme.spacing(2),
      fill: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  header: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.primary.main,
    lineHeight: '24px',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.grey[600],
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  imageContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  inputsContainer: {
    '& > div': {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  submitButton: {
    height: 36,
    margin: theme.spacing(2, 0),
  },
  infoBox: {
    width: '100%',
  },
}));

const onSubmit = async (submitValues, getSession: () => Promise<CognitoUserSession>, refetch): Promise<void> => {
  const session = await getSession();

  const formData = new FormData();

  Object.entries({
    ...submitValues,
    profile_picture:
      typeof submitValues.profile_picture === 'string'
        ? submitValues.profile_picture
        : Boolean(submitValues.profile_picture) // either is null or FileList
        ? submitValues.profile_picture[0]
        : '',
    date_of_birth: submitValues.date_of_birth ? formatISO(new Date(submitValues.date_of_birth)) : '',
  }).forEach(([key, value]: [string, any]) => formData.append(key, value));

  await api.post('/api/patient/profile', formData, {
    headers: {
      authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
    },
  });

  await refetch();
};

interface EditProfileFormProps {
  backToProfile: () => void;
  patient: any;
}

const EditProfileForm = ({ backToProfile, patient }: EditProfileFormProps) => {
  const classes = useStyles();
  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: patient,
  });
  const { getSession } = useCognito();
  const { refetch } = usePatientProfile();

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isSubmitted, errors },
  } = formMethods;

  return (
    <Grid className={classes.container}>
      <Grid className={classes.headerContainer}>
        <ArrowBackIcon onClick={backToProfile} />
        <Typography color="primary" className={classes.header}>
          Editar Perfil
        </Typography>
      </Grid>
      <Grid container>
        <Typography className={classes.subHeader}>Actualiza tu Información Personal</Typography>
      </Grid>
      <FormProvider {...formMethods}>
        <Grid container justifyContent="space-between">
          <Grid container item md={6} sm={12} className={classes.inputsContainer}>
            <PersonalInformation />
          </Grid>
          <Grid alignItems="flex-start" container item xs={5} className={classes.imageContainer}>
            <ProfilePicture isProfileView />
          </Grid>
        </Grid>
        <Grid container item md={12} className={classes.inputsContainer}>
          <Typography className={classes.subHeader}>Contacto de Emergencia</Typography>

          <EmergencyContact />

          <Button
            disabled={isSubmitting || Boolean(Object.keys(errors).length)}
            color="primary"
            variant="contained"
            fullWidth
            className={classes.submitButton}
            onClick={handleSubmit(values => onSubmit(values, getSession, refetch))}
          >
            {isSubmitting ? <Loading size={20} /> : 'Guardar'}
          </Button>

          {isSubmitted && isSubmitSuccessful && (
            <Typography className={classes.infoBox} variant="body2" align="center" color="primary">
              Se Guardo Exitosamente
            </Typography>
          )}
          {isSubmitted && !isSubmitSuccessful && (
            <Typography className={classes.infoBox} variant="body2" align="center" color="error">
              Sucedió un error, verifique los valores
            </Typography>
          )}
        </Grid>
      </FormProvider>
    </Grid>
  );
};

export default EditProfileForm;
