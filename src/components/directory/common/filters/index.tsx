import { Grid, makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import { useFormContext } from 'react-hook-form';

// Notas:
// - Eliminar campos después de su confirmación
// - Optimizar componente
// - Evaluar CSS

import {
  AREA_OF_FOCUS,
  GENDER_LIST,
  COUNTRY_LIST,
  POPULATION_SERV,
  // EXPERTISE,
  THEORETICAL_APPROACHES,
  HEALTH_PLANS,
  LANGUAGES,
} from '@components/onboarding/constants';

import { FilterSelect } from '@components/shared';

const useStyles = makeStyles(theme => ({
  textField: {
    height: 40,
    width: 250,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&.isPortalFilters': {
      marginRight: 'unset',
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 'unset',
    },
  },
  fieldsContainer: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

interface FiltersProps {
  className?: string;
  isPortalFilters?: boolean;
}

const Filters = ({ className, isPortalFilters }: FiltersProps) => {
  const classes = useStyles();

  const { control } = useFormContext();

  const filterSelectClasses = classnames({
    [classes.textField]: true,
    isPortalFilters,
  });

  return (
    <Grid className={`${classes.fieldsContainer} ${className}`}>
      <FilterSelect
        label="Género"
        options={GENDER_LIST}
        className={filterSelectClasses}
        name="gender"
        control={control}
      />

      <FilterSelect
        label="Pueblo Donde Ejerce"
        options={COUNTRY_LIST}
        className={filterSelectClasses}
        name="country"
        control={control}
      />

      <FilterSelect
        label="Área de Enfoque"
        options={AREA_OF_FOCUS}
        className={filterSelectClasses}
        name="area_of_focus"
        control={control}
      />

      <FilterSelect
        label="Poblaciones de Interés"
        options={POPULATION_SERV}
        className={filterSelectClasses}
        name="populations_serve"
        control={control}
      />

      {/* <FilterSelect
        label="Especialidad"
        options={EXPERTISE}
        className={filterSelectClasses}
        name="expertises"
        control={control}
      /> */}

      <FilterSelect
        label="Acercamientos Terapéuticos"
        options={THEORETICAL_APPROACHES}
        className={filterSelectClasses}
        name="theoretical_approaches"
        control={control}
      />

      <FilterSelect
        label="Seguro de Salud"
        options={HEALTH_PLANS}
        className={filterSelectClasses}
        name="health_cares"
        control={control}
      />

      <FilterSelect
        label="Idiomas o Lenguajes"
        options={LANGUAGES}
        className={filterSelectClasses}
        name="spoken_languages"
        control={control}
      />
    </Grid>
  );
};

export default Filters;
