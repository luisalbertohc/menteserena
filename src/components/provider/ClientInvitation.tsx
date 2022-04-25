import { Grid, makeStyles, Typography } from '@material-ui/core';

import CopyClipboard from './CopyClipboard';

const useStyles = makeStyles(theme => ({
  contentContainer: {
    margin: theme.spacing(0, 2),
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '20px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.6),
  },
  details: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(1),
    lineHeight: '24px',
    width: 254,
  },
}));

const ClientInvitation = ({ provider }) => {
  const classes = useStyles();

  const providerCode = provider?.provider_code || '';

  return (
    <Grid className={classes.contentContainer}>
      <Typography color="primary" className={classes.title}>
        Invita a tus Pacientes
      </Typography>
      <Typography className={classes.details}>Su código de proveedor es:</Typography>
      <CopyClipboard providerCode={providerCode} />
    </Grid>
  );
};

export default ClientInvitation;
