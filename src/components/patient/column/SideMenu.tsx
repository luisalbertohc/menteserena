import { Tabs, Tab, Grid, makeStyles, Divider } from '@material-ui/core';
import { Home as HomeIcon, PermIdentity as PermIdentityIcon, AccountTree as AccountTreeIcon } from '@material-ui/icons';

import ProviderCodeInput from '../ProviderCodeInput';
import { NotificationBadge } from '@components/shared';

const useStyles = makeStyles(theme => ({
  indicator: {
    left: 0,
  },
  tab: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'start',
      textTransform: 'capitalize',
    },
  },
  icon: {
    marginRight: theme.spacing(1.75),
  },
  codeContainer: {
    padding: theme.spacing(6, 3),
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

interface SideMenuProps {
  className: string;
  menuOption: number;
  notificationAvailables: boolean;
  setMenuOption: (params: number) => void;
  openMessageTab: () => void;
}

const SideMenu = ({ className, setMenuOption, menuOption, openMessageTab, notificationAvailables }: SideMenuProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuOption(newValue);
  };

  return (
    <Grid item className={className}>
      <Tabs
        orientation="vertical"
        value={menuOption}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab
          className={classes.tab}
          icon={
            <div className={classes.homeIconContainer}>
              <HomeIcon className={classes.icon} />
              <NotificationBadge notificationAvailables={notificationAvailables} className={classes.badge} />
            </div>
          }
          label="Inicio"
        />
        <Tab className={classes.tab} icon={<PermIdentityIcon className={classes.icon} />} label="Perfil" />
        <Tab className={classes.tab} icon={<AccountTreeIcon className={classes.icon} />} label="Directorio" />
      </Tabs>
      <Divider />
      <ProviderCodeInput className={classes.codeContainer} openMessageTab={openMessageTab} />
    </Grid>
  );
};

export default SideMenu;
