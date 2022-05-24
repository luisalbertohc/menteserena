import { useEffect } from 'react';
import { useDirectoryProviders } from '@api';
import { Provider, User } from '@types';
import { Grid, makeStyles, Hidden } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';

import { filterDirectoryDefaultValues } from '../constants';
import TopBar from '../common/topBar';
import DesktopFilter from '../common/DesktopFilter';
import ProviderContainer from '../common/ProviderContainer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

type ProviderProps = Provider & Pick<User, 'first_name' | 'last_name'>;

interface ProviderPayload {
  providers: ProviderProps[];
}

interface DirectoryPops {
  openMessages?: (params: number) => void;
}

const Directory = ({ openMessages }: DirectoryPops) => {
  const classes = useStyles();
  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: filterDirectoryDefaultValues,
  });
  const { data, isIdle, isLoading, mutate } = useDirectoryProviders<ProviderPayload>();

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
      <Grid className={`${classes.root} center`}>
        <Hidden lgUp>
          <TopBar mutate={mutate} clearFilters={clearFilters} />
        </Hidden>

        <ProviderContainer isLoading={isLoading || isIdle} data={data} isPortalCard openMessage={openMessages} />
      </Grid>

      <Hidden mdDown>
        <DesktopFilter className="right" mutate={mutate} clearFilters={clearFilters} />
      </Hidden>
    </FormProvider>
  );
};

export default Directory;
