import { useState } from 'react'

import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import classnames from 'classnames';

import { Button, Chip as ChipMaterial } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import SchoolIcon from '@material-ui/icons/School';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import { Chip } from '@components/shared';
import { useCognito } from '@components/context/AuthContext';
import config from '@config';
import { ViewColumnSharp } from '@material-ui/icons';
import theme from '@components/theme';
import { relative } from 'path/win32';
import { constructArrayFieldValidation } from '@components/utils';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    marginBottom: 24,
    borderRadius: 5,
    width: 585,
    height: 'auto',
    background: theme.palette.common.white,
    filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.2))',
    // prevents the content shows in two columns on desktop views
    [theme.breakpoints.up('md')]: {
      width: 610
    }
  },
  cardHeader: {
    position: 'relative',
    borderRadius: '5px 5px 0 0',
    padding: theme.spacing(2, 3),
    backgroundImage: 'linear-gradient(90deg, #57C4C4 0%, #F4DCB3 100%)',
    color: theme.palette.common.white,
    '& h3.MuiTypography-root': {
      maxWidth: 200,
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
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
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      right: 'unset',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  },
  cardContent: {
    padding: theme.spacing(2),
    // minHeight: 372,
    // maxHeight: 372,
    '& > .MuiGrid-root:nth-child(n + 2)': {
      paddingTop: theme.spacing(3)
    },
    '& > .MuiGrid-root:last-child': {
      paddingBottom: theme.spacing(3)
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
    '& svg': {
      marginRight: '10px'
    }
  },
  cardInfoDegree: {
    maxWidth: '200px',
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
    height: '26px',
    // backgroundColor: theme.palette.grey[200],
    backgroundColor: '#ECEEEC',
    color: theme.palette.grey[500],
    fontSize: '12px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& span:first-letter': {
      textTransform: 'capitalize'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '14px'
    }
  },
  cardBadgeIcon: {
    marginLeft: '10px',
    width: '16px',
    height: '16px'
  },
  cardButton: {
    textTransform: 'none'
  },
  // card: {
  //   cursor: 'pointer',
  //   height: 'auto',
  //   width: 585,
  //   background: theme.palette.common.white,
  //   padding: theme.spacing(2),
  //   border: '1px solid #D1D5DB',
  //   boxSizing: 'border-box',
  //   borderRadius: 4,
  //   marginBottom: theme.spacing(4),
  //   marginRight: theme.spacing(2),
  //   '&.isPortalCard': {
  //     marginRight: 'unset',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     marginRight: 'unset',
  //   },
  // },
  // clickable: {
  //   transition: 'background 250ms',
  //   '&:hover': {
  //     background: theme.palette.grey[50],
  //   },
  // },
  // section: {
  //   borderBottom: '1px solid #E5E7EB',
  // },
  // circle: {
  //   height: 88,
  //   width: 88,
  //   borderRadius: '50%',
  //   background: '#D1D5DB',
  //   marginRight: theme.spacing(1),
  //   position: 'relative',
  // },
  // image: {
  //   height: 88,
  //   width: 88,
  //   borderRadius: '50%',
  //   objectFit: 'cover',
  // },
  // name: {
  //   fontSize: 18,
  //   fontWeight: 700,
  //   lineHeight: '24px',
  //   color: theme.palette.grey[900],
  //   marginBottom: theme.spacing(1),
  // },
  // userInfo: {
  //   fontSize: 14,
  //   fontWeight: 400,
  //   lineHeight: '18px',
  //   color: theme.palette.grey[900],
  //   marginBottom: theme.spacing(2),
  //   display: 'flex',
  //   alignItems: 'center',
  //   '& > svg': {
  //     fill: theme.palette.grey[600],
  //     fontSize: 20,
  //     marginRight: theme.spacing(1),
  //   },
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: 400,
  //   lineHeight: '24px',
  //   color: theme.palette.grey[700],
  //   margin: theme.spacing(2, 0),
  // },
  // rateAndServiceContainer: {},
  // sessionType: {
  //   fontSize: 16,
  //   fontWeight: 700,
  //   lineHeight: '21px',
  //   color: theme.palette.grey[900],
  // },
  // cost: {
  //   width: 'auto',
  //   height: 30,
  //   background: '#D1FAE5',
  //   padding: theme.spacing(0.5),
  //   '& > p': {
  //     fontSize: 13,
  //     whiteSpace: 'nowrap',
  //     fontWeight: 400,
  //     lineHeight: '21px',
  //     color: '#047857',
  //   },
  // },
  // smallTextChip: {
  //   '&.isPortalCard': {
  //     marginRight: 9,
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 12,
  //   },
  // },
  // chipContainer: {
  //   marginBottom: 'unset',
  //   marginLeft: theme.spacing(2),
  //   '&.isPortalCard': {
  //     marginRight: 9,
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 12,
  //   },
  // },
  // labelChip: {
  //   display: 'block',
  //   height: '100%',
  //   maxWidth: 120,
  //   padding: 6,
  //   overflow: 'hidden',
  //   whiteSpace: 'nowrap',
  //   textOverflow: 'ellipsis',
  // },

}));

interface CardProps {
  provider: any;
  isPortalCard?: boolean;
  onClick: () => void;
}

const Card = ({ provider, isPortalCard, onClick }: CardProps) => {
  const classes = useStyles();

  // verify that the size is equal to media query
  const isMobileSize = useMediaQuery('(max-width: 770px)');

  // verify that the size is greater than 414px
  const smallSize = useMediaQuery('(min-width: 414px)')

  const {
    first_name,
    last_name,
    health_cares,
    academic_histories,
    profile_picture,
    area_of_focus,
    expertises,
    rate_and_services,

    // theoretical_approaches,
    // populations_serve,
  } = provider || {};
  console.log(provider)

  const avatarUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/profile_picture/directory/${encodeURIComponent(
    profile_picture
  )}`;
  
  const areaFocus = [...expertises, ...area_of_focus]

  // to look for the highest year
  function checkMaxYearAcademic() {
    let maxYear
    if (academic_histories.length > 1) {
      maxYear = academic_histories[0].year
      academic_histories.forEach(element => {
        if (element.year > maxYear) {
          maxYear = element.year
        }
      })
    } else {
      maxYear = academic_histories[0].year
    }
    return maxYear
  }

  // to search for the academic institution
  const academicInstitution = () => {
    let year = checkMaxYearAcademic()
    let institution
    academic_histories.forEach(element => {
      checkYear: if (element.year === year) {
        institution = element.institution
        break checkYear
      }
    })
    return institution
  }

  // to search for the academic degree
  const academicDegree = () => {
    let year = checkMaxYearAcademic()
    let degree
    academic_histories.forEach(element => {
      checkYear: if (element.year === year) {
        degree = element.degree
        break checkYear
      }
    })
    return degree
  }

  return (
    <Grid
      container
      zeroMinWidth
      className={classes.card}
      // className={classnames({
      //   [classes.card]: true,
      //   [classes.clickable]: Boolean(onClick),
      //   isPortalCard,
      // })}
    >
      <Grid container item className={classes.cardHeader}>
        <Grid item>
          <Typography component="h3">
            {`${first_name} ${last_name}`}
          </Typography>
        </Grid>
        <img src={profile_picture ? avatarUrl : ''} className={ classes.cardImage } />
      </Grid>

      <Grid container item spacing={2} className={ classes.cardContent }>
        <Grid container item spacing={2} className={ classes.cardInfo }>
          <Grid item style={{ marginRight: smallSize ? 'unset' : 'auto' }}>
            <div className={ classes.cardBadge }>
              <span>Planes de salud</span>
              {Boolean(health_cares.length > 0)
                ? <DoneIcon className={ classes.cardBadgeIcon } style={{ color: theme.palette.secondary.main }}/>
                : <CloseIcon className={ classes.cardBadgeIcon } style={{ color: '#A3A3A3' }}/>
              }
            </div>
          </Grid>
          <Grid container item direction="column" spacing={1}  style={{ width: smallSize ? 'auto' : 'inherit' }}>
            <Grid className={ classes.cardInfoItem } item>
              <SchoolIcon style={{ color: theme.palette.secondary.main }}/>
              <span className={ classes.cardInfoDegree }>
                <strong>{academic_histories.length > 0 ? academicDegree() : ''}</strong>
                {academic_histories.length > 0 ? academicInstitution() : ''}
              </span>
            </Grid>
            {/* {Boolean(academic_histories.length > 0)
              ? <Grid className={ classes.cardInfoItem } item>
                  <SchoolIcon style={{ color: theme.palette.secondary.main }}/>
                  <span className={ classes.cardInfoDegree }>
                    <strong>{academic_histories.length > 0 ? academicDegree() : ''}</strong>
                    {academic_histories.length > 0 ? academicInstitution() : ''}
                  </span>
                </Grid>
              : <Grid className={ classes.cardInfoItem } item>
                  <SchoolIcon style={{ color: '#A3A3A3' }}/>
                  <span></span>
                </Grid>
            } */}
            {/* {Boolean(available.length > 0)
              ? <Grid className={ classes.cardInfoItem } item>
                  <SchoolIcon style={{ color: theme.palette.secondary.main }}/>
                  <span>Disponible</span>
                </Grid>
              : <Grid className={ classes.cardInfoItem } item>
                  <SchoolIcon style={{ color: theme.palette.grey[500] }}/>
                  <span>Disponible</span>
                </Grid>
            } */}
            <Grid className={ classes.cardInfoItem } item>
              <EventAvailableIcon style={{ color: theme.palette.secondary.main }}/>
              <span>Disponible</span>
            </Grid>
          </Grid>
        </Grid>

        {Boolean(areaFocus.length > 0) && (
        <Grid container item spacing={2}>
          <Grid item>
            <Typography>
              <strong>Áreas de enfoque</strong>
            </Typography>
          </Grid>
          <Grid container item spacing={2}>
            {Boolean(areaFocus?.length > 5)
              ? areaFocus?.map((area, i) => {
                if (i === 6) {
                  return (
                    <Grid item key={i}>
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
        
        <Grid
          container
          item
          spacing={2}
          style={{ justifyContent: smallSize ? "space-between" : "unset", color: theme.palette.grey[500] }}
          wrap={ smallSize ? "nowrap" : "wrap" }
        >
          {Boolean(rate_and_services?.length > 0) && (
          <Grid 
            container
            item
            spacing={2}
            style={{
              justifyContent: smallSize ? "unset" : "space-between",
              alignItems: smallSize ? "center" : "unset",
              width: smallSize ? "auto" : "inherit"
            }}
          >
            <Grid item><span>{rate_and_services[0].session_type}</span></Grid>
            <Grid item><span>${rate_and_services[0].cost} USD</span></Grid>
          </Grid>
          )}
          <Grid item style={{ margin: smallSize ? "initial" : "auto" }}>
            <Button variant="contained" color="primary" classes={{ root: classes.cardButton }} disableElevation onClick={onClick}>Ver perfil</Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container wrap="nowrap" className={classes.section}>
        <Grid className={classes.circle}>
          <img src={profile_picture ? avatarUrl : ''} className={classes.image} />
        </Grid>
        <Grid>
          <Grid className={classes.name}>
            {first_name} {last_name}
          </Grid>
          <Grid container wrap="nowrap">
            {theoretical_approaches?.slice(0, isMobileSize ? 1 : 3)?.map((approach, idx) => {
              return (
                <Chip
                  key={idx}
                  label={approach}
                  className={classnames(classes.labelChip, {
                    [classes.smallTextChip]: true,
                    isPortalCard,
                  })}
                />
              );
            })}
            {(theoretical_approaches?.length > 3 || (isMobileSize && theoretical_approaches?.length > 1)) && (
              <Chip
                label={`${theoretical_approaches.slice(isMobileSize ? 1 : 3).length} +`}
                className={classnames({
                  [classes.smallTextChip]: true,
                  isPortalCard,
                })}
              />
            )}
          </Grid>
          {Boolean(populations_serve.length) && (
            <Typography className={classes.userInfo}>
              <PermIdentityIcon />
              {populations_serve?.join(', ')}
            </Typography>
          )}
        </Grid>
      </Grid>
      {Boolean(specialties?.length) && (
        <Grid container className={classes.section}>
          <Typography className={classes.title}>Especialidad</Typography>
          <Grid container>
            {specialties?.slice(0, isMobileSize ? 1 : 2)?.map((specialty, idx) => {
              return (
                <Chip
                  key={idx}
                  label={specialty}
                  className={classnames({
                    [classes.smallTextChip]: true,
                    isPortalCard,
                  })}
                />
              );
            })}
            {(specialties?.length > 2 || (isMobileSize && specialties?.length > 1)) && (
              <Chip
                label={`${specialties.slice(isMobileSize ? 1 : 2).length} +`}
                className={classnames({
                  [classes.smallTextChip]: true,
                  isPortalCard,
                })}
              />
            )}
          </Grid>
        </Grid>
      )}
      {Boolean(rate_and_services?.length) && (
        <Grid container>
          <Grid container alignItems="center">
            <Typography className={classes.title}>Honorarios</Typography>
            {rate_and_services?.length && (
              <Chip
                label={`${rate_and_services.slice(1).length} +`}
                className={classnames({
                  [classes.chipContainer]: true,
                  isPortalCard,
                })}
              />
            )}
          </Grid>
          {rate_and_services
            ?.map((service, idx) => {
              return (
                <Grid
                  key={idx}
                  container
                  justify="space-between"
                  alignItems="center"
                  className={classes.rateAndServiceContainer}
                >
                  <Typography className={classes.sessionType}>{service.session_type}</Typography>
                  <Grid container className={classes.cost}>
                    <Grid component={Typography} container alignItems="center" justify="center">
                      $ {service.cost} USD
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
            .slice(0, 1)}
        </Grid>
      )} */}
    </Grid>
  );
};

export default Card;
