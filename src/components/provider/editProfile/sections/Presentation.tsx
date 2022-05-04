import { makeStyles, Typography } from '@material-ui/core'
import { AccordionNew } from '@components/shared'

interface PresentationProps {
  presentation: string[]
}

const useStyles = makeStyles(theme => ({
  Bio: {
    lineHeight: 1.3
  }
}))

const Presentation = ({ presentation }: PresentationProps) => {

  const classes = useStyles()

  return (
    <AccordionNew
      collapsedSize={ 75 } // the height of the container when collapsed
      hideCollapsedBtn={ presentation.length <= 200 } // to show or hide the more/less button
    >
      <Typography className={ classes.Bio }>{ presentation }</Typography>
    </AccordionNew>
  )
}

export default Presentation
