import { Button, Grid, TextField, makeStyles } from '@material-ui/core';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';

import Title from '../Title';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    '& > div': {
      marginBottom: theme.spacing(3),
    },
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
}));

interface AcademicHistory {
  degree: string;
  institution: string;
  year: number;
}

interface AcademicHistoryValues {
  academic_histories: Array<AcademicHistory>;
}

const AcademicHistory = () => {
  const classes = useStyles();

  const { fields, append, remove } = useFieldArray<AcademicHistoryValues>({ name: 'academic_histories' });
  const {
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid container>
        <Title label="Historial Académico" />
      </Grid>
      {fields.map((item, index) => {
        return (
          <Grid key={item.id} container justify="center" wrap="nowrap" className={classes.inputContainer}>
            <TextField
              label="Grado Obtenido"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.academic_histories?.[index]?.degree?.message)}
              helperText={errors?.academic_histories?.[index]?.degree?.message}
              inputProps={{
                ...register(`academic_histories.${index}.degree` as const, { required: 'Grado requerido' }),
                defaultValue: getValues(`academic_histories.${index}.degree`),
              }}
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
              inputProps={{
                ...register(`academic_histories.${index}.institution` as const, { required: 'Institución requerida' }),
                defaultValue: getValues(`academic_histories.${index}.institution`),
              }}
            />
            <TextField
              label="Año"
              variant="outlined"
              InputProps={{ className: classes.textField }}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.academic_histories?.[index]?.year?.message)}
              helperText={errors?.academic_histories?.[index]?.year?.message}
              inputProps={{
                ...register(`academic_histories.${index}.year` as const, {
                  required: 'Año requerido',
                  pattern: {
                    value: /^[\d]{4}$/,
                    message: 'Ingresar solo 4 digitos.',
                  },
                }),
                defaultValue: getValues(`academic_histories.${index}.year`),
              }}
            />

            <Button className={classes.deleteButton} onClick={() => remove(index)}>
              <DeleteIcon color="error" />
            </Button>
          </Grid>
        );
      })}
      <Grid container justify="center">
        <Button
          color="primary"
          variant="contained"
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
    </>
  );
};

export default AcademicHistory;
