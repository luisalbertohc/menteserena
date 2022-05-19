import { Grid, makeStyles } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

import { MultipleSelect } from '@components/shared';
import { AREA_OF_FOCUS, POPULATION_SERV, THEORETICAL_APPROACHES, EXPERTISE } from '@components/onboarding/constants';
import Title from '../Title';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    margin: '0 auto',
    maxWidth: 312,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '100%'
    },
    '& > div': {
      marginBottom: theme.spacing(4),
      width: '100%'
    },
  },
}));

const PracticeInfo = () => {
  const classes = useStyles();
  const { control } = useFormContext();

  return (
    <>
      
      <Grid className={classes.inputContainer} container item direction="column" justify="center">
        <Grid container>
          <Title label="Información Práctica" />
        </Grid>
        <MultipleSelect options={AREA_OF_FOCUS} label="Área de Enfoque" control={control} name="area_of_focus" />

        <MultipleSelect
          options={POPULATION_SERV}
          label="Poblaciones de Interés"
          control={control}
          name="populations_serve"
        />

        {/* <MultipleSelect options={EXPERTISE} label="Especialidad" control={control} name="expertises" /> */}

        <MultipleSelect
          options={THEORETICAL_APPROACHES}
          label="Acercamientos Terapéuticos"
          control={control}
          name="theoretical_approaches"
        />
      </Grid>
    </>
  );
};

export default PracticeInfo;
