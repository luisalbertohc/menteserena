import { Typography, makeStyles, Collapse } from '@material-ui/core';
import { useState, ReactNode, Dispatch, SetStateAction } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles(theme => ({
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
  children: ReactNode;
  collapsedHeight: number;
  setIsFullHeight?: Dispatch<SetStateAction<boolean>>;
  isDescriptionSection?: boolean;
  hideCollapsedBtn?: boolean;
}

const Accordion = ({
  children,
  collapsedHeight,
  setIsFullHeight,
  isDescriptionSection,
  hideCollapsedBtn,
}: AccordionProps) => {
  const classes = useStyles();

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Collapse in={isCollapsed} collapsedHeight={collapsedHeight}>
        {children}
      </Collapse>
      <Typography
        color="primary"
        className={classes.collapseButton}
        onClick={() => {
          setIsCollapsed(!isCollapsed);
          if (isDescriptionSection) {
            setIsFullHeight(!isCollapsed);
          }
        }}
      >
        {!hideCollapsedBtn &&
          (isCollapsed ? (
            <>
              <ExpandLessIcon />
              Ver Menos
            </>
          ) : (
            <>
              <ExpandMoreIcon />
              Ver Mas
            </>
          ))}
      </Typography>
    </>
  );
};

export default Accordion;
