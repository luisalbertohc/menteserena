import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { VideoCall as AcceptVideoCallIcon } from '@material-ui/icons';

import { useUser, useGetTokenCall } from '@api';
import { Loading } from '@components/shared';
import { useCognito } from '@components/context/AuthContext';
import { useChannel } from '@components/context/SocketContext';
import { useIdleTimer } from '@components/context/IdleTimerContext';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 5,
    margin: theme.spacing(0, 5),
    padding: theme.spacing(3),
  },
  answerCallButton: {
    background: '#4caf50',
    color: 'white',
    textTransform: 'capitalize',
    width: 150,
    marginTop: theme.spacing(1),
  },
}));

const IncomingVideoCallCard = ({ isVideoScreen, joinVideoCall, chatId, isProvider }) => {
  const { data: myUser } = useUser({ refetchOnWindowFocus: false });
  const { getSession } = useCognito();
  const { pauseIdle } = useIdleTimer();
  const { channel } = useChannel(`chat:${chatId}`);
  const { mutate, isLoading } = useGetTokenCall();

  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" className={classes.cardContainer}>
      <Typography variant="body1">Unirte a la llamada con el proveedor.</Typography>
      <Button
        variant="contained"
        className={classes.answerCallButton}
        disabled={isVideoScreen}
        onClick={() => {
          mutate({
            getSession,
            join: joinVideoCall,
            channelName: String(chatId),
            uid: myUser.user.id,
            channel,
            isProvider,
          });
          pauseIdle();
        }}
      >
        <AcceptVideoCallIcon />
        Unirte
        {isLoading && <Loading size={20} />}
      </Button>
    </Grid>
  );
};

export default IncomingVideoCallCard;
