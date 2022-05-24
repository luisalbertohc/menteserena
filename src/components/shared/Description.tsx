import { Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import classnames from 'classnames';

import { Accordion } from '@components/shared';

const useStyles = makeStyles(theme => ({
  text: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.grey[600],
    lineHeight: '21px',
  },
  previewText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
}));

interface DescriptionProps {
  content: string;
}

const Description = ({ content }: DescriptionProps) => {
  const classes = useStyles();
  const [isFullHeight, setIsFullHeight] = useState(false);

  return (
    <Accordion collapsedHeight={60} setIsFullHeight={setIsFullHeight} isDescriptionSection>
      <Typography
        className={classnames({
          [classes.text]: true,
          [classes.previewText]: !isFullHeight,
        })}
      >
        {content}
      </Typography>
    </Accordion>
  );
};

export default Description;
