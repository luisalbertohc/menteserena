import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    width: '100%',
    borderTop: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB',
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
  userInfo: {
    display: 'flex',
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    position: 'relative',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    position: 'absolute',
  },
  userName: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: '24px',
  },
  description: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '24px',
    color: theme.palette.grey[900],
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginRight: theme.spacing(1),
      fill: theme.palette.grey[600],
      height: 15,
      width: 15,
    },
  },
  date: {
    fontSize: 15,
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
}));

interface MessagePreviewCardProps {
  messageData: {
    user: string;
    imageSrc: string;
    description: string;
    Icon: any;
  };
  setIsOpenMessage: (params: any) => void;
}

const MessagePreviewCard = ({ messageData, setIsOpenMessage }: MessagePreviewCardProps) => {
  const classes = useStyles();

  const { user, imageSrc, description, Icon } = messageData;
  return (
    <Grid
      container
      justify="space-between"
      className={classes.cardContainer}
      onClick={() => setIsOpenMessage(messageData)}
    >
      <Grid className={classes.userInfo} item>
        <Grid className={classes.imageContainer}>
          <img src={`/images/homescreen/${imageSrc}`} alt="mente-serena" className={classes.image} />
        </Grid>
        <Grid>
          <Typography className={classes.userName}>{user}</Typography>
          <Typography className={classes.description}>
            <Icon />
            {description}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.date}>06/24/21</Typography>
      </Grid>
    </Grid>
  );
};

export default MessagePreviewCard;
