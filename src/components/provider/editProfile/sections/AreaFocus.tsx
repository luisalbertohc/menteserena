import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core'
import { AccordionNew } from '@components/shared'

interface AreaFocusProps {
  areaFocus: string[]
}

const useStyles = makeStyles(theme => ({
  List: {
    marginLeft: 8,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  ListItem: {
    position: 'relative',
    display: 'list-item',
    padding: 0,
    paddingLeft: 12,
    width: '47%',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 7,
      left: 0,
      borderRadius: '50%',
      height: 3,
      width: 3,
      backgroundColor: '#000'
    }
  },
  ListItemText: {
    margin: 0,
    '& span': {
      lineHeight: 1.3,
    },
    '&:first-letter': {
      textTransform: 'capitalize'
    }
  }
}))

const AreaFocus = ({ areaFocus }: AreaFocusProps) => {

  const classes = useStyles()

  return (
    <AccordionNew
      collapsedSize={ 75 } // the height of the container when collapsed
      hideCollapsedBtn={ areaFocus.length <= 4 } // to show or hide the more/less button
    >
      <List dense={true} classes={{ root: classes.List }}>
        {areaFocus.map((area, index) => {
          return (
            <ListItem classes={{ root: classes.ListItem }} disableGutters={ true }>
              <ListItemText
                key={ index }
                primary={ area }
                classes={{ root: classes.ListItemText }}
              />
            </ListItem>
          )
        })}
      </List>
    </AccordionNew>
  )
}

export default AreaFocus
