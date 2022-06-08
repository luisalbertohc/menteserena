import { Button, Grid, TextField, makeStyles, useMediaQuery, MenuItem } from '@material-ui/core'
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons'
import Title from '../Title'

// Notas:
// - Evaluar optimización de los componentes

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
      width: '100%',
    }
  },
  academicRecord: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxWidth: 312,
    },
    '& > div': {
      marginBottom: theme.spacing(4)
    },
    '& > .inputField': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0
      }
    }
  },
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    textAlign: 'center'
  },
  textField: {
    height: 40,
    padding: 'unset',
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
  select: {
    '& .MuiSelect-select': {
      paddingTop: 12,
      paddingBottom: 12
    },
    '& .MuiSelect-select:focus': {
      background: 'none'
    }
  },
  selected: {
    '& .MuiSelect-select': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  unselected: {
    '& .MuiSelect-select': {
      color: 'rgba(0, 0, 0, 0.26)'
    },
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

interface AcademicHistory { degree: string; institution: string; year: number }
interface AcademicHistoryValues { academic_histories: Array<AcademicHistory> }

const AcademicHistory = () => {
  const classes = useStyles()
  const { fields, append, remove } = useFieldArray<AcademicHistoryValues>({ name: 'academic_histories' })
  const { getValues, control, register, formState: { errors }, } = useFormContext()
  const smallSize = useMediaQuery('(min-width: 600px)') // verify that the size is greater than 600px

  return (
    <div className={ classes.wrapper }>

        <Title label="Información Personal" />

        {/* biography */}
        <Controller
          control={ control }
          name="bio"
          defaultValue={ getValues('bio') }
          rules={{
            maxLength: {
              value: 512,
              message: 'No más de 512 carácteres.',
            },
          }}
          render={({ field }) => (
            <TextField
              rows={ 5 }
              multiline
              { ...field }
              label="Biografía"
              placeholder="Ingrese detalles que desea compartir, para que potenciales pacientes le conozcan y se sientan en confianza de contactarle."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                ...register('bio', {
                  required: 'La biografía es requerida'
                })
              }}
              error={ Boolean(errors?.bio?.message) }
              helperText={ errors?.bio?.message }
            />
          )}
        />

        {/* degree */}
        <Controller
          name="degree"
          control={ control }
          defaultValue={ getValues('medical_degree') }
          render={({
            field: {
              onChange, // a function which sends the input's value to the library
              value: value = 'Seleccione su título académico' //	the current value of the controlled component
            }
          }) => (
            <TextField
              select // tell TextField to render like select element
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Título Académico"
              value={ value }
              onChange={ onChange }
              classes={{ root: classes.select }}
              className={ `${value !== 'Seleccione su título académico' ? classes.selected : classes.unselected}` }
              SelectProps={{ renderValue: (value) => value }}
              inputProps={{
                ...register('medical_degree', {
                  required: 'El título académico es requerido'
                })
              }}
              error={ Boolean(errors.medical_degree?.message) }
              helperText={ errors.medical_degree?.message }
            >
              <MenuItem key="Licenciado" value="Lcd.">Lcd.</MenuItem>
              <MenuItem key="Doctor" value="Dr.">Dr.</MenuItem>
            </TextField>
          )}
        />

        <Title label="Historial Académico" />

        {/* academic histories */}
        {fields.map((item, index) => {
          return (
            <div key={ item.id } className={ classes.academicRecord }>

              {/* degree */}
              <TextField
                placeholder="Ingrese grado"
                className={ 'inputField' }
                label="Grado"
                variant="outlined"
                InputProps={{ className: classes.textField }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={ Boolean(errors?.academic_histories?.[index]?.degree?.message) }
                helperText={ errors?.academic_histories?.[index]?.degree?.message }
                inputProps={{
                  ...register(`academic_histories.${index}.degree` as const, { required: 'El grado es requerido' }),
                  defaultValue: getValues(`academic_histories.${index}.degree`)
                }}
              />

              {/* institution */}
              <TextField
                placeholder="Ingrese institución"
                className={ 'inputField' }
                variant="outlined"
                label="Institución"
                InputProps={{ className: classes.textField }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={ Boolean(errors?.academic_histories?.[index]?.institution?.message) }
                helperText={ errors?.academic_histories?.[index]?.institution?.message }
                inputProps={{
                  ...register(`academic_histories.${index}.institution` as const, { required: 'La institución es requerida' }),
                  defaultValue: getValues(`academic_histories.${index}.institution`) 
                }}
              />

              {/* year */}
              <TextField
                placeholder="Ingrese año"
                className={ 'inputField' }
                label="Año de Obtención"
                variant="outlined"
                InputProps={{ className: classes.textField }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={ Boolean(errors?.academic_histories?.[index]?.year?.message) }
                helperText={ errors?.academic_histories?.[index]?.year?.message }
                inputProps={{
                  ...register(`academic_histories.${index}.year` as const, {
                    required: 'El año de obtención es requerido',
                    pattern: {
                      value: /^[\d]{4}$/,
                      message: 'Ingresar solo 4 dígitos',
                    },
                  }),
                  defaultValue: getValues(`academic_histories.${index}.year`),
                  validate: value => value > 1900 || 'El año no es válido'
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

        {/* next button */}
        <Grid container justifyContent="center">
          <Button variant="contained" color="primary" onClick={() => append({ degree: '', institution: '', year: null, })}>
            <AddIcon />
            Añadir
          </Button>
        </Grid>

    </div>
  )
}

export default AcademicHistory
