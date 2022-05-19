import { Button, Grid, TextField, makeStyles, useMediaQuery, MenuItem, Typography } from '@material-ui/core'
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons'
import Title from '../Title'

const useStyles = makeStyles(theme => ({
  inputContainer: {
    // maxWidth: 675,
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
  const smallSize = useMediaQuery('(min-width: 414px)') // verify that the size is greater than 414px

  return (
    <Grid container direction="column" justify="center" alignItems="center" item>
      <Grid className={classes.inputContainer} container item direction="column" justify="center">

        <Grid container>
          <Title label="Información Personal" />
        </Grid>

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
              SelectProps={{
                renderValue: (value) => value
              }}
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

        <Grid container>
          <Title label="Historial Académico" />
        </Grid>

        {/* academic histories */}
        {fields.map((item, index) => {
          return (
            <Grid key={ item.id } container justify="center" wrap="nowrap" className={ classes.inputContainer }>

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
                defaultValue={ getValues(`academic_histories.${index}.degree`) }
                { ...register(`academic_histories.${index}.degree` as const, { required: 'El grado es requerido' }) }
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
                defaultValue={ getValues(`academic_histories.${index}.institution`) }
                { ...register(`academic_histories.${index}.institution` as const, { required: 'La institución es requerida' }) }
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
                defaultValue={ getValues(`academic_histories.${index}.year`) }
                {...register(`academic_histories.${index}.year` as const, {
                  required: 'El año de obtención es requerido',
                  pattern: {
                    value: /^[\d]{4}$/,
                    message: 'Ingresar solo 4 dígitos.',
                  },
                  validate: value => value > 1900 || 'El año no es válido.'
                })}
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
            </Grid>
          )
        })}

        {/* next button */}
        <Grid container justify="center">
          <Button onClick={() => append({ degree: '', institution: '', year: null, })}>
            <AddIcon />
            Añadir
          </Button>
        </Grid>

      </Grid>
    </Grid>
    // <Grid className={classes.inputContainer} container item direction="column" justify="center">
      
    //   <Grid container>
    //     <Title label="Información Personal" />
    //   </Grid>
      
    //   {/* biography */}
    //   <TextField
    //     name="bio"
    //     rows={ 5 }
    //     multiline
    //     label="Biografía"
    //     placeholder="Ingrese su biografía"
    //     variant="outlined"
    //     error={ Boolean(errors?.bio?.message) }
    //     helperText={ errors?.bio?.message }
    //     InputLabelProps={{ shrink: true }}
    //     inputProps={{
    //       ...register('bio', {
    //         maxLength: {
    //           value: 512,
    //           message: 'No más de 512 caracteres.',
    //         },
    //       }),
    //     }}
    //   />

    //   {/* degree */}
    //   <Controller
    //       name="degree"
    //       control={ control }
    //       render={({
    //         field: {
    //           onChange, // a function which sends the input's value to the library
    //           value: value = 'Seleccione su título académico' //	the current value of the controlled component
    //         }
    //       }) => (
    //         <TextField
    //           select // tell TextField to render like select element
    //           variant="outlined"
    //           InputLabelProps={{ shrink: true }}
    //           label="Título Académico"
    //           value={ value }
    //           onChange={ onChange }
    //           classes={{ root: classes.select }}
    //           className={ `${value !== 'Seleccione su título académico' ? classes.selected : classes.unselected}` }
    //           SelectProps={{
    //             renderValue: (value) => value
    //           }}
    //           inputProps={{
    //             ...register('medical_degree', {
    //               required: 'El título académico es requerido'
    //             })
    //           }}
    //           error={ Boolean(errors.medical_degree?.message) }
    //           helperText={ errors.medical_degree?.message }
    //         >
    //           <MenuItem key="Licenciado" value="Lcd.">Lcd.</MenuItem>
    //           <MenuItem key="Doctor" value="Dr.">Dr.</MenuItem>
    //         </TextField>
    //       )}
    //     />
        

    //   <Grid container>
    //     <Title label="Historial Académico" />
    //   </Grid>

    //   {fields.map((item, index) => {
    //     return (
    //       <Grid key={ item.id } container justify="center" wrap="nowrap" className={ classes.inputContainer }>

    //         {/* degree */}
    //         <TextField
    //           label="Grado Obtenido"
    //           variant="outlined"
    //           InputProps={{ className: classes.textField }}
    //           InputLabelProps={{ shrink: true }}
    //           error={ Boolean(errors?.academic_histories?.[index]?.degree?.message) }
    //           helperText={ errors?.academic_histories?.[index]?.degree?.message }
    //           inputProps={{
    //             ...register(`academic_histories.${index}.degree` as const, { required: 'Grado requerido' }),
    //             defaultValue: getValues(`academic_histories.${index}.degree`),
    //           }}
    //         />

    //         {/* institution */}
    //         <TextField
    //           variant="outlined"
    //           label="Institución"
    //           InputProps={{ className: classes.textField }}
    //           InputLabelProps={{ shrink: true }}
    //           error={ Boolean(errors?.academic_histories?.[index]?.institution?.message) }
    //           helperText={ errors?.academic_histories?.[index]?.institution?.message }
    //           inputProps={{
    //             ...register(`academic_histories.${index}.institution` as const, { required: 'Institución requerida' }),
    //             defaultValue: getValues(`academic_histories.${index}.institution`),
    //           }}
    //         />

    //         {/* year */}
    //         <TextField
    //           label="Año"
    //           variant="outlined"
    //           InputProps={{ className: classes.textField }}
    //           InputLabelProps={{ shrink: true }}
    //           error={ Boolean(errors?.academic_histories?.[index]?.year?.message) }
    //           helperText={ errors?.academic_histories?.[index]?.year?.message }
    //           inputProps={{
    //             ...register(`academic_histories.${index}.year` as const, {
    //               required: 'Año requerido',
    //               pattern: {
    //                 value: /^[\d]{4}$/,
    //                 message: 'Ingresar solo 4 digitos.',
    //               },
    //             }),
    //             defaultValue: getValues(`academic_histories.${index}.year`),
    //           }}
    //         />

    //         {/* <Button className={ classes.deleteButton } onClick={ () => remove(index) }>
    //           <DeleteIcon color="error" />
    //         </Button> */}
    //         {/* delete button */}
    //         {Boolean(index === 0)
    //           ?
    //             <Button 
    //               disabled={ true }
    //               variant={ smallSize ? 'text' : 'contained' }
    //               className={ classes.deleteButton }
    //               classes={{ root: smallSize ? '' : classes.button }}
    //               onClick={ () => remove(index) }
    //             >
    //               <DeleteIcon classes={{ root: smallSize ? '' : classes.buttonIcon }} />
    //               { Boolean(smallSize) ? '' : 'ELIMINAR' }
    //             </Button>
    //           :
    //             <Button 
    //               variant={ smallSize ? 'text' : 'contained' }
    //               className={ classes.deleteButton }
    //               classes={{ root: smallSize ? '' : classes.button }}
    //               onClick={ () => remove(index) }
    //             >
    //               <DeleteIcon color="error" classes={{ root: smallSize ? '' : classes.buttonIcon }} />
    //               { Boolean(smallSize) ? '' : 'ELIMINAR' }
    //             </Button>
    //           }
    //       </Grid>
    //     )
    //   })}

    //   {/* add button */}
    //   <Grid container justify="center">
    //     <Button color="primary" variant="contained" onClick={ () => append({ degree: '', institution: '', year: null }) }>
    //       <AddIcon />
    //       Añadir
    //     </Button>
    //   </Grid>

    // </Grid>
  )
}

export default AcademicHistory
