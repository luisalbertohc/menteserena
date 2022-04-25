import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '21.6px',
    color: theme.palette.grey[600],
    marginBottom: 24,
  },
}));

const SubHeader = ({ children }) => {
  const classes = useStyles();

  return <Typography className={classes.subTitle}>{children}</Typography>;
};

export default SubHeader;
