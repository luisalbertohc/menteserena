import { Grid } from '@material-ui/core';

import { Provider } from '@types';
import ClientInvitation from './ClientInvitation';

interface ShareProviderCodeProps {
  provider: Provider;
}

const ShareProviderCode = ({ provider }: ShareProviderCodeProps) => {
  return (
    <Grid container justifyContent="center" alignItems="center" className="center">
      <ClientInvitation provider={provider} />
    </Grid>
  );
};

export default ShareProviderCode;
