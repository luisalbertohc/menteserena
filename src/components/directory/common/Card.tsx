import { Grid, makeStyles, Typography, useMediaQuery, Button } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import SchoolIcon from '@material-ui/icons/School'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import config from '@config'
import theme from '@components/theme'

// Notas:
// - Evaluar optimización de los componentes
// - Quedan variables por definiar o incorporar (available)
// - Existen condicionales por redefinir (a la espera de la incorporación de algunas variables)

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    marginBottom: 24,
    borderRadius: 5,
    width: '100%',
    height: 'auto',
    background: theme.palette.common.white,
    filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.2))',
    // prevents the content shows in two columns on desktop views
    [theme.breakpoints.up('sm')]: {
      maxWidth: 574
    }
  },
  cardHeader: {
    position: 'relative',
    borderRadius: '5px 5px 0 0',
    padding: '13px 0',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: 47,
    backgroundImage: 'linear-gradient(90deg, #57C4C4 0%, #F4DCB3 100%)',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      height: 55,
      padding: theme.spacing(2, 3)
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center'
    },
    '& h3.MuiTypography-root': {
      maxWidth: 175,
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 200,
        fontSize: 20
      }
    }
  },
  cardImage: {
    position: 'absolute',
    top: '50%',
    right: 24,
    height: 96,
    width: 96,
    border: '5px solid #fff',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      right: 'unset',
      left: '50%',
      transform: 'translateX(-50%)',
      height: 88,
      width: 88
    }
  },
  cardContent: {
    padding: theme.spacing(2),
    '& > .MuiGrid-root:nth-child(n + 2)': {
      paddingTop: theme.spacing(3)
    },
    '& > .MuiGrid-root:last-child': {
      paddingBottom: theme.spacing(3)
    },
    '& .cardAreaFocus': {
      paddingBottom: 0
    }
  },
  cardInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between'
    }
  },
  cardInfoItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14
    },
    '& svg': {
      marginRight: '10px'
    }
  },
  cardInfoDegree: {
    maxWidth: '190px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& strong': {
      paddingRight: '5px'
    }
  },
  cardBadge: {
    borderRadius: '16px',
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    height: 22,
    backgroundColor: '#ECEEEC',
    color: theme.palette.grey[500],
    fontSize: 12,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& span:first-letter': {
      textTransform: 'capitalize'
    },
    [theme.breakpoints.up('md')]: {
      height: 24,
      fontSize: 14
    }
  },
  cardBadgeIcon: {
    marginLeft: '10px',
    width: '16px',
    height: '16px'
  },
  cardButton: {
    marginTop: 16,
    height: 35,
    width: 128,
    fontSize: 16,
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      marginTop: 'inherit'
    }
  },
  cardRateServicesWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'unset',
    color: theme.palette.grey[500],
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
      justifyContent: 'space-between'
    }
  },
  cardRateServicesContainer: {
    justifyContent: 'space-between',
    alignItems: 'unset',
    width: 'inherit',
    lineHeight: 1,
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'unset',
      alignItems: 'center',
      width: 'auto'
    }
  }
}))

interface CardProps {
  provider: any
  onClick: () => void
}

const Card = ({ provider, onClick }: CardProps) => {
  const {
    available,
    first_name,
    last_name,
    health_cares,
    academic_histories,
    profile_picture,
    area_of_focus,
    expertises,
    rate_and_services
  } = provider || {}
  const classes = useStyles()
  const profileUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/profile_picture/directory/${encodeURIComponent(profile_picture)}`
  const noProfileUrl = '/images/user.png'
  const smallSize = useMediaQuery('(min-width: 600px)') // verify that the size is greater than 600px
  const areaFocus = [...expertises, ...area_of_focus]

  // returns the array in descending order
  const academicHistoryOrdered = academic_histories?.sort(
    function(a, b) {
      return b.year - a.year
    }
  )

  return (
    <Grid container zeroMinWidth className={ classes.card }>

      <Grid container item className={ classes.cardHeader }>
        <Grid item>
          <Typography component="h3">
            { `${ first_name } ${ last_name }` }
          </Typography>
        </Grid>
        <img src={ profile_picture ? profileUrl : noProfileUrl } className={ classes.cardImage }/>
      </Grid>

      <Grid container item spacing={ 2 } className={ classes.cardContent }>
        <Grid container item spacing={ 2 } className={ classes.cardInfo }>

          {/* health cares */}
          <Grid item style={{ marginRight: smallSize ? 'unset' : 'auto' }}>
            <div className={ classes.cardBadge }>
              <span>Planes de salud</span>
              {Boolean(health_cares.length > 0 && health_cares[0] !== 'No soy proveedor de planes de salud' && health_cares[0] !== 'no soy proveedor de planes de salud.' && health_cares[0] !== 'no soy proveedor de planes de salud')
                ? <DoneIcon className={ classes.cardBadgeIcon } style={{ color: theme.palette.secondary.main }}/>
                : <CloseIcon className={ classes.cardBadgeIcon } style={{ color: '#A3A3A3' }}/>
              }
            </div>
          </Grid>

          {/* academic record */}
          <Grid container item direction="column" spacing={ 1 }  style={{ width: smallSize ? 'auto' : 'inherit' }}>
            <Grid className={ classes.cardInfoItem } item>
              <SchoolIcon style={{ color: theme.palette.secondary.main }}/>
              <span className={ classes.cardInfoDegree }>
                <strong>{academic_histories.length > 0 ? academicHistoryOrdered[0].degree : ''}</strong>
                {academic_histories.length > 0 ? academicHistoryOrdered[0].institution : ''}
              </span>
            </Grid>
            <Grid className={ classes.cardInfoItem } item>
              <EventAvailableIcon style={{ color: !available ? theme.palette.secondary.main : '#A3A3A3' }}/>
              <span>{ !available ? 'Disponible' : 'No disponible' }</span>
            </Grid>
          </Grid>
        </Grid>
        
        {/* area of focus */}
        {Boolean(areaFocus.length > 0) && (
        <Grid container item spacing={ 2 }>
          <Grid item>
            <Typography style={{ fontSize: 14 }}>
              <strong>Áreas de enfoque</strong>
            </Typography>
          </Grid>
          <Grid container item spacing={1} className={ 'cardAreaFocus' }>
            {Boolean(areaFocus?.length > 5)
              ? areaFocus?.map((area, i) => {
                if (i === 6) {
                  return (
                    <Grid item key={ i }>
                      <div className={classes.cardBadge}>
                        <span>...</span>
                      </div>
                    </Grid>
                  )
                } else {
                  if (i < 6) {
                    return (
                      <Grid item key={i}>
                        <div className={classes.cardBadge}>
                          <span>{area}</span>
                        </div>
                      </Grid>
                    )
                  }
                }
              })
              : areaFocus?.map((area, i) => {
                return (
                  <Grid item key={i}>
                    <div className={classes.cardBadge}>
                      <span>{area}</span>
                    </div>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
        )}
        
        {/* rate and services */}
        <Grid container item className={ classes.cardRateServicesWrapper }>
          {Boolean(rate_and_services?.length > 0) && (
            <Grid container item className={ classes.cardRateServicesContainer }>
              <Grid item><span>{ rate_and_services[0].session_type }</span></Grid>
              <Grid item><span style={{ paddingLeft: smallSize ? 16 : "unset" }}>${ rate_and_services[0].cost } USD</span></Grid>
            </Grid>
          )}
          <Grid item style={{ margin: smallSize ? "initial" : "auto" }}>
            <Button variant="contained" color="primary" classes={{ root: classes.cardButton }} disableElevation onClick={ onClick }>Ver perfil</Button>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Card
