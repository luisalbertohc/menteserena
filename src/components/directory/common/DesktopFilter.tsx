import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { FilterList as FilterListIcon, Search as SearchIcon } from '@material-ui/icons';
import { useFormContext } from 'react-hook-form';

import Filters from '@components/directory/common/filters';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    width: 250,
  },
  searchIcon: {
    fill: theme.palette.grey[600],
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    margin: theme.spacing(0, 2),
    '&>:first-child': {
      marginBottom: theme.spacing(2),
    },
    '& > button': {
      textTransform: 'capitalize',
    },
  },
}));

const DesktopFilter = ({ className, mutate, clearFilters }) => {
  const classes = useStyles();

  const { handleSubmit, register } = useFormContext();

  return (
    <Grid container justifyContent="center" className={className}>
      <Typography color="primary" variant="h5" className={classes.title}>
        Filtros <FilterListIcon />
      </Typography>
      <TextField
        variant="outlined"
        InputProps={{
          className: classes.searchBar,
          endAdornment: <SearchIcon className={classes.searchIcon} />,
        }}
        placeholder="Nombre o apellido"
        inputProps={register('search_term')}
        onChange={handleSubmit(mutate)}
      />
      <Grid container justifyContent="center">
        <Filters className={classes.filters} isPortalFilters />

        <Grid container direction="column" justifyContent="center" className={classes.buttonContainer}>
          <Button color="primary" variant="contained" onClick={handleSubmit(mutate)}>
            Filtrar
          </Button>
          <Button color="primary" variant="contained" onClick={clearFilters}>
            Remover Filtros
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DesktopFilter;
