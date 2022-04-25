import { Grid, makeStyles, Button, Typography, Container } from '@material-ui/core';
import { LocationOn as LocationOnIcon, PermIdentity as PermIdentityIcon } from '@material-ui/icons/';

import Specialty from './sections/Specialty';
import Credentials from './sections/Credentials';
import RateOfService from './sections/RateOfService';
import HealthPlans from './sections/HealthPlans';
import { Chip, Description } from '@components/shared';
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
  noPictureContainer: {
    height: '100%',
  },
  noPicture: {
    background: theme.palette.grey[200],
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
      border: `2px solid ${theme.palette.primary.main}`,
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
    width: '100%',
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

interface EditProfileScreenProps {
  editProfile?: () => void;
  actionProfile?: () => void;
  profile: any;
}

const ProfileView = ({ editProfile, actionProfile, profile }: EditProfileScreenProps) => {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    theoretical_approaches,
    populations_serve,
    country,
    bio,
    expertises,
    academic_histories,
    rate_and_services,
    health_cares,
    profile_picture,
  } = profile || {};

  return (
    <Grid container>
      <Grid className={classes.banner} />
      <Container>
        <Grid container>
          <Grid item container xs={6} justify="center">
            <Avatar avatarUrl={profile_picture} isDirectory />
          </Grid>
          {editProfile && (
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button color="primary" variant="outlined" onClick={editProfile}>
                Editar Perfil
              </Button>
            </Grid>
          )}
          {actionProfile && (
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button color="primary" variant="contained" onClick={actionProfile}>
                Contactar
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Typography className={classes.userName}>
            {first_name} {last_name}
          </Typography>
        </Grid>
        <Grid container>
          <Grid container item xs={12}>
            {theoretical_approaches.map(approach => (
              <Chip label={approach} key={approach} />
            ))}
          </Grid>
          <Grid container direction="column">
            {Boolean(populations_serve?.length) && (
              <Grid item>
                <Typography className={classes.userInfo}>
                  <PermIdentityIcon />
                  {populations_serve?.join(', ')}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.userInfo}>
                <LocationOnIcon />
                {country}, Puerto Rico
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {bio !== 'null' && Boolean(bio) && (
        <Grid container className={classes.section}>
          <Container>
            <Typography className={classes.header}>Acerca de mi</Typography>
            <Description content={bio} />
          </Container>
        </Grid>
      )}

      {Boolean(expertises?.length) && (
        <Grid container className={classes.section}>
          <Container>
            <Typography className={classes.header}>Especialidad</Typography>
            <Specialty specialties={expertises} />
          </Container>
        </Grid>
      )}

      {Boolean(academic_histories?.length) && (
        <Grid container className={classes.section}>
          <Container>
            <Typography className={classes.header}>Credenciales</Typography>
            <Credentials academicHistory={academic_histories} />
          </Container>
        </Grid>
      )}

      {Boolean(rate_and_services?.length) && (
        <Grid container className={classes.section}>
          <Container>
            <Typography className={classes.header}>Honorarios</Typography>
            <RateOfService rateAndServices={rate_and_services} />
          </Container>
        </Grid>
      )}

      {Boolean(health_cares?.length) && (
        <Grid container className={classes.section}>
          <Container>
            <Typography className={classes.header}>Planes de Salud</Typography>
            <HealthPlans healthPlans={health_cares} />
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

export default ProfileView;
