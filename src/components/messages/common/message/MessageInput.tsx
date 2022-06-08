import { Grid, makeStyles, TextField, IconButton, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { ArrowForward as ArrowForwardIcon, AttachFile as AttachFileIcon } from '@material-ui/icons';
import { useMutation } from 'react-query';
import classnames from 'classnames';

import { useChannel } from '@components/context/SocketContext';
import { api } from '@api';
import config from '@config';
import ErrorDialog from '../ErrorDialog';
import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    padding: theme.spacing(1),
    borderTop: '1px solid #E5E7EB',
    '& > button': {
      marginLeft: theme.spacing(1),
    },
    '&.isVideoCallChat': {
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(7),
      },
    },
  },
  senderTextField: {
    marginRight: theme.spacing(2),
    '& > textarea': {
      overflowY: 'scroll !important',
      maxHeight: 300,
    },
    '& > input': {
      padding: theme.spacing(0, 1.75),
    },
    '&.MuiOutlinedInput-multiline': {
      padding: '10.5px 14px',
    },
  },

  limitErrorText: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
}));

interface MessageInputProps {
  senderId: number;
  receiverId: number;
  chatId: number;
  isVideoCallChat?: boolean;
}

const onSubmit = async ({ file, getSession, senderId, receiverId, chatId, isVideoCallChat }): Promise<void> => {
  const session = await getSession();

  const formData = new FormData();

  Object.entries({
    chat_id: chatId,
    attachment: file?.length ? file[0] : '',
    receiver_id: receiverId,
    sender_id: senderId,
    content: '',
  }).forEach(([key, value]) => formData.append(key, value));

  try {
    await api.post(`${config.MENTE_SERENA_API_BASE_URL}/api/chat_message/chat_message`, formData, {
      headers: {
        authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const messageLimitErrorContent =
  'Ha alcanzado el límite de mensajes que puede enviarle al proveedor sin ser un caso activo. Le exhortamos a que haga uso de la información contacto que le proveyeran para concretizar una cita.';

const MessageInput = ({ senderId, receiverId, chatId, isVideoCallChat }: MessageInputProps) => {
  const classes = useStyles();
  const { getSession } = useCognito();

  const [messageContent, setMessageContent] = useState('');
  const [messageLimitError, setMessageLimitError] = useState(false);
  const [fileSizeErrorMessage, setFileSizeErrorMessage] = useState(false);

  const { channel } = useChannel(`chat:${chatId}`);

  const verifyFileSize = file => {
    // Allow only 8mb file
    if (file?.size > 8000000) {
      setFileSizeErrorMessage(true);
      return true;
    }
    return false;
  };

  const { mutate, isLoading: isUploading, isError } = useMutation(onSubmit);

  const handleSubmitMessage = event => {
    if (event.key === 'Enter' || event.type === 'click') {
      channel
        .push('message', {
          chat_id: chatId,
          receiver_id: receiverId,
          sender_id: senderId,
          content: messageContent,
        })
        .receive('ok', () => setMessageContent(''))
        .receive('error', err => {
          if (err.type === 'RESTRICTED') {
            setMessageLimitError(err);
          } else {
            //This is for testing.
            console.log('err', err);
          }
        });
    }
  };

  return (
    <Grid
      container
      className={classnames(classes.inputContainer, {
        isVideoCallChat,
      })}
    >
      <Grid item xs={9} sm={10}>
        <TextField
          multiline
          error={isError || Boolean(messageLimitError)}
          value={messageContent}
          variant="outlined"
          placeholder="Ingresa tu mensaje aqui"
          fullWidth
          InputProps={{
            className: classes.senderTextField,
          }}
          onChange={e => setMessageContent(e.target.value)}
          onKeyPress={event => handleSubmitMessage(event)}
        />
      </Grid>
      <Grid item container alignItems="center" justifyContent="center" xs={3} sm={2}>
        <IconButton size="small" onClick={handleSubmitMessage} disabled={isUploading || !messageContent}>
          <ArrowForwardIcon />
        </IconButton>
        <IconButton size="small">
          <label htmlFor="attachment-button-file">
            {isUploading ? <CircularProgress size={15} /> : <AttachFileIcon />}
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            id="attachment-button-file"
            style={{ display: 'none' }}
            onChange={event => {
              const isFileNotValidSize = verifyFileSize(event.target.files[0]);
              if (isFileNotValidSize) {
                return null;
              }

              mutate({ file: event.target.files, getSession, senderId, receiverId, chatId } as any);
            }}
          />
        </IconButton>
      </Grid>

      {messageLimitError && (
        <ErrorDialog
          onClose={() => setMessageLimitError(false)}
          content={messageLimitErrorContent}
          onClick={() => setMessageLimitError(false)}
        />
      )}
      {fileSizeErrorMessage && (
        <ErrorDialog
          onClose={() => setFileSizeErrorMessage(false)}
          content=" Este archivo es demasiado grande. El tamaño de archivo máximo permitido es de 8 MB"
          onClick={() => setFileSizeErrorMessage(false)}
        />
      )}
    </Grid>
  );
};

export default MessageInput;
