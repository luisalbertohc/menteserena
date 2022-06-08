import { Button, Grid, makeStyles, TextField, InputAdornment, Typography } from '@material-ui/core';
import { useFormContext, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { MultipleSelect } from '@components/shared';
import { HEALTH_PLANS } from '@components/onboarding/constants';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    marginBottom: theme.spacing(4),
  },
  inputContainer: {
    maxWidth: 675,
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
}));

interface RateAndService {
  isDisable?: boolean;
  sessionType: string;
  sessionLength: number;
  cost: number;
}

interface RateAndServiceValues {
  rate_and_services: RateAndService[];
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

  return (
    <Grid container justifyContent="center" direction="column" alignItems="center">
      <Grid container item justifyContent="center" alignItems="center" direction="column">
        <Typography className={classes.title} color="primary">
          Seguro de Salud
        </Typography>
      </Grid>
      <Grid className={classes.inputContainer} container item direction="column" justifyContent="center">
        <MultipleSelect
          name="health_cares"
          options={HEALTH_PLANS}
          label="Seguro de Salud"
          control={control}
          defaultValue={getValues('health_cares')}
        />
      </Grid>
      <Grid container item justifyContent="center" alignItems="center">
        <Typography className={classes.title} color="primary">
          Honorario Sin Seguro de Salud
        </Typography>
      </Grid>
      {fields.map((item, index) => {
        return (
          <Grid key={item.id} container justifyContent="center" wrap="nowrap" className={classes.inputContainer}>
            <TextField
              disabled={item?.isDisable}
              label="Tipo de Sesión"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.rate_and_services?.[index]?.session_type?.message)}
              helperText={errors?.rate_and_services?.[index]?.session_type?.message}
              defaultValue={getValues(`rate_and_services.${index}.session_type`)}
              inputProps={{
                title: `${item.session_type}`
              }}
              {...register(`rate_and_services.${index}.session_type` as const, { required: 'Sesión requerida' })}
            />
            <TextField
              label="Duración de la Sesión (minutos)"
              type="number"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.rate_and_services?.[index]?.session_length?.message)}
              helperText={errors?.rate_and_services?.[index]?.session_length?.message}
              defaultValue={getValues(`rate_and_services.${index}.session_length`)}
              {...register(`rate_and_services.${index}.session_length` as const, {
                required: 'Duración requerida',
                pattern: {
                  value: /^[\d]{1,3}$/,
                  message: 'Ingrese solo dígitos. (###)',
                },
              })}
            />
            <TextField
              label="Costo"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                className: classes.textField,
              }}
              error={Boolean(errors?.rate_and_services?.[index]?.cost?.message)}
              helperText={errors?.rate_and_services?.[index]?.cost?.message}
              defaultValue={getValues(`rate_and_services.${index}.cost`)}
              {...register(`rate_and_services.${index}.cost` as const, {
                required: 'Costo requerido',
                pattern: {
                  value: /^$|^\$?\d+(,\d{3})*(\.\d*)?$/,
                  message: 'Ingrese un costo valido.',
                },
              })}
            />
            {Boolean(index === 0)
              ?
                <Button className={classes.deleteButton} disabled={true} onClick={() => remove(index)}>
                  <DeleteIcon color="disabled" />
                </Button>
              :
                <Button className={classes.deleteButton} onClick={() => remove(index)}>
                  <DeleteIcon color="error" />
                </Button>
            }
          </Grid>
        );
      })}
      <Grid container justifyContent="center" className={classes.addButton}>
        <Button
          onClick={() =>
            append({
              cost: null,
              sessionType: '',
              sessionLength: 0,
              isDisable: false,
            })
          }
        >
          <AddIcon />
          Añadir
        </Button>
      </Grid>
    </Grid>
  );
};

export default RatesOfService;
