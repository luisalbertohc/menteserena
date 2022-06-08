import { makeStyles, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { AccordionNew } from '@components/shared'

const useStyles = makeStyles(theme => ({
  academicContainer: {
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(2),
    borderRadius: 5,
    padding: theme.spacing(1),
    backgroundColor: '#F4F4F4'
  },
  academicItem: {
    width: 'auto',
    fontSize: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14
    }
  },
  academicDegree: {
    display: '-webkit-box',
    fontWeight: 600,
    maxWidth: 220,
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 250
    }
  },
  academicInstitution: {
    display: '-webkit-box',
    maxWidth: 220,
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 250
    }
  },
  academicYear: {
    color: '#666',
    fontSize: 14,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16
    }
  }
}))

interface AcademicHistoryProps {
  academicHistory: {
    degree: string
    institution: string
    year: number
  }[]
}

const AcademicHistory = ({ academicHistory }: AcademicHistoryProps) => {

  // returns the array in descending order
  const academicHistoryOrdered = academicHistory.sort(
    function(a, b) {
      return b.year - a.year
    }
  )
  const classes = useStyles()
  const smallSize = useMediaQuery('(min-width: 600px)') // verify that the width of the window is greater than 600px
  const heightForManyElements = smallSize ? 206 : 188
  const heightForFewElements = smallSize ? 132 : 120
  const heightForAnElement = smallSize ? 58 : 52

  return (
    <AccordionNew
      // set the height of the container when collapsed
      collapsedSize={
        academicHistoryOrdered.length >= 3
          ? heightForManyElements
          : academicHistoryOrdered.length > 1
            ? heightForFewElements
            : heightForAnElement
      }
      // to show or hide the more/less button
      hideCollapsedBtn={ academicHistoryOrdered.length <= 3 }
    >
      <Grid container item>
        {academicHistoryOrdered.map((academic, index) => {
          return (
            <Grid container item justifyContent="space-between" alignItems="center" className={ classes.academicContainer } key={ index }>

              <Grid container item direction="column" className={ classes.academicItem }>

                {/* degree */}
                <Grid item>
                  <Typography className={ classes.academicDegree }>{ academic.degree }</Typography>
                </Grid>

                {/* institution */}
                <Grid item>
                  <Typography className={ classes.academicInstitution }>{ academic.institution }</Typography>
                </Grid>

              </Grid>

              {/* year */}
              <Grid item>
                <Typography className={ classes.academicYear }>{ academic.year }</Typography>
              </Grid>

            </Grid>
          )
        })}
      </Grid>
    </AccordionNew>
  )
}

export default AcademicHistory
