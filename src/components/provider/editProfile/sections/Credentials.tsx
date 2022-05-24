import { makeStyles, Grid, Typography } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';

import { Accordion } from '@components/shared';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  square: {
    height: 40,
    width: 40,
    background: '#D0D6D9',
    borderRadius: 4,
    marginRight: theme.spacing(1.5),
    '& > svg': {
      fill: theme.palette.primary.main,
    },
  },
  card: {
    marginBottom: theme.spacing(3),
  },
  credencial: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '18px',
    color: theme.palette.grey[900],
  },
  university: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '18px',
    color: theme.palette.grey[600],
  },
}));

interface CredentialsProps {
  academicHistory: {
    degree: string;
    institution: string;
  }[];
}

const Credentials = ({ academicHistory }: CredentialsProps) => {
  const classes = useStyles();

  return (
    <Accordion collapsedHeight={academicHistory.length >= 3 ? 185 : 61} hideCollapsedBtn={academicHistory.length <= 3}>
      <Grid className={classes.container}>
        {academicHistory.map((academic, idx) => {
          return (
            <Grid container alignItems="center" className={classes.card} key={idx}>
              <Grid container alignItems="center" justify="center" className={classes.square}>
                <SchoolIcon />
              </Grid>
              <Grid>
                <Typography className={classes.credencial}>{academic.degree}</Typography>
                <Typography className={classes.university}>{academic.institution}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Accordion>
  );
};

export default Credentials;
