import { Grid, makeStyles } from '@material-ui/core';
import { AddPhotoAlternate as AddPhotoAlternateIcon } from '@material-ui/icons/';
import classnames from 'classnames';

import { useCognito } from '@components/context/AuthContext';
import config from '@config';

const useStyles = makeStyles(theme => ({
  circle: {
    width: 120,
    height: 100,
    borderRadius: '50%',
    position: 'relative',
    background: theme.palette.common.white,
    '&.small': {
      width: 40,
      height: 40,
      top: 'unset',
      position: 'unset',
    },
  },
  noPictureContainer: {
    height: 120,
    width: 120,
    top: -30,
    position: 'absolute',
    borderRadius: '50%',
    '&.small': {
      width: 40,
      height: 40,
      top: 'unset',
      position: 'unset',
    },
  },
  noPicture: {
    background: theme.palette.grey[200],
  },
  image: {
    height: 120,
    width: 120,
    top: -30,
    borderRadius: '50%',
    position: 'absolute',
    border: '4px solid #FFFFFF',
    objectFit: 'cover',
    '.small &': {
      width: 40,
      height: 40,
      position: 'unset',
    },
  },
}));

interface AvatarProps {
  avatarUrl: string;
  isDirectory?: boolean;
  small?: boolean;
}

// Avatar for Profile Photos
const Avatar = ({ avatarUrl, small, isDirectory }: AvatarProps) => {
  const classes = useStyles();
  const { getAccessToken } = useCognito();
  const token = getAccessToken();

  const baseUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/profile_picture`;

  const profileUrl = isDirectory
    ? `${baseUrl}/directory/${encodeURIComponent(avatarUrl)}`
    : `${baseUrl}/${encodeURIComponent(avatarUrl)}?authorization=${token}`;

  return (
    <Grid
      className={classnames(classes.circle, {
        small,
      })}
    >
      {avatarUrl ? (
        <img src={profileUrl || ''} className={classes.image} />
      ) : (
        <Grid
          className={classnames(classes.noPictureContainer, {
            [classes.noPicture]: !Boolean(avatarUrl),
            small,
          })}
          container
          justify="center"
          alignItems="center"
        >
          <AddPhotoAlternateIcon color="disabled" fontSize={small ? 'small' : 'large'} />
        </Grid>
      )}
    </Grid>
  );
};

export default Avatar;
