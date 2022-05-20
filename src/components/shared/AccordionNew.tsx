import { useState, ReactNode } from 'react'
import { Typography, makeStyles, Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const useStyles = makeStyles(theme => ({
  collapseWrapper: {
    width: '100%'
  },
  collapseButton: {
    display: 'flex',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: theme.spacing(1),
    '& > svg': {
      height: 20,
      width: 20,
      marginRight: theme.spacing(1),
    },
  },
}));

interface AccordionProps {
  children: ReactNode
  collapsedSize: number
  hideCollapsedBtn?: boolean
}

const AccordionNew = ({
  children,
  collapsedSize, // set height of the container when collapsed
  hideCollapsedBtn, // indicates if the button should be displayed or not
}: AccordionProps) => {

  const classes = useStyles()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      <Collapse in={ isCollapsed } collapsedHeight={ collapsedSize } className={ classes.collapseWrapper }>
        { children }
      </Collapse>
      <Typography
        color="primary"
        className={ classes.collapseButton }
        onClick={() => {
          setIsCollapsed(!isCollapsed)
        }}
      >
        {/* to swap the button elements */}
        {!hideCollapsedBtn && (isCollapsed
          ? (
            <>
              <ExpandLessIcon />
              Ver menos
            </>
          ) : (
            <>
              <ExpandMoreIcon />
              Ver más
            </>
          )
        )}
      </Typography>
    </>
  );
};

export default AccordionNew 
