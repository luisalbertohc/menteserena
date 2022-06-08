import { Grid, makeStyles, Typography } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import MissedVideoCallIcon from '@material-ui/icons/MissedVideoCall';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(2),
  },
  cardContainer: {
    width: '100%',
    borderTop: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB',
    padding: theme.spacing(2),
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

const NewsList = () => {
  const classes = useStyles();

  //This is for testing purpose
  const NEWS_LIST = [
    { user: 'Jane Cooper', imageSrc: 'Carla.png', description: 'Video llamada por 50 minutos', Icon: VideocamIcon },
    { user: 'Kathryn Murphy', imageSrc: 'Jane.png', description: 'Llamada por 50 minutos', Icon: PhoneIcon },
    { user: 'Arlene McCoy', imageSrc: 'Carla.png', description: 'Llamada perdida', Icon: PhoneMissedIcon },
    { user: 'Jacob Jones', imageSrc: 'Carlo.png', description: 'Video llamada perdida', Icon: MissedVideoCallIcon },
    { user: 'Kristine Watson', imageSrc: 'Jane.png', description: 'Video llamada por 50 minutos', Icon: VideocamIcon },
    { user: 'Eleanor Pena', imageSrc: 'Carla.png', description: 'Llamada por 50 minutos', Icon: PhoneIcon },
    { user: 'Ronald Richard', imageSrc: 'Carlo.png', description: 'Llamada por 50 minutos', Icon: PhoneIcon },
    { user: 'Roberto Ramos', imageSrc: 'Carlo.png', description: 'Llamada por 50 minutos', Icon: PhoneIcon },
    { user: 'Dervin Castro', imageSrc: 'Carlo.png', description: 'Llamada por 50 minutos', Icon: PhoneIcon },
  ];

  return (
    <Grid container>
      <Typography className={classes.title} color="primary">
        Inicio
      </Typography>
      {NEWS_LIST.map((notification, index) => {
        const { user, imageSrc, description, Icon } = notification;

        return (
          <Grid key={index} container>
            <Grid container justifyContent="space-between" className={classes.cardContainer}>
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
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NewsList;
