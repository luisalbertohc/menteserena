import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  userType: {
    textTransform: 'lowercase',
    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },
}));

interface UserTypeTextProps {
  text: string;
}

const UserTypeText = ({ text }: UserTypeTextProps) => {
  const classes = useStyles();

  return (
    <Typography variant="body2" className={classes.userType}>
      {text}
    </Typography>
  );
};

export default UserTypeText;
