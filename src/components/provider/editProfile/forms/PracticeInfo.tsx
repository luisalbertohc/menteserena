import { makeStyles } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { MultipleSelect } from '@components/shared'
import { AREA_OF_FOCUS, POPULATION_SERV, THEORETICAL_APPROACHES } from '@components/onboarding/constants'
import Title from '../Title'

// Notas:
// - Evaluar optimización de los componentes

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 312,
    [theme.breakpoints.up('sm')]: {
      margin: 'inherit',
      justifyContent: 'space-between',
      maxWidth: '100%'
    },
    // styling all the children
    '& > div': {
      marginBottom: theme.spacing(4),
      width: '100%'
    }
  }
}))

const PracticeInfo = () => {
  const classes = useStyles()
  const { control } = useFormContext()

  return (
    <div className={ classes.wrapper }>

      <Title label="Información Práctica" />

      {/* area of focus */}
      <MultipleSelect
        options={ AREA_OF_FOCUS }
        label="Área de Enfoque"
        control={ control }
        name="area_of_focus"
      />
      
      {/* populations serve */}
      <MultipleSelect
        options={ POPULATION_SERV }
        label="Poblaciones de Interés"
        control={ control }
        name="populations_serve"
      />

      {/* theorical approaches */}
      <MultipleSelect
        options={ THEORETICAL_APPROACHES }
        label="Acercamientos Terapéuticos"
        control={ control }
        name="theoretical_approaches"
      />

    </div>
  )
}

export default PracticeInfo
