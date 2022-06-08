import { Grid, makeStyles, Typography, TextField } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { COUNTRY_LIST, GENDER_LIST, LANGUAGES } from '../../constants'
import { Select, EditableSelect, DatePickerField, PhoneField, PhoneFieldPersonal } from '@components/shared'

// Notas:
// - Agregar máscara a los códigos de áreas
// - Optimizar valor por defecto de los códigos de área
// - Optimizr CSS

const useStyles = makeStyles(theme => ({
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
  inputContainer: {
    maxWidth: 312,
    '& > div': {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '18.75px',
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(5),
  },
  textField: {
    height: 40,
    padding: 'unset',
    '&.dateOfBirth': {
      width: 174,
    },
  },
  icon: {
    marginLeft: theme.spacing(2),
  }
}))

const AgeAndGender = () => {
  const classes = useStyles()
  const { getValues, control, register, formState: { errors }, } = useFormContext()

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" item>

      <Grid container item justifyContent="center" direction="column" alignItems="center">
        <Typography className={classes.title} color="primary">
          ¡Bienvenido a Mente Serena!
        </Typography>
        <Typography className={classes.subTitle} color="primary">
          Configura tu perfil
        </Typography>
      </Grid>

      <Grid className={classes.inputContainer} container item direction="column" justifyContent="center">

        {/* date of birth */}
        <DatePickerField
          control={ control }
          name="date_of_birth"
          rules={{ required: 'Es requerido ingresar su fecha de nacimiento.' }}
          placeHolder="mm/dd/yyyy"
          label="Fecha de Nacimiento"
        />

        {/* gender */}
        <EditableSelect
          options={ GENDER_LIST }
          label="Género"
          control={ control }
          name="gender"
          rules={{ required: 'Es requerido ingresar una opción.' }}
        />

        {/* country */}
        <Select
          label="Pueblo Donde Ejerce"
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
          <PhoneFieldPersonal errors={ errors } register={ register } defaultValue={ getValues('personal_phone') } name="personal_phone"/>
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
          render={({ 
            field: { onChange, value: values }
          }) => (
            <Autocomplete
              value={ values.map(value => ({ title: value })) }
              onChange={ (_, currentValues) => {
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
              getOptionSelected={ (option, value) => option.title === value.title }
              renderInput={ params => (
                <TextField
                  {...params}
                  variant="outlined"
                  name="spoken_languages"
                  label="Idiomas o Lenguajes"
                  placeholder="Seleccione las que apliquen"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              )}
            />
          )}
        />

      </Grid>
    </Grid>
  )
}

export default AgeAndGender
