import { Button, Grid, makeStyles, TextField, InputAdornment, useMediaQuery } from '@material-ui/core';
import { useFormContext, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { MultipleSelect } from '@components/shared';
import { HEALTH_PLANS } from '@components/onboarding/constants';
import Title from '../Title';

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
    '& > button': {
      marginBottom: theme.spacing (4)
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
  // inputContainer: {
  //   maxWidth: 675,
  //   '& > div': {
  //     marginBottom: theme.spacing(4),
  //   },
  // },
  // addButton: {
  //   marginBottom: theme.spacing(3),
  // },
  // textField: {
  //   height: 40,
  //   marginTop: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  // },
  // deleteButton: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   height: 40,
  // },
}));

interface RateAndService {
  isDisable?: boolean;
  sessionType: string;
  sessionLength: number;
  cost: number;
}

interface RateAndServiceValues {
  rate_and_services: Array<RateAndService>;
}

const RatesOfService = () => {
  const classes = useStyles();
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<any>();
  const { fields, append, remove } = useFieldArray<RateAndServiceValues>({ name: 'rate_and_services' });
  const smallSize = useMediaQuery('(min-width: 414px)') // verify that the size is greater than 414px

  return (
    <Grid container justify="center" direction="column" alignItems="center">


      <Grid className={classes.inputContainer} container item direction="column" justify="center">
        <Grid container item justify="center" alignItems="center" direction="column">
          <Title label="Planes Médicos" />
        </Grid>
        <MultipleSelect
          name="health_cares"
          options={HEALTH_PLANS}
          label="Seguro de Salud"
          control={control}
          defaultValue={getValues('health_cares')}
        />
        <Grid container item justify="center" alignItems="center">
          <Title label="Tarifas de Servicio" />
        </Grid>
      </Grid>


      {fields.map((item, index) => {
        return (
          <Grid key={ item.id } container justify="center" wrap="nowrap" className={ classes.inputContainer }>

            {/* session type */}
            <TextField
              disabled={ Boolean(index === 0) ? true : false }
              label="Tipo de Sesión"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{ shrink: true }}
              error={ Boolean(errors?.rate_and_services?.[index]?.session_type?.message) }
              helperText={ errors?.rate_and_services?.[index]?.session_type?.message }
              defaultValue={ getValues(`rate_and_services.${index}.session_type`) }
              inputProps={{ title: `${ item.session_type }` }}
              { ...register(`rate_and_services.${ index }.session_type` as const, { required: 'Sesión requerida' }) }
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
              defaultValue={ getValues(`rate_and_services.${index}.session_length`) }
              {...register(`rate_and_services.${index}.session_length` as const, {
                required: 'Duración requerida',
                pattern: {
                  value: /^[\d]{1,3}$/,
                  message: 'Ingrese solo dígitos. (###)',
                },
              })}
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
              defaultValue={ getValues(`rate_and_services.${index}.cost`) }
              {...register(`rate_and_services.${ index }.cost` as const, {
                required: 'Costo requerido',
                pattern: {
                  value: /^$|^\$?\d+(,\d{3})*(\.\d*)?$/,
                  message: 'Ingrese un costo valido.',
                },
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
            {/* {Boolean(index === 0)
              ?
                <Button className={ classes.deleteButton } disabled={ true } onClick={ () => remove(index) }>
                  <DeleteIcon color="disabled" />
                </Button>
              :
                <Button className={ classes.deleteButton } onClick={ () => remove(index) }>
                  <DeleteIcon color="error" />
                </Button>
            } */}
          </Grid>
        );
      })}

      <Grid container justify="center" className={classes.addButton}>
        <Button variant="contained" color="primary" onClick={ () => append({ cost: null, sessionType: '', sessionLength: 0, isDisable: false }) }>
          <AddIcon />
          Añadir
        </Button>
      </Grid>
    </Grid>
    // <>
    //   <Title label="Planes Médicos" />

    //   <Grid className={classes.inputContainer} container item direction="column" justify="center">
    //     <MultipleSelect name="health_cares" options={HEALTH_PLANS} label="Plan de Salud" control={control} />
    //   </Grid>

    //   <Title label="Tarifas de Servicio" />

    //   {fields.map((item, index) => {
    //     return (
    //       <Grid key={item.id} container justify="center" wrap="nowrap" className={classes.inputContainer}>
    //         <TextField
    //           disabled={item?.isDisable}
    //           label="Tipo de Sesión"
    //           variant="outlined"
    //           InputProps={{ className: classes.textField }}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           error={Boolean(errors?.rate_and_services?.[index]?.session_type?.message)}
    //           helperText={errors?.rate_and_services?.[index]?.session_type?.message}
    //           inputProps={{
    //             ...register(`rate_and_services.${index}.session_type` as const, { required: 'Sesión requerida' }),
    //             defaultValue: getValues(`rate_and_services.${index}.session_type`),
    //           }}
    //         />
    //         <TextField
    //           label="Duración de la Sesión (minutos)"
    //           type="number"
    //           variant="outlined"
    //           InputProps={{ className: classes.textField }}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           error={Boolean(errors?.rate_and_services?.[index]?.session_length?.message)}
    //           helperText={errors?.rate_and_services?.[index]?.session_length?.message}
    //           inputProps={{
    //             ...register(`rate_and_services.${index}.session_length` as const, { required: 'Duración requerida' }),
    //             defaultValue: getValues(`rate_and_services.${index}.session_length`),
    //           }}
    //         />
    //         <TextField
    //           label="Costo"
    //           variant="outlined"
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           InputProps={{
    //             startAdornment: <InputAdornment position="start">$</InputAdornment>,
    //             className: classes.textField,
    //           }}
    //           error={Boolean(errors?.rate_and_services?.[index]?.cost?.message)}
    //           helperText={errors?.rate_and_services?.[index]?.cost?.message}
    //           inputProps={{
    //             ...register(`rate_and_services.${index}.cost` as const, {
    //               pattern: {
    //                 value: /^$|^\$?\d+(,\d{3})*(\.\d*)?$/,
    //                 message: 'Ingrese un costo válido.',
    //               },
    //             }),
    //             defaultValue: getValues(`rate_and_services.${index}.cost`),
    //           }}
    //         />

    //         <Button className={classes.deleteButton} onClick={() => remove(index)}>
    //           <DeleteIcon color="error" />
    //         </Button>
    //       </Grid>
    //     );
    //   })}
    //   <Grid container justify="center" className={classes.addButton}>
    //     <Button
    //       color="primary"
    //       variant="contained"
    //       onClick={() =>
    //         append({
    //           cost: null,
    //           sessionType: '',
    //           sessionLength: 0,
    //           isDisable: false,
    //         })
    //       }
    //     >
    //       <AddIcon />
    //       Añadir
    //     </Button>
    //   </Grid>
    // </>
  );
};

export default RatesOfService;
