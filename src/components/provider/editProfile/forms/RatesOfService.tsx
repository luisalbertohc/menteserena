import { Button, Grid, makeStyles, TextField, InputAdornment } from '@material-ui/core';
import { useFormContext, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { MultipleSelect } from '@components/shared';
import { HEALTH_PLANS } from '@components/onboarding/constants';
import Title from '../Title';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    maxWidth: 675,
    '& > div': {
      marginBottom: theme.spacing(4),
    },
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
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
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

  return (
    <>
      <Title label="Planes Médicos" />

      <Grid className={classes.inputContainer} container item direction="column" justify="center">
        <MultipleSelect name="health_cares" options={HEALTH_PLANS} label="Plan de Salud" control={control} />
      </Grid>

      <Title label="Tarifas de Servicio" />

      {fields.map((item, index) => {
        return (
          <Grid key={item.id} container justify="center" wrap="nowrap" className={classes.inputContainer}>
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
              inputProps={{
                ...register(`rate_and_services.${index}.session_type` as const, { required: 'Sesión requerida' }),
                defaultValue: getValues(`rate_and_services.${index}.session_type`),
              }}
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
              inputProps={{
                ...register(`rate_and_services.${index}.session_length` as const, { required: 'Duración requerida' }),
                defaultValue: getValues(`rate_and_services.${index}.session_length`),
              }}
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
              inputProps={{
                ...register(`rate_and_services.${index}.cost` as const, {
                  pattern: {
                    value: /^$|^\$?\d+(,\d{3})*(\.\d*)?$/,
                    message: 'Ingrese un costo válido.',
                  },
                }),
                defaultValue: getValues(`rate_and_services.${index}.cost`),
              }}
            />

            <Button className={classes.deleteButton} onClick={() => remove(index)}>
              <DeleteIcon color="error" />
            </Button>
          </Grid>
        );
      })}
      <Grid container justify="center" className={classes.addButton}>
        <Button
          color="primary"
          variant="contained"
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
    </>
  );
};

export default RatesOfService;
