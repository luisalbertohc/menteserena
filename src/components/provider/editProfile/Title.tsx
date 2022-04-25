import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.grey[600],
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

interface TitleProps {
  label: string;
}

const Title = ({ label }: TitleProps) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="body2" color="primary">
      {label}
    </Typography>
  );
};

export default Title;
