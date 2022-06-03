import { Grid, makeStyles, Button, Typography, useMediaQuery } from '@material-ui/core'
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
// - Evaluar optimización del componente

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
    top: 40,
    right: 24,
    [theme.breakpoints.up('sm')]: {
      top: 'unset',
      bottom: 65,
      right: '50%',
      transform: 'translateX(50%)'
    }
  },
  dialogImageCouch: {
    position: 'relative',
    width: 128,
    height: 100,
    backgroundImage: 'url(/images/sillon.svg)',
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
    // marginBottom: 30,    
    marginBottom: 60,    
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
  dialogItemProfile: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0
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
  }
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

  const smallSize = useMediaQuery('(min-width: 600px)') // verify that the size is greater than 600px
  const areaFocus = [...expertises, ...area_of_focus]
  const profileUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/profile_picture/directory/${encodeURIComponent(profile_picture)}`
  const noProfileUrl = '/images/user.png'

  return (
    <Grid container classes={{ root: classes.dialog }}>

      {/* profile picture */}
      {Boolean(!smallSize) && (
        <div className={ classes.dialogImage }>
          <div className={ classes.dialogImageCouch }>
            <img src={ profile_picture ? profileUrl : noProfileUrl } className={ classes.dialogImageProfile }/>
          </div>  
        </div>
      )}

      {/* title and username */}
      <Grid container item direction="column">
        <Grid item>
        <Typography classes={{ root: classes.dialogDegree }}>{ medical_degree ? medical_degree : '' }</Typography>
        </Grid>
        <Grid item>
          <Typography classes={{ root: classes.dialogUsername }}>{`${first_name} ${last_name}`}</Typography>
        </Grid>
      </Grid>

      {/* personal info */}
      <Grid container item spacing={ 2 }>

        <Grid container item direction="column" xs={ 6 } sm={ 5 }>

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
              <strong>Poblaciones de interés: </strong>
              <span>{Boolean(populations_serve.length > 0) ? populations_serve?.join(', ') : '' }</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid container item direction="column" xs={ 6 } sm={ 3 }>

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
              <strong>{ Boolean(office_phone) ? `${ office_phone.slice(0,5) } ` : `${ phone.slice(0,5) } ` }</strong>
              <span>{ Boolean(office_phone) ? `${ office_phone.slice(6) }` : `${ phone.slice(6) }` }</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid container item direction="column" xs={ 12 } sm={ 4 } className={ classes.dialogItemProfile  }>

          {/* profile picture */}
          {Boolean(smallSize) && (
            <div className={ classes.dialogImage }>
              <div className={ classes.dialogImageCouch }>
                <img src={ profile_picture ? profileUrl : noProfileUrl } className={ classes.dialogImageProfile }/>
              </div>  
            </div>
          )}

          {/* action button */}
          {actionProfile && (
            <Grid item classes={{ root: classes.dialogButton }}>
              <Button variant="contained" color="primary" disableElevation onClick={ actionProfile }>Contactar</Button>
            </Grid>
          )}

          {/* edit button */}
          {editProfile && (
            <Grid item classes={{ root: classes.dialogButton }}>
              <Button variant="contained" color="primary" disableElevation onClick={ editProfile }>Editar Perfil</Button>
            </Grid>
          )}

        </Grid>
      </Grid>

      <Grid container item className={ classes.dialogBorders}>

        {/* presentation */}
        <Grid item xs={ 12 } sm={ 6 } className={ `${ classes.dialogContentLeft } ${ classes.dialogItemMargin }` }>
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
            <Typography className={ classes.dialogTitle }>Servicios</Typography>
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
    </Grid>
  )
}

export default ProfileView
