import { useEffect } from 'react';
import { useDirectoryProviders } from '@api';
import { Provider, User } from '@types';
import { Grid, makeStyles } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';

import { filterDirectoryDefaultValues } from '../constants';
import TopBar from '../common/topBar';
import ProviderContainer from '../common/ProviderContainer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  container: {
    borderTop: '1px solid #E5E7EB',
  },
}));

type ProviderProps = Provider & Pick<User, 'first_name' | 'last_name'>;

interface ProviderPayload {
  providers: ProviderProps[];
}

interface DirectoryProps {
  className?: string;
}

const Directory = ({ className }: DirectoryProps) => {
  const classes = useStyles();
  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: filterDirectoryDefaultValues,
  });
  const { data, isLoading, isIdle, mutate } = useDirectoryProviders<ProviderPayload>();

  const { getValues, reset } = formMethods;

  useEffect(() => {
    if (!data) {
      mutate(getValues());
    }
  }, []);

  const clearFilters = () => {
    reset(filterDirectoryDefaultValues);
    mutate(getValues());
  };

  return (
    <FormProvider {...formMethods}>
      <Grid className={`${classes.root} ${className}`}>
        <Grid container justifyContent="center" className={classes.container}>
          <TopBar mutate={mutate} clearFilters={clearFilters} />
        </Grid>

        <ProviderContainer isLoading={isLoading || isIdle} data={data} isPublicDirectory />
      </Grid>
    </FormProvider>
  );
};

export default Directory;
