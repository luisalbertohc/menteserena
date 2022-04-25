import { Grid, Tabs, Tab, makeStyles } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import { useRouter } from 'next/router';

import { NotificationBadge } from '.';

import {
  Home as HomeIcon,
  PermIdentity as PermIdentityIcon,
  AccountTree as AccountTreeIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'sticky',
    left: 0,
    bottom: 0,
    background: theme.palette.common.white,
    boxShadow: ' 0px -2px 4px rgba(0, 0, 0, 0.15)',
    //This will prevent that page content shows below navbar
    zIndex: 1,
  },
  indicator: {
    top: 0,
  },
  tab: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '12px',
    textTransform: 'capitalize',
    minWidth: '50px !important',
  },
  homeIconContainer: {
    display: 'flex',
    position: 'relative',
  },
  badge: {
    top: 0,
    left: -5,
  },
}));

interface MobileNavbarProps {
  menuOption?: number;
  notificationAvailables: boolean;
  setMenuOption?: (params: number) => void;
}

const MobileNavbar = ({ setMenuOption, menuOption, notificationAvailables }: MobileNavbarProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuOption(newValue);
  };

  const router = useRouter();
  const isProvider = router.pathname.includes('/portal/provider');

  return (
    <Grid className={classes.root}>
      <Tabs
        value={menuOption}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        centered
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab
          className={classes.tab}
          icon={
            <div className={classes.homeIconContainer}>
              <HomeIcon />
              <NotificationBadge notificationAvailables={notificationAvailables} className={classes.badge} />
            </div>
          }
          label="Inicio"
        />
        <Tab className={classes.tab} icon={<PersonIcon />} label="Perfil" />
        <Tab className={classes.tab} icon={<AccountTreeIcon />} label="Directorio" />
        {!isProvider && <Tab className={classes.tab} icon={<PersonAddIcon />} label="Añadir" />}
        {isProvider && <Tab className={classes.tab} icon={<ShareIcon />} label="Link" />}
      </Tabs>
    </Grid>
  );
};

export default MobileNavbar;
