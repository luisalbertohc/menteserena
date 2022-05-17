import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

import { MultipleSelect } from '@components/shared';
// import { AREA_OF_FOCUS, POPULATION_SERV, THEORETICAL_APPROACHES, EXPERTISE } from '../../constants';
import { AREA_OF_FOCUS, POPULATION_SERV, THEORETICAL_APPROACHES } from '../../constants';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    maxWidth: 350,
    '& > div': {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    marginBottom: theme.spacing(4),
  },
}));

const PracticeInfo = () => {
  const classes = useStyles();
  const { control, getValues } = useFormContext();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid container item justify="center" direction="column" alignItems="center">
        <Typography className={classes.title} color="primary">
          Información de la Práctica
        </Typography>
      </Grid>
      <Grid className={classes.inputContainer} container item direction="column" justify="center">
        <MultipleSelect
          options={AREA_OF_FOCUS} 
          label="Áreas de Enfoque"
          control={control}
          name="area_of_focus"
          defaultValue={getValues('area_of_focus')}
        />

        <MultipleSelect
          options={POPULATION_SERV}
          label="Poblaciones de Interés"
          control={control}
          name="populations_serve"
          defaultValue={getValues('populations_serve')}
        />

        {/* <MultipleSelect
          options={EXPERTISE}
          label="Especialidad"
          control={control}
          name="expertises"
          defaultValue={getValues('expertises')}
          inputProps={{
            value: 'prueba'
          }}
        /> */}

        <MultipleSelect
          options={THEORETICAL_APPROACHES}
          label="Acercamientos Terapéuticos"
          control={control}
          name="theoretical_approaches"
          defaultValue={getValues('theoretical_approaches')}
        />
      </Grid>
    </Grid>
  );
};

export default PracticeInfo;
