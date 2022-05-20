import { api, useProviderProfile } from '@api'
import { Grid, makeStyles, Typography, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useForm, FormProvider } from 'react-hook-form'
import { formatISO } from 'date-fns'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { ProfilePicture, LabelCheckBox, Loading } from '@components/shared'
import AcademicHistory from './forms/AcademicHistory'
import PracticeInfo from './forms/PracticeInfo'
import RatesOfService from './forms/RatesOfService'
import PersonalInformation from './forms/PersonalInformation'
import { useCognito } from '@components/context/AuthContext'

// Notas:
// - Eliminar código comentado, una vez sean aprobados los cambios
// - Evaluar estandarización u optimización de los componentes
// - Evaluar CSS

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(4)
  },
  headerContainer: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${ theme.palette.grey[200] }`,
    width: '100%',
    padding: '28px 0px 12px 14px',
    '& > svg': {
      marginRight: theme.spacing(2),
      fill: theme.palette.primary.main,
      cursor: 'pointer'
    }
  },
  header: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.primary.main,
    lineHeight: '24px'
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.grey[600],
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  imageContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 1
    }
  },
  inputsContainer: {
    '& > div': {
      width: '100%',
      marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      order: 2
    }
  },
  submitButton: {
    height: 36,
    margin: theme.spacing(2, 0)
  },
  infoBox: {
    width: '100%'
  }
}))

interface FormValues {
  gender: string
  date_of_birth: Date | null
  country: string
  phone: string
  spoken_languages: string[]
  bio: string
  health_cares: string[]
  area_of_focus: string[]
  populations_serve: string[]
  expertises: string[]
  theoretical_approaches: string[]
  medical_degree,
  office_phone: string,
  personal_phone: string,
  phone_area_code: string,
  office_area_code: string,
  academic_histories: { degree: string; institution: number; year: number }[]
  rate_and_services: { session_type: string; session_length: number; cost: number; isDisable: boolean }[]
  information_public: boolean
  profile_picture: FileList
}

interface EditProfileFormsProps {
  backToProfile: () => void
  profile: any
}

const onSubmit = async (submitValues: FormValues, getSession: () => Promise<CognitoUserSession>, refetch): Promise<void> => {
  const session = await getSession()
  const formData = new FormData()
  Object.entries({
    ...submitValues,
    rate_and_services: JSON.stringify(submitValues.rate_and_services),
    academic_histories: JSON.stringify(submitValues.academic_histories),
    profile_picture:
      typeof submitValues.profile_picture === 'string'
        ? submitValues.profile_picture
        : Boolean(submitValues.profile_picture) // either is null or FileList
        ? submitValues.profile_picture[0]
        : '',
    date_of_birth: submitValues.date_of_birth ? formatISO(new Date(submitValues.date_of_birth)) : '',
  })
  .forEach(([key, value]: [string, any]) => formData.append(key, value))
  await api.post('/api/provider/profile', formData, {
    headers: {
      authorization: `bearer ${ session.getAccessToken().getJwtToken() }`,
    },
  })
  await refetch()
}

const EditProfileForms = ({ backToProfile, profile }: EditProfileFormsProps) => {
  const classes = useStyles()
  const { getSession } = useCognito()
  const { refetch } = useProviderProfile()
  const formMethods = useForm<FormValues>({ mode: 'onChange', defaultValues: profile, })
  const { handleSubmit, formState: { isSubmitting, isSubmitSuccessful, isSubmitted, errors }, } = formMethods

  return (
    <Grid container direction="column" className={ classes.container }>
      
      {/* header */}
      <Grid item className={ classes.headerContainer }>
        <ArrowBackIcon onClick={ backToProfile } />
        <Typography color="primary" className={ classes.header }>
          Editar Perfil
        </Typography>
      </Grid>

      <FormProvider { ...formMethods }>

        {/* profile picture */}
        <ProfilePicture isProfileView />

        {/* personal information */}
        <PersonalInformation />

        {/* academic record */}
        <AcademicHistory />

        {/* practical information */}
        <PracticeInfo />

        {/* rate of service */}
        <RatesOfService />

        {/* checkbox */}
        <LabelCheckBox
          control={ formMethods.control }
          name="information_public"
          label="Incluirme en el Directorio de Terapeutas para que los pacientes potenciales puedan encontrarme, acepto y entiendo que esto significa que la información que incluí se hará pública"
        />

        {/* save button */}
        <Button
          fullWidth
          disabled={ isSubmitting || Boolean(Object.keys(errors).length) }
          color="primary"
          variant="contained"
          className={ classes.submitButton }
          onClick={ handleSubmit(values => onSubmit(values, getSession, refetch)) }
        >
          { isSubmitting ? <Loading size={ 20 } /> : 'Guardar' }
        </Button>

        {/* successful message */}
        {isSubmitted && isSubmitSuccessful && (
          <Typography className={ classes.infoBox } variant="body2" align="center" color="primary">
            Se Guardo Exitosamente
          </Typography>
        )}

        {/* failed message */}
        {isSubmitted && !isSubmitSuccessful && (
          <Typography className={ classes.infoBox } variant="body2" align="center" color="error">
            Sucedió un error, verifique los valores
          </Typography>
        )}

      </FormProvider>
    </Grid>
  )
}

export default EditProfileForms

{/* <Grid className={ classes.container }>

<Grid className={ classes.headerContainer }>
  <ArrowBackIcon onClick={ backToProfile } />
  <Typography color="primary" className={ classes.header }>
    Editar Perfil
  </Typography>
</Grid>

<Grid container>
  <Typography className={ classes.subHeader }>
    Actualiza tu información personal aquí
  </Typography>
</Grid>

<FormProvider { ...formMethods }>

  <Grid container justify="space-between">
    <Grid container item xs={ 12 } alignItems="flex-start" className={ classes.imageContainer }>
      <ProfilePicture isProfileView />
    </Grid>
    <Grid container item xs={ 12 } className={ classes.inputsContainer }>
      <PersonalInformation />
    </Grid>
  </Grid>

  <Grid container item md={ 12 }>
    <AcademicHistory />
    <PracticeInfo />
    <RatesOfService />
    <LabelCheckBox
      control={ formMethods.control }
      name="information_public"
      label="Incluirme en el Directorio de Terapeutas para que los pacientes potenciales puedan encontrarme, acepto y entiendo que esto significa que la información que incluí se hará pública"
    />
    <Button
      fullWidth
      disabled={ isSubmitting || Boolean(Object.keys(errors).length) }
      color="primary"
      variant="contained"
      className={ classes.submitButton }
      onClick={ handleSubmit(values => onSubmit(values, getSession, refetch)) }
    >
      { isSubmitting ? <Loading size={ 20 } /> : 'Guardar' }
    </Button>

    {isSubmitted && isSubmitSuccessful && (
      <Typography className={ classes.infoBox } variant="body2" align="center" color="primary">
        Se Guardo Exitosamente
      </Typography>
    )}
    {isSubmitted && !isSubmitSuccessful && (
      <Typography className={ classes.infoBox } variant="body2" align="center" color="error">
        Sucedió un error, verifique los valores
      </Typography>
    )}
  </Grid>

</FormProvider>
</Grid> */}