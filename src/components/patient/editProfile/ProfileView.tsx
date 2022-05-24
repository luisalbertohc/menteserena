import { Grid, makeStyles, Button, Typography, Container } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ContactInformation from './sections/ContactInformation';
import { Description } from '@components/shared';
import Avatar from '@components/profile/Avatar';

const useStyles = makeStyles(theme => ({
  banner: {
    height: 100,
    width: '100%',
    position: 'relative',
    background: `linear-gradient(90deg, #57C4C4 -9.68%, #F4DCB3 111.21%)`,
    backdropFilter: 'blur(204.2px)',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    position: 'absolute',
    top: 122,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: '50%',
    position: 'absolute',
    border: '4px solid #FFFFFF',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    '& > button': {
      width: 144,
      height: 38,
      textTransform: 'capitalize',
      border: '2px solid',
      fontWeight: 500,
    },
  },
  userName: {
    width: '100%',
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '20px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  userInfo: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      fill: theme.palette.primary.main,
      fontSize: 20,
      marginRight: theme.spacing(1),
    },
  },
  section: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(3, 0),
  },
  header: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '27px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(1),
  },
}));

interface ProfileViewProps {
  editProfile?: () => void;
  patient: any;
  isProviderSideProfileView?: boolean;
}

const ProfileView = ({ editProfile, patient, isProviderSideProfileView }: ProfileViewProps) => {
  const classes = useStyles();

  const { first_name, last_name, place_of_residence, profile_picture, reason_to_referral } = patient ?? {};

  return (
    <Grid container>
      <Grid className={classes.banner} />
      <Container>
        <Grid container>
          <Grid container justify="center" item xs={6}>
            <Avatar avatarUrl={profile_picture} />
          </Grid>
          {!isProviderSideProfileView && (
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button color="primary" variant="outlined" onClick={editProfile}>
                Editar Perfil
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Typography className={classes.userName}>
            {first_name} {last_name}
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid>
            <Typography className={classes.userInfo}>
              <LocationOnIcon />
              {place_of_residence}, Puerto Rico
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Grid container className={classes.section}>
        <Container>
          <Typography className={classes.header}>Razón por la que Busca Ayuda</Typography>
          <Description content={reason_to_referral} />
        </Container>
      </Grid>

      <Grid container className={classes.section}>
        <Container>
          <Typography className={classes.header}>Contacto de Emergencia</Typography>
          <ContactInformation patient={patient} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default ProfileView;
