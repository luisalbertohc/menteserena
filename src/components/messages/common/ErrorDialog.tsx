import { ReactNode } from 'react';
import { Grid, makeStyles, Typography, Dialog, DialogContent, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  errorText: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
}));

interface ErrorDialogProps {
  content: string | ReactNode;
  onClick: () => void;
  onClose: () => void;
}

const ErrorDialog = ({ content, onClick, onClose }: ErrorDialogProps) => {
  const classes = useStyles();

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <Grid container direction="column" alignItems="center">
          <Typography className={classes.errorText}>{content}</Typography>
          <Button variant="contained" color="primary" onClick={onClick}>
            OK
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
