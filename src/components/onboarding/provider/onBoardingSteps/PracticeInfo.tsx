import { Grid, makeStyles, Typography } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

import { MultipleSelect } from '@components/shared'
import { AREA_OF_FOCUS, POPULATION_SERV, THEORETICAL_APPROACHES, EXPERTISE } from '../../constants'

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
}))

const PracticeInfo = () => {
  const classes = useStyles()
  const { control, getValues } = useFormContext()

  return (
    <Grid container direction="column" justify="center" alignItems="center">

      <Grid container item justify="center" direction="column" alignItems="center">
        <Typography className={ classes.title } color="primary">
          Información de la Práctica
        </Typography>
      </Grid>

      <Grid className={ classes.inputContainer } container item direction="column" justify="center">

        {/* area of focus */}
        <MultipleSelect
          options={ AREA_OF_FOCUS } 
          label="Áreas de Enfoque"
          control={ control }
          name="area_of_focus"
          rules={{
            // validate: value => value > 0 || "Ingrese al menos un área de enfoque"
            required: "Ingrese al menos un área de enfoque"
          }}
        />

        <MultipleSelect
          options={POPULATION_SERV}
          label="Poblaciones de Interés"
          control={control}
          name="populations_serve"
          defaultValue={getValues('populations_serve')}
          rules={{ required: 'Ingrese al menos una población de interés' }}
        />

        {/* <MultipleSelect
          options={EXPERTISE}
          label="Especialidad"
          control={control}
          name="expertises"
          defaultValue={getValues('expertises')}
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
  )
}

export default PracticeInfo
