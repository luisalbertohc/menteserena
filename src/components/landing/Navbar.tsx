import { Container, Grid, makeStyles, Typography, Drawer, Hidden, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import Link from 'next/link';
import { Loading } from '@components/shared';
import { useRouter } from 'next/router';

import { useCognito } from '@components/context/AuthContext';
import { useSignOut } from '@api';

const useStyles = makeStyles(theme => ({
  navBar: {
    height: 58,
    width: '100%',
    padding: '0px 100px',
    position: 'sticky',
    top: 0,
    left: 0,
    background: 'white',
    alignItems: 'center',
    // This will prevent that page content shows below navbar
    zIndex: 99999,
    [theme.breakpoints.down('sm')]: {
      padding: '0px 27px',
    },
  },
  container: {
    flexWrap: 'nowrap',
    '& > img': {
      height: 32,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > img': {
        order: 2,
      },
    },
  },
  link: {
    marginRight: theme.spacing(4),
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    color: theme.palette.grey[900],
    cursor: 'pointer',
    textDecoration: 'none',
    '&.login': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
  drawer: {
    '& .MuiPaper-root': {
      top: 50,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { isAuthenticated, isLoading } = useCognito();

  const { mutate: signOut } = useSignOut();

  return (
    <Grid container className={classes.navBar}>
      <Container>
        <Grid container className={classes.container}>
          <Hidden smDown>
            <Link href="/">
              <img src="/images/mente_serena_logo.svg" alt="mente-serena" />
            </Link>
          </Hidden>
          <Hidden mdUp>
            <Link href="/">
              <img src="/images/mente_serena_single_logo.svg" alt="mente-serena" />
            </Link>
          </Hidden>
          <Hidden smDown>
            <Grid container alignItems="center">
              <Grid container justify="flex-end">
                <Link href="/#feature" passHref>
                  <a className={classes.link}>Funcionalidades</a>
                </Link>
                <Link href="/#about" passHref>
                  <a className={classes.link}>¿Qué Hacemos?</a>
                </Link>
                <Link href="/#directory" passHref>
                  <a className={classes.link}>Directorio de Profesionales</a>
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link href="/portal" passHref>
                      <a className={classes.link}>Mi portal</a>
                    </Link>
                    <Typography onClick={signOut} className={classes.link}>
                      Cerrar Sesión
                    </Typography>
                  </>
                ) : isLoading ? (
                  <Typography className={classes.link}>
                    <Loading size={20} />
                  </Typography>
                ) : (
                  <Typography onClick={() => router.push('/auth/login')} className={`${classes.link} login`}>
                    Iniciar Sesión
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <MenuIcon onClick={() => setIsOpen(!isOpen)} />
            <Drawer className={classes.drawer} open={isOpen}>
              <MenuItem onClick={() => setIsOpen(false)}>
                <Link href="/#feature" passHref>
                  <a className={classes.link}>Funcionalidades</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => setIsOpen(false)}>
                <Link href="/#about" passHref>
                  <a className={classes.link}>¿Qué Hacemos?</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => setIsOpen(false)}>
                <Link href="/#directory" passHref>
                  <a className={classes.link}>Directorio de Profesionales</a>
                </Link>
              </MenuItem>

              {isAuthenticated ? (
                <>
                  <MenuItem>
                    <Link href="/portal" passHref>
                      <a className={classes.link}>Mi portal</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={signOut} className={classes.link}>
                    Cerrar Sesión
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/auth/login');
                  }}
                  className={classes.link}
                >
                  Iniciar Sesión
                </MenuItem>
              )}
            </Drawer>
          </Hidden>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Navbar;
