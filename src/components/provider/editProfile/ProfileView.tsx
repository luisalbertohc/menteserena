import { Grid, makeStyles, Button, Typography, Container } from '@material-ui/core'
// import { LocationOn as LocationOnIcon, PermIdentity as PermIdentityIcon } from '@material-ui/icons/'

import GradeIcon from '@material-ui/icons/Grade'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import RoomIcon from '@material-ui/icons/Room'
import PhoneIcon from '@material-ui/icons/Phone'
import PersonIcon from '@material-ui/icons/Person'
import theme from '@components/theme'
import config from '@config'
import AreaFocus from './sections/AreaFocus'
import Presentation from './sections/Presentation'
import AcademicHistory from './sections/AcademicHistory'
import RateAndServices from './sections/RateAndServices'

// Notas:
// - Depurar componente

// import Specialty from './sections/Specialty'
// import Credentials from './sections/Credentials'
// import RateOfService from './sections/RateOfService'
// import HealthPlans from './sections/HealthPlans'
// import { Chip, Description } from '@components/shared'

// import Avatar from '@components/profile/Avatar'
// import { url } from 'inspector'

const useStyles = makeStyles(theme => ({
  dialog: {
    position: 'relative',
    padding: theme.spacing(5, 3),
    '& *': {
      fontSize: 12
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
      '& *': {
        fontSize: 14
      }
    }
  },
  dialogImage: {
    position: 'absolute',
    right: 24,
    [theme.breakpoints.up('sm')]: {
      top: 52,
      right: '50.5px'
    }
  },
  dialogImageCouch: {
    position: 'relative',
    width: 128,
    height: 100,
    backgroundImage: 'url(/images/sillon.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    [theme.breakpoints.up('sm')]: {
      width: 182,
      height: 141
    }
  },
  dialogImageProfile: {
    position: 'absolute',
    top: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '50%',
    width: 70,
    height: 70,
    backgroundColor: '#e5e7eb',
    filter: 'drop-shadow(-3px 3px 3px #00000050)',
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      height: 100
    }
  },
  dialogDegree: {
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18
    }
  },
  dialogUsername: {
    marginBottom: 30,    
    width: '50%',
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'capitalize',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('sm')]: {
      marginBottom: 30,
      width: 'inherit',
      fontSize: 24,
      // WebkitLineClamp: 'unset',
      // WebkitBoxOrient: 'unset',
      // overflow: 'unset',
      // textOverflow: 'unset'
    }
  },
  dialogItem: {
    marginBottom: 20,
    display: 'flex',
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      marginTop: 1,
      marginRight: 10,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20
      }
    }
  },
  dialogItemMargin: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0
    }
  },
  dialogButton: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    '& button': {
      width: '100%',
      height: 35,
      textTransform: 'none',
      '& .MuiButton-label': {
        fontSize: 16
      },
      [theme.breakpoints.up('sm')]: {
        width: 169,
        margin: '0 auto'
      }
    }
  },
  dialogTitle: {
    paddingBottom: theme.spacing(2),
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    }
  },
  dialogTargetPopulation: {
    '& span:first-letter': {
      textTransform: 'capitalize'
    },
  },
  dialogContentLeft: {
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
      borderRight: '1px solid #D9D9D9',
      padding: theme.spacing(3, 0),
      paddingRight: theme.spacing(3)
    }
  },
  dialogContentRight: {
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 0),
      paddingLeft: theme.spacing(3)
    }
  },
  dialogBorders: {
    border: 0,
    [theme.breakpoints.up('sm')]: {
      borderTop: '1px solid #D9D9D9',
      borderBottom: '1px solid #D9D9D9'
    }
  },










  // banner: {
  //   height: 100,
  //   width: '100%',
  //   position: 'relative',
  //   background: `linear-gradient(90deg, #57C4C4 -9.68%, #F4DCB3 111.21%)`,
  //   backdropFilter: 'blur(204.2px)',
  // },
  // circle: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: '50%',
  //   position: 'absolute',
  //   top: 122,
  // },
  // noPictureContainer: {
  //   height: '100%',
  // },
  // noPicture: {
  //   background: theme.palette.grey[200],
  // },
  // image: {
  //   height: 120,
  //   width: 120,
  //   borderRadius: '50%',
  //   position: 'absolute',
  //   border: '4px solid #FFFFFF',
  // },
  // buttonContainer: {
  //   marginTop: theme.spacing(2),
  //   '& > button': {
  //     width: 144,
  //     height: 38,
  //     textTransform: 'capitalize',
  //     border: `2px solid ${theme.palette.primary.main}`,
  //     fontWeight: 500,
  //   },
  // },
  // userName: {
  //   width: '100%',
  //   fontSize: 20,
  //   fontWeight: 700,
  //   lineHeight: '20px',
  //   color: theme.palette.grey[900],
  //   marginBottom: theme.spacing(2),
  //   textAlign: 'center',
  //   [theme.breakpoints.down('xs')]: {
  //     textAlign: 'left',
  //   },
  // },
  // userInfo: {
  //   width: '100%',
  //   fontSize: 16,
  //   fontWeight: 400,
  //   lineHeight: '21px',
  //   color: theme.palette.grey[600],
  //   marginBottom: theme.spacing(2),
  //   display: 'flex',
  //   alignItems: 'center',
  //   '& > svg': {
  //     fill: theme.palette.primary.main,
  //     fontSize: 20,
  //     marginRight: theme.spacing(1),
  //   },
  // },
  // section: {
  //   borderTop: `1px solid ${theme.palette.grey[300]}`,
  //   padding: theme.spacing(3, 0),
  // },
  // header: {
  //   fontSize: 20,
  //   fontWeight: 400,
  //   lineHeight: '27px',
  //   color: theme.palette.grey[900],
  //   marginBottom: theme.spacing(1),
  // },
}))

interface EditProfileScreenProps {
  editProfile?: () => void
  actionProfile?: () => void
  profile: any
}

const ProfileView = ({ editProfile, actionProfile, profile }: EditProfileScreenProps) => {
  const classes = useStyles()
  const {
    first_name,
    last_name,
    profile_picture,
    health_cares,
    populations_serve,
    country,
    phone,
    bio,
    expertises,
    area_of_focus,
    academic_histories,
    rate_and_services,
    medical_degree,
    office_phone,
    personal_phone,
    phone_area_code,
    office_area_code
  } = profile || {}

  const areaFocus = [...expertises, ...area_of_focus]
  const profileUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/profile_picture/directory/${encodeURIComponent(profile_picture)}`
  const noProfileUrl = '/images/user.png'

  return (
    <Grid container classes={{ root: classes.dialog }}>

      {/* profile picture */}
      <div className={ classes.dialogImage }>
        <div className={ classes.dialogImageCouch }>
          <img src={ profile_picture ? profileUrl : noProfileUrl } className={ classes.dialogImageProfile }/>
        </div>
      </div>

      {/* title and username */}
      <Grid container item direction="column">
        <Grid item>
        <Typography classes={{ root: classes.dialogDegree }}>{ medical_degree ? medical_degree : 'Dr.' }</Typography>
        </Grid>
        <Grid item>
          <Typography classes={{ root: classes.dialogUsername }}>{`${first_name} ${last_name}`}</Typography>
        </Grid>
      </Grid>

      {/* personal info */}
      <Grid container item spacing={2}>

        <Grid container item direction="column" xs={6} sm={5}>
          {/* health cares */}
          <Grid item classes={{ root: classes.dialogItem }}>
            <GradeIcon style={{ color: theme.palette.secondary.main }}/>
            <Typography>
              <strong>Planes de salud: </strong>
              {/* in case the field health_cares return empty will be show it the following text */}
              <span>{ Boolean(health_cares.length > 0) ? health_cares?.join(', ') : 'No soy proveedor de planes de salud' }</span>
            </Typography>
          </Grid>
          {/* target population */}
          <Grid item classes={{ root: classes.dialogItem }} className={ classes.dialogTargetPopulation }>
            <PersonIcon style={{ color: theme.palette.secondary.main }}/>
            <Typography>
              <strong>Población objetivo: </strong>
              <span>{Boolean(populations_serve.length > 0) ? populations_serve?.join(', ') : 'No hay registros' }</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid container item direction="column" xs={6} sm={3}>
          {/* available */}
          <Grid item classes={{ root: classes.dialogItem }}>
            <EventAvailableIcon style={{ color: theme.palette.secondary.main }}/>
            <Typography>
              <strong>Disponible </strong>
            </Typography>
          </Grid>
          {/* direction */}
          <Grid item classes={{ root: classes.dialogItem }}>
            <RoomIcon style={{ color: theme.palette.secondary.main }}/>
            <Typography >
              <strong>{country}</strong>
            </Typography>
          </Grid>
          {/* phone */}
          <Grid item classes={{ root: classes.dialogItem }}>
            <PhoneIcon style={{ color: theme.palette.secondary.main }}/>
            <Typography>
              <strong>{ Boolean(phone !== null) ? `${ phone.slice(0,5) }` : `${ office_phone.slice(0,5) }` }</strong>
              <span>{ Boolean(phone !== null) ? `${ phone.slice(6) }` : `${ office_phone.slice(6) }` }</span>
            </Typography>
          </Grid>
        </Grid>

        {actionProfile && (
          <Grid container item xs={12} sm={4} className={ classes.dialogItemMargin }>
            <Grid item classes={{ root: classes.dialogButton }}>
              <Button variant="contained" color="primary" disableElevation onClick={actionProfile}>Contactar</Button>
            </Grid>
          </Grid>
        )}

        {editProfile && (
          <Grid container item xs={12} sm={4} className={ classes.dialogItemMargin }>
            <Grid item classes={{ root: classes.dialogButton }}>
              <Button variant="contained" color="primary" disableElevation onClick={editProfile}>Editar Perfil</Button>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid container item className={ classes.dialogBorders}>
        {/* presentation */}
        <Grid item xs={12} sm={6} className={ `${classes.dialogContentLeft} ${classes.dialogItemMargin}` }>
          <Grid item>
            <Typography className={ classes.dialogTitle }>Presentación</Typography>
          </Grid>
          <Grid container item >
            {Boolean(bio) && (
              <Presentation presentation={bio} />
            )}
          </Grid>
        </Grid>
        {/* area focus */}
        <Grid container item xs={12} sm={6} className={ `${classes.dialogContentRight} ${classes.dialogItemMargin}` }>
          <Grid item>
            <Typography className={ classes.dialogTitle }>Áreas de enfoque</Typography>
          </Grid>
          <Grid container item >
            {Boolean(areaFocus?.length) && (
              <AreaFocus areaFocus={areaFocus} />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container item>
        {/* rate and services */}
        <Grid item xs={12} sm={6} className={ `${classes.dialogContentLeft} ${classes.dialogItemMargin}` }>
          <Grid item>
            <Typography className={ classes.dialogTitle }>Atenciones o servicios</Typography>
          </Grid>
          <Grid container item>
            {Boolean(rate_and_services?.length) && (
              <RateAndServices rateAndServices={rate_and_services} />
            )}
          </Grid>
        </Grid>
        {/* academic histories */}
        <Grid container item xs={12} sm={6} className={ `${classes.dialogContentRight} ${classes.dialogItemMargin}` }>
          <Grid item>
            <Typography className={ classes.dialogTitle }>Credenciales</Typography>
          </Grid>
          <Grid container item >
            {Boolean(academic_histories?.length) && (
              <AcademicHistory academicHistory={academic_histories} />
            )}
          </Grid>
        </Grid>
      </Grid>




      {/* <Grid className={classes.banner} />
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
      )} */}
    </Grid>
  )
}

export default ProfileView
