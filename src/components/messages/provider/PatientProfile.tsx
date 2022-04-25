import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ProfileView from '@components/patient/editProfile/ProfileView';

const useStyles = makeStyles(theme => ({
  profileHeader: {
    margin: theme.spacing(2, 0, 2, 3),
    '& > p': {
      fontSize: 16,
      lineHeight: '16px',
      fontWeight: 700,
    },
    '& > button': {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2, 0),
      paddingLeft: theme.spacing(1),
    },
  },
}));

interface PatientProfileProps {
  patient: any;
  closeProfile: () => void;
}

const PatientProfile = ({ patient, closeProfile }: PatientProfileProps) => {
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center" wrap="nowrap" className={classes.profileHeader}>
        <IconButton size="small" color="primary" onClick={closeProfile}>
          <CloseIcon />
        </IconButton>
        <Typography color="primary">Perfil</Typography>
      </Grid>
      <ProfileView patient={patient} isProviderSideProfileView />
    </>
  );
};

export default PatientProfile;
