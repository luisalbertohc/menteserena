import { Grid, makeStyles, Typography, Tooltip } from '@material-ui/core'
import { format } from 'date-fns'
import { Panorama as ImageIcon, AttachFile as FileIcon, VideoCall as AcceptVideoCallIcon, Warning as WarningIcon, } from '@material-ui/icons'
import { NotificationBadge } from '@components/shared'
import classnames from 'classnames'
import { useCognito } from '@components/context/AuthContext'
import config from '@config'

const useStyles = makeStyles(theme => ({
  cardContainer: {
    width: '100%',
    borderBottom: '1px solid #E5E7EB',
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.grey[50],
    },
  },
  userInfo: {
    display: 'flex',
  },
  imageContainer: {
    position: 'relative',
    marginRight: theme.spacing(1),
    borderRadius: '50%',
    height: 40,
    width: 40,
    background: '#E5E7EB',
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    height: 40,
    width: 40,
    objectFit: 'cover'
  },
  userName: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: '24px',
    marginRight: theme.spacing(1),
  },
  description: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '24px',
    color: theme.palette.grey[900],
    width: 400,
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    '& > svg': {
      marginLeft: theme.spacing(1),
      fill: theme.palette.grey[600],
      height: 15,
      width: 15,
    },
    [theme.breakpoints.down('sm')]: {
      width: 210,
    },
  },
  date: {
    fontSize: 15,
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
  badge: {
    top: 0,
    left: 0,
  },
  iconDescription: {
    display: 'flex',
    alignItems: 'center',
  },
  restrictedIcon: {
    color: theme.palette.primary.main,
    width: 19,
  },
  tooltip: {
    fontSize: 13,
  },
}))

interface MessagePreviewCardProps {
  user: {
    profile_picture: string
    user_type: string
    name: string
    first_name: string
    last_name: string
  }
  chatData: {
    messages: {
      content: string
      date: string
      type?: string
    }[]
  }
  notificationAvailables: boolean
  isRestrictedChat?: boolean
  setChatMessage: () => void
}

const handlePreviewContent = message => {
  if (message?.type === 'file') {
    if (['jpeg', 'jpg', 'png'].includes(message?.file_type)) {
      return (
        <>
          Imagen <ImageIcon />
        </>
      )
    } else if (['pdf', 'doc', 'docx'].includes(message?.file_type)) {
      return (
        <>
          Archivo <FileIcon />
        </>
      )
    }
  } else if (message?.type === 'video_call') {
    return (
      <>
        Llamada <AcceptVideoCallIcon />
      </>
    )
  } else {
    return message?.content
  }
}

const ConversationPreviewCard = ({
  chatData,
  setChatMessage,
  user,
  notificationAvailables,
  isRestrictedChat,
}: MessagePreviewCardProps) => {
  const classes = useStyles()
  const { getAccessToken } = useCognito()
  const token = getAccessToken()
  const { messages } = chatData || {}
  const noProfileUrl = '/images/user.png'
  const profileUrl = user?.profile_picture
    ? `${ config.MENTE_SERENA_API_BASE_URL }/api/profile_picture/${ encodeURIComponent(user?.profile_picture) }?authorization=${ token }`
    : ''

  return (
    <Grid container justify="space-between" className={ classes.cardContainer } onClick={ setChatMessage }>
      <Grid className={ classes.userInfo } item>
        <Grid className={ classes.imageContainer }>
          <img src={ user.profile_picture ? profileUrl : noProfileUrl } className={ classes.image } />
          <NotificationBadge notificationAvailables={ notificationAvailables } className={ classes.badge } />
        </Grid>
        <Grid>
          <Grid container>
            <Typography className={ classes.userName }>
              { user.user_type === 'PROVIDER' ? user.name : user.first_name + ' ' + user.last_name }
            </Typography>
            {isRestrictedChat && (
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title="¡Este paciente potencial lo encontró a través del directorio de terapeutas! Para aceptarlo como paciente, proporcione su Código de terapeuta"
              >
                <WarningIcon className={ classes.restrictedIcon }/>
              </Tooltip>
            )}
          </Grid>
          <Typography className={ classnames(classes.description, {[classes.iconDescription]: ['file', 'video_call'].includes(messages[messages.length - 1]?.type) })}>
            { handlePreviewContent(messages[messages.length - 1]) }
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        {Boolean(messages?.length) && (
          <Typography className={ classes.date }>
            { format(new Date(messages[messages.length - 1]?.date), 'LL/d/yyyy') }
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default ConversationPreviewCard
