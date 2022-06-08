import { Grid, makeStyles } from '@material-ui/core'
import classnames from 'classnames'
import { useCognito } from '@components/context/AuthContext'
import config from '@config'

// Notas:
// - Depurar código
// - Evaluar optimización del componente

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
      position: 'unset'
    },
    '&.tiny': {
      position: 'unset',
      top: 'unset',
      border: 'none',
      width: 32,
      height: 32
    }
  },
  noPictureContainer: {
    position: 'absolute',
    top: -30,
    border: '4px solid #FFFFFF',
    borderRadius: '50%',
    height: 120,
    width: 120,
    '&.small': {
      position: 'unset',
      top: 'unset',
      border: 'none',
      width: 40,
      height: 40
    },
    '&.tiny': {
      position: 'unset',
      top: 'unset',
      border: 'none',
      width: 32,
      height: 32
    }
  },
  noPicture: {
    backgroundColor: '#E5E7EB'
  },
  noPictureImage: {
    position: 'absolute',
    borderRadius: '50%',
    width: 100,
    height: 100,
    objectFit: 'cover',
    '.small &': {
      position: 'unset',
      width: 35,
      height: 35
    },
    '.tiny &': {
      position: 'unset',
      border: 'none',
      width: 27,
      height: 27
    }
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
      position: 'unset',
      border: 'none',
      width: 40,
      height: 40
    },
    '.tiny &': {
      position: 'unset',
      border: 'none',
      width: 32,
      height: 32
    }
  }
}))

interface AvatarProps {
  avatarUrl: string
  isDirectory?: boolean
  small?: boolean
  tiny?: boolean
}

const Avatar = ({ avatarUrl, small, tiny, isDirectory }: AvatarProps) => {
  const classes = useStyles()
  const { getAccessToken } = useCognito()
  const token = getAccessToken()
  const baseUrl = `${ config.MENTE_SERENA_API_BASE_URL }/api/profile_picture`
  const noProfileUrl = '/images/user.png'
  const profileUrl = isDirectory
    ? `${ baseUrl }/directory/${ encodeURIComponent(avatarUrl) }`
    : `${ baseUrl }/${ encodeURIComponent(avatarUrl) }?authorization=${ token }`

  return (
    <Grid
      className={ classnames(classes.circle, { small, tiny }) }>
      {avatarUrl ? (
        <img src={ profileUrl || noProfileUrl } className={ classes.image } />
      ) : (
        <Grid
          className={ classnames(classes.noPictureContainer, { [classes.noPicture]: !Boolean(avatarUrl), small, tiny }) }
          container
          justifyContent="center"
          alignItems="center"
        >
          <img src={ noProfileUrl } className={ classes.noPictureImage } />
        </Grid>
      )}
    </Grid>
  )
}

export default Avatar
