import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 20,
    lineHeight: '23.44px',
    fontWeight: 500,
    marginBottom: 24,
  },
}));

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="body2" color="primary">
      {label}
    </Typography>
  );
};

export default Header;
