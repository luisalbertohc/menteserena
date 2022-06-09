import { useState } from 'react';
import {
  InputAdornment,
  Button,
  Grid,
  Container,
  makeStyles,
  TextField,
  Collapse,
  useMediaQuery,
} from '@material-ui/core';
import { FilterList as FilterListIcon, Search as SearchIcon } from '@material-ui/icons';
import { useFormContext } from 'react-hook-form';

import Filters from '../filters';

const useStyles = makeStyles(theme => ({
  filterContainer: {
    background: theme.palette.common.white,
    borderBottom: '1px solid #E5E7EB',
    paddingTop: 16,
    width: '100%',
  },
  searchBar: {
    height: 40,
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: 250,
      marginLeft: 'auto',
    },
  },
  searchIcon: {
    fill: theme.palette.grey[600],
    cursor: 'pointer',
  },
  fieldsContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  divider: {
    height: 28,
    margin: 4,
  },
  inputPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  adormentInput: {
    borderLeft: '1px solid black',
    height: '60%',
    paddingLeft: theme.spacing(1.2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  buttonContainer: {
    '&>:first-child': {
      marginRight: theme.spacing(2),
    },
    '& > button': {
      textTransform: 'capitalize',
    },
  },
}));

const TopBar = ({ mutate, clearFilters }) => {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const { handleSubmit, register } = useFormContext();

  const isMobileSize = useMediaQuery('(max-width: 600px)');

  return (
    <Collapse in={collapsed} collapsedHeight={70} className={classes.filterContainer}>
      <Grid container component={Container} justifyContent="flex-end" wrap="nowrap">
        <Grid container item justifyContent="flex-end">
          <TextField
            variant="outlined"
            InputProps={{
              className: classes.searchBar,
              endAdornment: (
                <InputAdornment className={classes.adormentInput} position="end">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              ),
            }}
            placeholder="Nombre o apellido"
            inputProps={register('search_term')}
            onChange={handleSubmit(mutate)}
          />
          <Button variant="outlined" onClick={() => setCollapsed(!collapsed)} className={classes.button}>
            {!isMobileSize && 'Filtrar'}
            <FilterListIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.fieldsContainer}>
        <Container>
          <Filters />
          <Grid container justifyContent="center" className={classes.buttonContainer}>
            <Button color="primary" variant="contained" onClick={handleSubmit(mutate)}>
              Filtrar
            </Button>
            <Button color="primary" variant="contained" onClick={clearFilters}>
              Remover Filtros
            </Button>
          </Grid>
        </Container>
      </Grid>
    </Collapse>
  );
};

export default TopBar;
