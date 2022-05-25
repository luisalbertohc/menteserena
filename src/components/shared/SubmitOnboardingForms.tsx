import { Grid, makeStyles } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { LabelCheckBox } from '@components/shared';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 312,
    margin: 'auto',
  },
}));
const SubmitOnBoardingForms = () => {
  const classes = useStyles();
  const { control, getValues } = useFormContext();

  return (
    <Grid className={classes.root}>
      <LabelCheckBox
        name="information_public"
        label="Incluirme en el Directorio de Terapeutas para que los pacientes potenciales puedan encontrarme, acepto y entiendo que esto significa que la información que incluí se hará pública"
        control={control}
        defaultValue={getValues('information_public')}
      />
    </Grid>
  );
};

export default SubmitOnBoardingForms;
