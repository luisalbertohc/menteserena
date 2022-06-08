import { Button, Grid, makeStyles, TextField, InputAdornment, useMediaQuery } from '@material-ui/core'
import { useFormContext, useFieldArray } from 'react-hook-form'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { MultipleSelect } from '@components/shared'
import { HEALTH_PLANS } from '@components/onboarding/constants'
import Title from '../Title'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 312,
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      maxWidth: '100%'
    },
    // styling all the children
    '& > div': {
      marginBottom: theme.spacing(4),
      width: '100%'
    }
  },
  rateAndServices: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxWidth: 312,
    },
    '& > div': {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0
      }
    },
    '& > .inputField': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0
      }
    }
  },
  addButton: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    height: 40,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    height: 40
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: theme.palette.error.main,
    textTransform: 'none',
    '& .MuiButton-label': {
      color: '#fff',
      fontSize: 14,
      textTransform: 'none'
    }
  },
  buttonIcon: {
    marginRight: 10,
    marginBottom: 4,
    color: theme.palette.common.white,
    fontSize: 18,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 'unset',
      fontSize: 24
    }
  }
}))

interface RateAndService {
  isDisable?: boolean
  sessionType: string
  sessionLength: number
  cost: number
}

interface RateAndServiceValues {
  rate_and_services: Array<RateAndService>
}

const RatesOfService = () => {
  const classes = useStyles()
  const { register, control, getValues, formState: { errors }, } = useFormContext<any>()
  const { fields, append, remove } = useFieldArray<RateAndServiceValues>({ name: 'rate_and_services' })
  const smallSize = useMediaQuery('(min-width: 600px)') // verify that the size is greater than 600px

  return (
    <div className={ classes.wrapper }>

      <Title label="Planes Médicos" />
      
      {/* health cares */}
      <MultipleSelect
        name="health_cares"
        options={ HEALTH_PLANS }
        label="Seguro de Salud"
        control={ control }
        defaultValue={ getValues('health_cares') }
      />
      
      <Title label="Tarifas de Servicio" />

      {/* rate and services */}
      {fields.map((item, index) => {
        return (
          <div key={ item.id } className={ classes.rateAndServices }>

            {/* session type */}
            <TextField
              disabled={ Boolean(index === 0) ? true : false }
              label="Tipo de Sesión"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{ shrink: true }}
              error={ Boolean(errors?.rate_and_services?.[index]?.session_type?.message) }
              helperText={ errors?.rate_and_services?.[index]?.session_type?.message }
              inputProps={{
                title: `${ item.session_type }`,
                ...register(`rate_and_services.${index}.session_type` as const, {
                  required: 'Sesión requerida'
                }),
                defaultValue: getValues(`rate_and_services.${index}.session_type`)
              }}
            />

            {/* session length */}
            <TextField
              label="Duración de la Sesión (minutos)"
              type="number"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{ shrink: true }}
              error={ Boolean(errors?.rate_and_services?.[index]?.session_length?.message) }
              helperText={ errors?.rate_and_services?.[index]?.session_length?.message }
              inputProps={{
                ...register(`rate_and_services.${index}.session_length` as const, {
                  required: 'Duración requerida',
                  pattern: {
                    value: /^[\d]{1,3}$/,
                    message: 'Ingrese solo dígitos. (###)',
                  },
                }),
                defaultValue: getValues(`rate_and_services.${index}.session_length`)
              }}
            />

            {/* cost */}
            <TextField
              label="Costo"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                className: classes.textField,
              }}
              error={ Boolean(errors?.rate_and_services?.[index]?.cost?.message) }
              helperText={ errors?.rate_and_services?.[index]?.cost?.message }
              inputProps={{
                ...register(`rate_and_services.${ index }.cost` as const, {
                  required: 'Costo requerido',
                  pattern: {
                    value: /^$|^\$?\d+(,\d{3})*(\.\d*)?$/,
                    message: 'Ingrese un costo valido.',
                  },
                }),
                defaultValue: getValues(`rate_and_services.${index}.cost`)
              }}
            />

            {/* delete button */}
            {Boolean(index === 0)
              ?
                <Button 
                  disabled={ true }
                  variant={ smallSize ? 'text' : 'contained' }
                  className={ classes.deleteButton }
                  classes={{ root: smallSize ? '' : classes.button }}
                  onClick={ () => remove(index) }
                >
                  <DeleteIcon classes={{ root: smallSize ? '' : classes.buttonIcon }} />
                  { Boolean(smallSize) ? '' : 'ELIMINAR' }
                </Button>
              :
                <Button 
                  variant={ smallSize ? 'text' : 'contained' }
                  className={ classes.deleteButton }
                  classes={{ root: smallSize ? '' : classes.button }}
                  onClick={ () => remove(index) }
                >
                  <DeleteIcon color="error" classes={{ root: smallSize ? '' : classes.buttonIcon }} />
                  { Boolean(smallSize) ? '' : 'ELIMINAR' }
                </Button>
            }
            
          </div>
        )
      })}

      <Grid container justifyContent="center" className={ classes.addButton }>
        <Button variant="contained" color="primary" onClick={ () => append({ cost: null, sessionType: '', sessionLength: 0, isDisable: false }) }>
          <AddIcon />
          Añadir
        </Button>
      </Grid>

    </div>
  )
}

export default RatesOfService
