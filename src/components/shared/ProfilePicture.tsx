import { ChangeEvent, useState, useEffect } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import CloseIcon from '@material-ui/icons/Close';
import { useFormContext } from 'react-hook-form';
import classnames from 'classnames';

import config from '@config';
import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '21.09px',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  smallTitle: {
    '& > p': {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: '15px',
      color: theme.palette.grey[900],
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'start',
    },
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: '50%',
    border: `3px dashed ${theme.palette.primary.main}`,
    background: '#F3F4F6',
    marginBottom: theme.spacing(3),
    position: 'relative',
  },
  details: {
    color: theme.palette.grey[600],
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22.4px',
    marginBottom: theme.spacing(3),
  },
  smallDetails: {
    textAlign: 'center',
    '& > p': {
      fontSize: 14,
      fontWeight: 400,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'start',
    },
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: '50%',
    position: 'absolute',
    objectFit: 'cover',
  },
  uploadButton: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '19px',
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > svg': {
      fill: theme.palette.common.black,
      marginLeft: theme.spacing(1),
    },
  },
  removeButton: {
    position: 'absolute',
    background: '#FEE2E2',
    border: '2px solid #B91C1C',
    top: 0,
    right: 0,
    zIndex: 1,
    borderRadius: '50%',
    height: 32,
    width: 32,
    cursor: 'pointer',
    '& > svg': {
      fill: '#B91C1C',
    },
  },
  submitButton: {
    marginTop: theme.spacing(1.6),
  },
  imageContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: ' start',
    },
  },
}));

interface ProfilePictureProps {
  isProfileView?: boolean;
}

const ProfilePicture = ({ isProfileView }: ProfilePictureProps) => {
  const classes = useStyles();
  const { watch, setValue } = useFormContext();
  const profile_picture = watch('profile_picture');
  const { getAccessToken } = useCognito();
  const [objectUrl, setObjectUrl] = useState('');

  const token = getAccessToken();

  useEffect(() => {
    if (typeof profile_picture === 'object' && profile_picture?.[0]) {
      setObjectUrl(URL.createObjectURL(profile_picture[0]));
    } else if (typeof profile_picture === 'string') {
      const profileUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/profile_picture/${encodeURIComponent(
        profile_picture
      )}?authorization=${token}`;

      setObjectUrl(profileUrl);
    } else {
      setObjectUrl('');
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl('');
      }
    };
  }, [profile_picture]);

  return (
    <Grid item container direction="column" justify="center">
      <Grid
        item
        container
        justify="center"
        className={classnames({
          [classes.smallTitle]: isProfileView,
        })}
      >
        <Typography className={classes.title}>Foto de Perfil</Typography>
      </Grid>
      <Grid
        item
        container
        justify="center"
        className={classnames({
          [classes.imageContainer]: isProfileView,
        })}
      >
        <Grid container alignItems="center" justify="center" className={classes.circle}>
          {profile_picture && objectUrl ? (
            <>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.removeButton}
                onClick={() => {
                  setValue('profile_picture', '');
                }}
              >
                <CloseIcon />
              </Grid>
              <img id="frame" src={objectUrl || profile_picture} className={classes.profileImage} />
            </>
          ) : (
            <>
              <label htmlFor="icon-button-file">
                <Typography className={classes.uploadButton} color="primary">
                  Subir
                  <BackupIcon />
                </Typography>
              </label>
              <input
                accept=".jpg,.jpeg,.png"
                type="file"
                id="icon-button-file"
                style={{ display: 'none' }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setValue('profile_picture', event.target.files);
                }}
              />
            </>
          )}
        </Grid>
        <Grid
          container
          item
          justify="center"
          className={classnames({
            [classes.details]: true,
            [classes.smallDetails]: isProfileView,
          })}
        >
          <Typography>Sube tu foto de perfil aqui</Typography>
          <Typography>(Tamaño recomendado de al menos 200 x 200).</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePicture;