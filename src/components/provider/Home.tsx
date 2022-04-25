import { useState, useEffect } from 'react';
import { Grid, makeStyles, Hidden } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Center from './column/Center';
import SideMenu from './column/SideMenu';
import { MobileNavbar } from '@components/shared';
import Profile from './Profile';
import Directory from '@components/directory/portal';
import { useProviderProfile } from '@api';
import { Loading } from '@components/shared';
import { Provider } from '@types';
import ShareProviderCode from './ShareProviderCode';
import { useChannel } from '@components/context/SocketContext';
import { setInitialChatHistory, setChatHistory } from '@store/reducers/chatHistory';
import { RootState } from '@store/index';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& > div': {
      background: theme.palette.common.white,
      '&.left, &.right': {
        width: 300,
      },
      '&.right': {
        marginLeft: theme.spacing(5),
      },
      '&.left': {
        marginRight: theme.spacing(5),
      },
      '&.center': {
        maxWidth: 595,
        flex: '1 1 auto',
      },
    },
  },
}));

const SelectedOptionContent = ({ menuOption, provider }: { menuOption: number; provider: Provider }) => {
  switch (menuOption) {
    case 0:
      return <Center provider={provider} />;
    case 1:
      return <Profile provider={provider} />;
    case 2:
      return <Directory />;
    case 3:
      return <ShareProviderCode provider={provider} />;
    default:
      return null;
  }
};

const HomeScreen = () => {
  const classes = useStyles();
  const [menuOption, setMenuOption] = useState(0);
  const { data: provider, isLoading } = useProviderProfile();
  const chatList = useSelector((state: RootState) => state?.chatHistory?.chatHistory);
  const dispatch = useDispatch();

  const { channel, removeChannel } = useChannel('connected:user');

  useEffect(() => {
    if (channel?.state === 'closed') {
      channel?.join().receive('ok', res => dispatch(setInitialChatHistory(res)));
      channel?.on('chat_update', data => {
        dispatch(setChatHistory(data));
      });
    }
    return () => {
      channel?.leave();
      removeChannel?.();
    };
  }, [channel]);

  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <Grid container wrap="nowrap" justify={'flex-start'} className={classes.container}>
      <Hidden mdDown>
        <SideMenu
          className="left"
          setMenuOption={setMenuOption}
          menuOption={menuOption}
          provider={provider}
          notificationAvailables={chatList.some(
            chat => chat.unread_messages[chat.users.find(user => user.user_type === 'PROVIDER').id] > 0
          )}
        />
      </Hidden>

      <SelectedOptionContent menuOption={menuOption} provider={provider as Provider} />

      <Hidden lgUp>
        <MobileNavbar
          setMenuOption={setMenuOption}
          menuOption={menuOption}
          notificationAvailables={chatList.some(
            chat => chat.unread_messages[chat.users.find(user => user.user_type === 'PROVIDER').id] > 0
          )}
        />
      </Hidden>
    </Grid>
  );
};

export default HomeScreen;
