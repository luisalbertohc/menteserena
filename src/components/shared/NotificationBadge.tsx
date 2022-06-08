import { Grid, makeStyles } from '@material-ui/core';

import { Notifications as NotificationIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  notificationBadge: {
    height: 15,
    width: 15,
    background: theme.palette.error.main,
    borderRadius: '50%',
    position: 'absolute',
    '& > svg': {
      fill: 'white',
      fontSize: 10,
    },
  },
}));

interface NotificationBadgeProps {
  notificationAvailables: boolean;
  className: string;
}

const NotificationBadge = ({ notificationAvailables, className }: NotificationBadgeProps) => {
  const classes = useStyles();

  return notificationAvailables ? (
    <Grid container justifyContent="center" alignItems="center" className={`${classes.notificationBadge} ${className}`}>
      <NotificationIcon />
    </Grid>
  ) : null;
};

export default NotificationBadge;
