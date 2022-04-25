import { useEffect } from 'react';
import { Grid, makeStyles, Typography, Container } from '@material-ui/core';

import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
  },
}));

const UnauthorizedUser = () => {
  const classes = useStyles();

  const { signOut } = useCognito();

  useEffect(() => {
    const timer = setTimeout(() => {
      signOut();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container justify="center" alignItems="center">
      <Container maxWidth="sm">
        <Typography variant="h6">
          Ha sido inactivado por nuestro administrador por haber incumplido con los términos de servicios. Si entiende
          esto ha sido un error, puede enviarnos un mensaje a{' '}
          <a href="mailto:menteserenapr@gmail.com" className={classes.link}>
            menteserenapr@gmail.com
          </a>
          .
        </Typography>
      </Container>
    </Grid>
  );
};

export default UnauthorizedUser;
