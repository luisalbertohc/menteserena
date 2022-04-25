import { Button, Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    maxWidth: 675,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxWidth: 312,
    },
    '& > div': {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    marginBottom: theme.spacing(4),
    textAlign: 'center',
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
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '18.75px',
    color: theme.palette.grey[700],
  },
}));

interface AcademicHistory {
  degree: string;
  institution: string;
  year: number;
}

interface AcademicHistoryValues {
  academic_histories: Array<AcademicHistory>;
}

const PersonalInfo = () => {
  const classes = useStyles();
  const {
    register,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<any>();

  const { fields, append, remove } = useFieldArray<AcademicHistoryValues>({ name: 'academic_histories' });

  return (
    <Grid container direction="column" justify="center" alignItems="center" item>
      <Grid container item justify="center" direction="column" alignItems="center">
        <Typography className={classes.title} color="primary">
          Información del Proveedor
        </Typography>
      </Grid>
      <Grid className={classes.inputContainer} container item direction="column" justify="center">
        <Controller
          control={control}
          name="bio"
          defaultValue={getValues('bio')}
          rules={{
            maxLength: {
              value: 512,
              message: 'No más de 512 caracteres.',
            },
          }}
          render={({ field }) => (
            <TextField
              rows={5}
              multiline
              {...field}
              label="Biografía"
              placeholder="Ingrese su biografía"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.bio?.message)}
              helperText={errors?.bio?.message}
            />
          )}
        />

        <Grid container direction="column" alignItems="center">
          <Typography className={classes.title} color="primary">
            Historial Académico
          </Typography>
          <Typography className={classes.subTitle} color="primary">
            (Comenzar con el más reciente y añadir según sea necesario)
          </Typography>
        </Grid>
        {fields.map((item, index) => {
          return (
            <Grid key={item.id} container justify="center" wrap="nowrap" className={classes.inputContainer}>
              <TextField
                label="Grado"
                variant="outlined"
                InputProps={{ className: classes.textField }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.academic_histories?.[index]?.degree?.message)}
                helperText={errors?.academic_histories?.[index]?.degree?.message}
                defaultValue={getValues(`academic_histories.${index}.degree`)}
                {...register(`academic_histories.${index}.degree` as const, { required: 'Degree requerido' })}
              />
              <TextField
                variant="outlined"
                label="Institución"
                InputProps={{ className: classes.textField }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.academic_histories?.[index]?.institution?.message)}
                helperText={errors?.academic_histories?.[index]?.institution?.message}
                defaultValue={getValues(`academic_histories.${index}.institution`)}
                {...register(`academic_histories.${index}.institution` as const, { required: 'Intitucion requerida' })}
              />
              <TextField
                label="Año Obtenido "
                variant="outlined"
                InputProps={{ className: classes.textField }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.academic_histories?.[index]?.year?.message)}
                helperText={errors?.academic_histories?.[index]?.year?.message}
                defaultValue={getValues(`academic_histories.${index}.year`)}
                {...register(`academic_histories.${index}.year` as const, {
                  required: 'Año requerido',
                  pattern: {
                    value: /^[\d]{4}$/,
                    message: 'Ingresar solo 4 digitos.',
                  },
                })}
              />

              <Button className={classes.deleteButton} onClick={() => remove(index)}>
                <DeleteIcon color="error" />
              </Button>
            </Grid>
          );
        })}
        <Grid container justify="center">
          <Button
            onClick={() =>
              append({
                degree: '',
                institution: '',
                year: null,
              })
            }
          >
            <AddIcon />
            Añadir
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PersonalInfo;
