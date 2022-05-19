import { Grid, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useFormContext, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { COUNTRY_LIST, GENDER_LIST } from '@components/onboarding/constants'
import { DatePickerField, EditableSelect, Select, PhoneField, PhoneFieldPersonal } from '@components/shared'
import { LANGUAGES } from '@components/onboarding/constants'
import Title from '../Title'

// Notas:
// - Eliminar código comentado, una vez sean aprobados los cambios
// - Evaluar estandarización u optimización de los componentes
// - Evaluar CSS

const useStyles = makeStyles(theme => ({
  inputContainer: {
    margin: '0 auto',
    maxWidth: 312,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '100%'
    },
    '& > div': {
      marginBottom: theme.spacing(4),
      width: '100%',
      // '&.dateOfBirth': {
      //   width: 174
      // }
    }
  },
  phone: {
    display: 'flex',
    flexWrap: 'nowrap',
    '& .react-tel-input': {
      marginRight: 12,
      width: 95
    },
    '& .form-control': {
      color: 'rgba(0, 0, 0, 0.87)',
      borderRadius: 4,
      width: 95,
      height: 40,
      background: 'transparent'
    },
    '& .flag-dropdown': {
      height: 40,
      borderRadius: '4px 0 0 4px'
    },
    '& .react-tel-input:hover .flag-dropdown, & .react-tel-input:hover .form-control': {
      borderColor: 'rgba(0, 0, 0, 0.87)'
    },
    '& .react-tel-input:hover .flag-dropdown': {
      borderRight: '1px solid #cacaca'
    },
    '& .country-list .search-box': {
      marginLeft: 0,
      width: 280,
      [theme.breakpoints.up('sm')]: {
        width: 263
      }
    }
  },
  textField: {
    height: 40,
    padding: 'unset'
  },
  // subHeader: {
  //   fontSize: 16,
  //   fontWeight: 400,
  //   lineHeight: '21px',
  //   color: theme.palette.grey[600],
  //   marginTop: theme.spacing(2),
  //   marginBottom: theme.spacing(3)
  // }
}))

const PersonalInformation = () => {
  const classes = useStyles()
  const { register, control, getValues, formState: { errors }, } = useFormContext()

  return (
    <>
      {/* <Grid container direction="column" justify="center" alignItems="center"> */}
        <Grid container item direction="column" justify="center" alignItems="center" className={ classes.inputContainer }>

          {/* header */}
          <Title label="Información Básica" />

          {/* firstname */}
          <TextField
            label="Nombre"
            placeholder="Ingrese su nombre"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{ className: classes.textField }}
            error={ Boolean(errors.first_name?.message) }
            helperText={ errors.first_name?.message }
            inputProps={{
              ...register('first_name', { required: 'El nombre es requerido' })
            }}
          />

          {/* lastname */}
          <TextField
            label="Apellido(s)"
            placeholder="Ingrese su apellido"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{ className: classes.textField }}
            error={ Boolean(errors.last_name?.message) }
            helperText={ errors.last_name?.message }
            inputProps={{ ...register('last_name', { required: 'El apellido es requerido' }) }}
          />

          {/* email */}
          <TextField
            disabled
            label="Correo Electrónico"
            placeholder="Ingrese su email"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{ className: classes.textField }}
            error={ Boolean(errors.email?.message) }
            helperText={ errors.email?.message }
            inputProps={{ ...register('email', { required: 'El email es requerido' }) }}
          />

          {/* date of birth */}
          <DatePickerField
            control={ control }
            name="date_of_birth"
            rules={{ required: 'Es requerido ingresar su fecha de nacimiento.' }}
            placeHolder="MM/DD/YYYY"
            label="Fecha de Nacimiento"
          />

          {/* gender */}
          <EditableSelect
            options={ GENDER_LIST }
            label="Género"
            control={ control }
            name="gender"
            rules={{ required: 'Es requerido ingresar una opcion.' }}
          />

          {/* country */}
          <Select
            label="Ubicación de la Práctica"
            placeholder="Seleccione su municipio"
            control={ control }
            name="country"
            options={ COUNTRY_LIST }
            rules={{ required: 'Es requerido ingresar su municipio.' }}
          />

          {/* personal phone */}
          <div className={ classes.phone }>

            {/* area code */}
            <Controller
              name="phone_area_code"
              control={ control }
              defaultValue={ getValues('phone_area_code') }
              render={({
                field: {
                  onChange, // a function which sends the input's value to the library
                  value: value //	the current value of the controlled component
                }
              }) => (
                <PhoneInput
                  regions={ ['north-america', 'south-america', 'central-america', 'carribean'] }
                  enableSearch={ true }
                  disableSearchIcon={ true }
                  searchPlaceholder={ 'Buscar' }
                  searchNotFound={ 'No hay coincidencias' }
                  country={ 'pr' }
                  countryCodeEditable={ false } // avoid can edit the country code
                  value={ value }
                  onChange={ onChange }
                  inputProps={{
                    tabindex: -1, // prevents the element from being accessible via sequential keyboard navigation
                    disabled: true // avoid can edit the input
                  }}
                />
              )}
            />
            <PhoneFieldPersonal name="personal_phone" errors={ errors } register={ register } defaultValue={ getValues('personal_phone') }/>
          </div>

          {/* office phone */}
          <div className={ classes.phone }>

            {/* area code */}
            <Controller
              name="office_area_code"
              control={ control }
              defaultValue={ getValues('office_area_code') }
              render={({
                field: {
                  onChange, // a function which sends the input's value to the library
                  value: value //	the current value of the controlled component
                }
              }) => (
                <PhoneInput
                  regions={ ['north-america', 'south-america', 'central-america', 'carribean'] }
                  enableSearch={ true }
                  disableSearchIcon={ true }
                  searchPlaceholder={ 'Buscar' }
                  searchNotFound={ 'No hay coincidencias' }
                  country={ 'pr' }
                  countryCodeEditable={ false } // avoid can edit the country code
                  value={ value }
                  onChange={ onChange }
                  inputProps={{
                    tabindex: -1, // prevents the element from being accessible via sequential keyboard navigation
                    disabled: true // avoid can edit the input
                  }}
                />
              )}
            />
            <PhoneField errors={ errors } register={ register } defaultValue={ getValues('office_phone') } name="office_phone"/>
          </div>
          
          {/* spoken languages */}
          <Controller
            control={ control }
            name="spoken_languages"
            defaultValue={ getValues('spoken_languages') }
            render={({ field: { onChange, value: values } }) => (
              <Autocomplete
                value={ values.map(value => ({ title: value })) }
                onChange={(_, currentValues) => {
                  const valuesAsArray = currentValues.map(value => {
                    if ('title' in value) {
                      return value.title
                    }
                  })
                  onChange(valuesAsArray)
                }}
                multiple
                size="small"
                options={ LANGUAGES }
                getOptionLabel={ option => option.title }
                renderInput={ params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    name="spoken_languages"
                    label="Idiomas Hablados"
                    placeholder="Seleccione las que apliquen"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            )}
          />
        </Grid>
      {/* </Grid> */}
    </>
  )
}

export default PersonalInformation
