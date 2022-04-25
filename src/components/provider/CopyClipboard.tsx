import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classnames from 'classnames';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    textDecoration: 'underline',
    '& > img': {
      marginLeft: theme.spacing(1),
      cursor: 'pointer',
    },
  },
  copyText: {
    marginTop: theme.spacing(2),
    visibility: 'hidden',
    '&.isCopied': {
      visibility: ' visible',
    },
  },
}));

interface CopyClipboardProps {
  providerCode: string | '';
}

const CopyClipboard = ({ providerCode }: CopyClipboardProps) => {
  const classes = useStyles();

  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      <Typography color="primary" className={classes.link}>
        {providerCode}
        <CopyToClipboard text={providerCode} onCopy={onCopyText}>
          <img src="/images/homescreen/copyClipboard.png" alt="mente-serena" />
        </CopyToClipboard>
      </Typography>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classnames(classes.copyText, {
          isCopied,
        })}
      >
        <Typography color="primary">Copiado</Typography>
        <CheckIcon color="primary" />
      </Grid>
    </>
  );
};

export default CopyClipboard;
