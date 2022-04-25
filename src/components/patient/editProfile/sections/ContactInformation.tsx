import { Grid, Typography, makeStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: '24px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(1),
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: 400,
    color: theme.palette.grey[900],
    '& > svg': {
      marginRight: theme.spacing(1),
      width: 18,
      height: 18,
    },
  },
}));

interface ContactInformationProps {
  patient: any;
}

const ContactInformation = ({ patient }) => {
  const classes = useStyles();
  const { contact_phone, contact_first_name, contact_last_name } = patient;

  return (
    <Grid container>
      <Grid container direction="column">
        <Typography className={classes.name}>
          {contact_first_name} {contact_last_name}
        </Typography>
        <Typography className={classes.phone}>
          <PhoneIcon />
          {contact_phone}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactInformation;
