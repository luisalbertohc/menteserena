import { Grid, makeStyles } from '@material-ui/core'
import { AddPhotoAlternate as AddPhotoAlternateIcon } from '@material-ui/icons/'
import classnames from 'classnames'
import { useCognito } from '@components/context/AuthContext'
import config from '@config'

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
    position: 'absolute',
    top: -30,
    border: '4px solid #FFFFFF',
    borderRadius: '50%',
    height: 120,
    width: 120,
    backgroundColor: '#E5E7EB',
    // filter: 'drop-shadow(-3px 3px 3px #00000050)',
    '&.small': {
      width: 40,
      height: 40,
      top: 'unset',
      position: 'unset',
    },
  },
  // noPicture: {
  //   backgroundColor: '#E5E7EB'
  // },
  noPictureImage: {
    position: 'absolute',
    // top: -8,
    // left: '50%',
    // transform: 'translateX(-50%)',
    borderRadius: '50%',
    width: 100,
    height: 100,
    objectFit: 'cover',
    '.small &': {
      width: 40,
      height: 40,
      position: 'unset',
    },
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
}))

interface AvatarProps {
  avatarUrl: string
  isDirectory?: boolean
  small?: boolean
}

const Avatar = ({ avatarUrl, small, isDirectory }: AvatarProps) => {
  const classes = useStyles()
  const { getAccessToken } = useCognito()
  const token = getAccessToken()
  const baseUrl = `${ config.MENTE_SERENA_API_BASE_URL }/api/profile_picture`
  const profileUrl = isDirectory
    ? `${ baseUrl }/directory/${ encodeURIComponent(avatarUrl) }`
    : `${ baseUrl }/${ encodeURIComponent(avatarUrl) }?authorization=${ token }`
  const noProfileUrl = '/images/user.png'

  return (
    <Grid
      className={ classnames(classes.circle, { small }) }>
      {avatarUrl ? (
        <img src={ profileUrl || noProfileUrl } className={ classes.image } />
      ) : (
        <Grid
          className={ classnames(classes.noPictureContainer, { [classes.noPicture]: !Boolean(avatarUrl), small }) }
          container
          justify="center"
          alignItems="center"
        >
          <img src={ noProfileUrl } className={ classes.noPictureImage } />
          {/* <AddPhotoAlternateIcon color="disabled" fontSize={ small ? 'small' : 'large' }/> */}
        </Grid>
      )}
    </Grid>
  )
}

export default Avatar
