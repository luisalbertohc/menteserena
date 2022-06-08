import { Grid, makeStyles, Typography, Container, Hidden, Drawer, MenuItem } from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountTree as AccountTreeIcon,
  ExitToApp as ExitToAppIcon,
  AssignmentInd as AdminIcon,
} from '@material-ui/icons';
import { useRouter } from 'next/router';

import { useState } from 'react';

import AdminPortalButton from '@shared/AdminPortalButton';
import { useSignOut } from '@api';

const useStyles = makeStyles(theme => ({
  navBar: {
    height: 58,
    width: '100%',
    background: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05), 0px 8px 8px rgba(0, 0, 0, 0.1)',
    padding: '0px 100px',
    position: 'sticky',
    top: 0,
    left: 0,
    // This will prevent that page content shows below navbar
    zIndex: 1299,
    [theme.breakpoints.down('sm')]: {
      padding: '0px 27px',
    },
  },
  contentContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    '& > img': {
      height: 32,
    },
  },
  logout: {
    cursor: 'pointer',
    color: theme.palette.common.black,
    marginRight: theme.spacing(2),
  },
  drawer: {
    '& .MuiPaper-root': {
      top: 50,
      width: 300,
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
}));

const NavBar = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const isProviderPortal = router.pathname === '/portal/provider';
  const isAdminPortal = router.pathname === '/admin';
  const { mutate: signOut } = useSignOut();

  return (
    <Grid alignItems="center" container className={classes.navBar}>
      <Container maxWidth="lg">
      
        <Grid container alignItems="center" justifyContent="space-between" className={classes.container}>
          <Hidden smDown>
            <img src="/images/mente_serena_logo.svg" alt="mente-serena" />
          </Hidden>
          <Hidden mdUp>
            <img src="/images/mente_serena_single_logo.svg" alt="mente-serena" />
          </Hidden>
          <Hidden smDown>
            <Grid container item justifyContent="flex-end" alignItems="center">
              <Typography onClick={signOut} className={classes.logout}>
                Cerrar sesión
              </Typography>
              {(isProviderPortal || isAdminPortal) && <AdminPortalButton />}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <MenuIcon onClick={() => setIsOpen(!isOpen)} />
            <Drawer className={classes.drawer} open={isOpen}>
              <MenuItem
                onClick={() => {
                  (signOut as any)();
                  setIsOpen(false);
                }}
              >
                <ExitToAppIcon />
                Cerrar sesión
              </MenuItem>
              <MenuItem onClick={() => setIsOpen(false)}>
                <AccountTreeIcon />
                Directorio
              </MenuItem>
              <MenuItem>
                <AdminIcon />
                {(isProviderPortal || isAdminPortal) && <AdminPortalButton />}
              </MenuItem>
            </Drawer>
          </Hidden>
        </Grid>
      </Container>
    </Grid>
  );
};

export default NavBar;
