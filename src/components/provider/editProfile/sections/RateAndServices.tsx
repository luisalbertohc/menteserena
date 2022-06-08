import { makeStyles, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { AccordionNew } from '@components/shared'

const useStyles = makeStyles(theme => ({
  serviceContainer: {
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(2),
    borderRadius: 5,
    padding: theme.spacing(1),
    backgroundColor: '#F4F4F4'
  },
  serviceItem: {
    width: 'auto',
    fontSize: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14
    }
  },
  serviceName: {
    display: '-webkit-box',
    fontWeight: 600,
    maxWidth: 190,
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 210
    }
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16
    }
  }
}))

interface RateAndServiceProps {
  rateAndServices: {
    session_type: string
    cost: number
    session_length: number
  }[]
}

const RateAndService = ({ rateAndServices }: RateAndServiceProps) => {
  
  const classes = useStyles()
  const smallSize = useMediaQuery('(min-width: 600px)') // verify that the width of the window is greater than 600px
  const heightForManyElements = smallSize ? 204 : 188
  const heightForFewElements = smallSize ? 132 : 120
  const heightForAnElement = smallSize ? 58 : 52

  return (
    <AccordionNew
      // the height of the container when collapsed
      collapsedSize={
        rateAndServices.length >= 3
          ? heightForManyElements
          : rateAndServices.length > 1
            ? heightForFewElements
            : heightForAnElement
      }
      hideCollapsedBtn={ rateAndServices.length <= 3 } // to show or hide the more/less button
    >
      <Grid container item>
        {rateAndServices.map((service, index) => {
          return (
            <Grid container item justifyContent="space-between" alignItems="center" className={ classes.serviceContainer } key={ index }>

              <Grid container item direction="column" className={ classes.serviceItem }>

                {/* session type */}
                <Grid item>
                  <Typography className={ classes.serviceName }>{ service.session_type }</Typography>
                </Grid>

                {/* session length */}
                <Grid item>
                  <Typography>{ service.session_length } min</Typography>
                </Grid>

              </Grid>

              {/* cost */}
              <Grid item>
                <Typography className={ classes.servicePrice }>$ { service.cost } USD</Typography>
              </Grid>

            </Grid>
          )
        })}
      </Grid>
    </AccordionNew>
  )
}

export default RateAndService
