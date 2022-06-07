import { useEffect, useState } from 'react'
import { CircularProgress, Grid, makeStyles, IconButton, Typography, Dialog, DialogContent } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon, Videocam as VideocamIcon, Warning as WarningIcon, Close as CloseIcon } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import AgoraRTC from 'agora-rtc-sdk-ng'
import { useUser, useGetTokenCall } from '@api'
import { useAgora } from '@components/hooks'
import { useChannel } from '@components/context/SocketContext'
import Avatar from '@components/profile/Avatar'
import { FullScreenVideo } from '@components/video'
import { Loading } from '@components/shared'
import { setConversationState, setInitialChat, setChatStatus, setClearReducer } from '@store/reducers/chat'
import MessageBox from './message/MessageBox'
import MessageInput from './message/MessageInput'
import InitialPromptChat from './InitialPromptChat'
import RestrictedChatInfoDialog from './RestrictedChatInfoDialog'
import { useCognito } from '@components/context/AuthContext'
import { useIdleTimer } from '@components/context/IdleTimerContext'
import SelectMembersVideoCall from './SelectMembersVideoCall'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    flex: 1
  },
  headerContainer: {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px 0px 16px 20px',
    '& > svg': {
      marginRight: theme.spacing(2),
      fill: theme.palette.primary.main,
      cursor: 'pointer'
    }
  },
  userInfoContainer: {
    cursor: 'pointer'
  },
  userName: {
    fontSize: 15,
    fontWeight: 700,
    color: theme.palette.grey[900],
    lineHeight: '24px',
    marginLeft: theme.spacing(1)
  },
  restrictedIcon: {
    position: 'relative',
    '& > div.counter': {
      position: 'absolute',
      fontSize: '1rem'
    }
  },
  dialogWrapper: {
    '& .MuiDialog-paper': {
      margin: 0,
      [theme.breakpoints.up('sm')]: {
        margin: 32
      }
    }
  },
  dialogContent: {
    position: 'relative',
    padding: `0px !important`,
    // height: 600,
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
      // maxWidth: 770,
      maxHeight: 800
    }
  },
  closeBtn: {
    zIndex: 150,
    position: 'absolute',
    top: 10,
    right: 24,
    color: '#A3A3A3',
    '& .MuiSvgIcon-root': {
      width: 16,
      height: 16
    }
  }
}))

interface ConversationProps {
  messageData: {
    chat_id: number
    status: string
  }
  user: {
    profile_picture: string
    user_type: string
    name: string
    first_name: string
    last_name: string
    user_id: number
    id: number
  }
  receiverId: number
  senderId: number
  setChatMessage: () => void
  userClickHandler?: () => void
  setIsVideoCallInProcess?: (params: boolean) => void
}

const agoraClient = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' })

interface MessageProps {
  chat: {
    messages: {
      content: string
      date: Date
      sender_id: number
      type: string
      file_type: string
      attachment: string
    }[]
    status: string
    remaining_messages_for_patient: number
  }
}

const Conversation = ({ messageData, setChatMessage, userClickHandler, user, receiverId, senderId, setIsVideoCallInProcess }: ConversationProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { getSession } = useCognito()
  const { pauseIdle } = useIdleTimer()
  const { data: myUser } = useUser({ refetchOnWindowFocus: false })
  const { mutate, isLoading } = useGetTokenCall()
  const { chat_id } = messageData
  const { channel, removeChannel } = useChannel(`chat:${chat_id}`)
  const messages = useSelector((state: MessageProps) => state?.chat?.messages)
  const remaining_messages_for_patient = useSelector((state: MessageProps) => state?.chat?.remaining_messages_for_patient)
  const chat_status = useSelector((state: MessageProps) => state?.chat?.status)
  const [openRestrictedInfoDialog, setOpenRestrictedInfoDialog] = useState(false)
  const agoraProps = useAgora(agoraClient)
  const { isJoined, join } = agoraProps
  const isProvider = myUser?.user?.user_type === 'PROVIDER'
  const isRestrictedChat = chat_status === 'restricted_contact'
  const [configVideoCall, setConfigVideoCall] = useState<Boolean>(false)
  const settingVideoCall = () => { setConfigVideoCall(true) }
  const startVideoCalling = () => {
    mutate({ getSession, join, channelName: String(chat_id), uid: myUser.user.id, channel, isProvider })
    setIsVideoCallInProcess(true)
    pauseIdle()
  }

  useEffect(() => {
    if (channel?.state === 'closed') {
      channel?.join().receive('ok', res => dispatch(setInitialChat(res)))

      channel?.on('message', data => {
        dispatch(setConversationState(data))
      })

      channel?.on('chat_status', data => {
        dispatch(setChatStatus(data))
      })
    }
    return () => {
      channel?.leave()
      removeChannel?.()
    }
  }, [channel])

  useEffect(() => {
    return () => {
      dispatch(setClearReducer(null))
    }
  }, [])

  if (!messages) {
    return <Loading />
  }

  return (
    <>
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        <Grid className={classes.headerContainer}>
          <ArrowBackIcon onClick={setChatMessage} />
          <Grid container alignItems="center" onClick={userClickHandler} className={classes.userInfoContainer}>
            <Avatar avatarUrl={user.profile_picture} small />
            <Typography color="primary" className={classes.userName}>
              {user.user_type === 'PROVIDER' ? user.name : user.first_name + ' ' + user.last_name}
            </Typography>
          </Grid>
          {isProvider && (
            // <IconButton
            //   disabled={isLoading}
            //   onClick={() => {
            //     mutate({ getSession, join, channelName: String(chat_id), uid: myUser.user.id, channel, isProvider })
            //     setIsVideoCallInProcess(true)
            //     pauseIdle()
            //   }}
            // >
            //   {isLoading ? <CircularProgress size={15} /> : <VideocamIcon />}
            // </IconButton>
            <IconButton onClick={ settingVideoCall }>
              <VideocamIcon />
            </IconButton>
          )}
          {isProvider && isRestrictedChat && (
            <IconButton className={classes.restrictedIcon} onClick={() => setOpenRestrictedInfoDialog(true)}>
              <div className="counter">{remaining_messages_for_patient}</div>
              <WarningIcon />
            </IconButton>
          )}
        </Grid>
        <Grid container item xs={12} direction="column">
          <MessageBox chatId={chat_id} providerId={senderId} joinVideoCall={join} />
          <MessageInput chatId={chat_id} senderId={senderId} receiverId={receiverId} />
        </Grid>
      </Grid>

      {openRestrictedInfoDialog && <RestrictedChatInfoDialog onClose={() => setOpenRestrictedInfoDialog(false)} />}

      {isProvider && isRestrictedChat && <InitialPromptChat chatId={chat_id} />}

      {isJoined && (
        <FullScreenVideo
          {...agoraProps}
          chatId={chat_id}
          senderId={senderId}
          receiverId={receiverId}
          isProvider={isProvider}
          setIsVideoCallInProcess={setIsVideoCallInProcess}
        />
      )}

      {configVideoCall && (
        <Dialog className={ classes.dialogWrapper } maxWidth="md" open onClose={ () => setConfigVideoCall(false) }>
          <DialogContent className={ classes.dialogContent }>
            <IconButton className={classes.closeBtn} size="small" onClick={() => setConfigVideoCall(false)}>
              <CloseIcon />
            </IconButton>
            <SelectMembersVideoCall user={ user } startVideoCalling={ startVideoCalling } showValue={ false }/>
          </DialogContent>
        </Dialog>
      )}

    </>
  )
}

export default Conversation
