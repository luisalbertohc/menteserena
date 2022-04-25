import { Dispatch, SetStateAction } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { CloudDownload as CloudDownloadIcon } from '@material-ui/icons';

import config from '@config';
import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    maxWidth: 300,
    maxHeight: 300,
    cursor: 'pointer',
  },
  fileLink: {
    color: theme.palette.common.white,
    display: 'flex',
    '& > svg': {
      marginLeft: theme.spacing(1),
    },
  },
}));

interface BubbleContentProps {
  content: string;
  messageType: string;
  attachment: string;
  file_type: string;
  setSelectedImage: Dispatch<SetStateAction<string>>;
  messageId: number;
}

const BubbleContent = ({
  content,
  attachment,
  messageType,
  file_type,
  setSelectedImage,
  messageId,
}: BubbleContentProps) => {
  const classes = useStyles();

  const { getAccessToken } = useCognito();
  const token = getAccessToken();

  if (messageType === 'file') {
    const attachmentUrl = `${config.MENTE_SERENA_API_BASE_URL}/api/chat_message/${messageId}/attachment?authorization=${token}`;

    if (['jpeg', 'jpg', 'png'].includes(file_type)) {
      if (!token) {
        return <CircularProgress size={20} />;
      }

      return (
        <img
          className={classes.imageContainer}
          src={attachmentUrl}
          alt="Mente-Serena"
          onClick={() => {
            setSelectedImage(attachmentUrl);
          }}
        />
      );
    }

    if (['pdf', 'doc', 'docx'].includes(file_type)) {
      return (
        <a className={classes.fileLink} href={attachmentUrl}>
          Descargar archivo <CloudDownloadIcon />
        </a>
      );
    }
  }
  return <>{content}</>;
};

export default BubbleContent;
