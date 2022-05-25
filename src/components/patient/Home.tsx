import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Grid, makeStyles, Hidden } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Center from './column/Center';
import SideMenu from './column/SideMenu';
import { MobileNavbar } from '@components/shared';
import Profile from './Profile';
import Directory from '@components/directory/portal';
import AddProvider from './AddProvider';
import { useChannel, useSocket } from '@components/context/SocketContext';
import { setInitialChatHistory, setChatHistory } from '@store/reducers/chatHistory';
import { Loading } from '@components/shared';
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
      '&.left, &.right': {
        width: 300,
        background: theme.palette.common.white,
        height: '100%',
      },
      '&.right': {
        marginLeft: theme.spacing(5),
        padding: theme.spacing(2, 1),
      },
      '&.left': {
        marginRight: theme.spacing(5),
      },
      '&.center': {
        maxWidth: 595,
        flex: '1 1 auto',
        background: theme.palette.common.white,
      },
    },
  },
}));

const SelectedOptionContent = ({
  menuOption,
  setMenuOption,
}: {
  menuOption: number;
  setMenuOption: Dispatch<SetStateAction<number>>;
}) => {
  switch (menuOption) {
    case 0:
      return <Center openDirectoryTab={() => setMenuOption(2)} />;
    case 1:
      return <Profile />;
    case 2:
      return <Directory openMessages={() => setMenuOption(0)} />;
    case 3:
      return <AddProvider openMessageTab={() => setMenuOption(0)} />;
    default:
      return null;
  }
};

const HomeScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [menuOption, setMenuOption] = useState(0);
  const chatList = useSelector((state: RootState) => state?.chatHistory?.chatHistory);

  const { isConnecting, isIdle } = useSocket();
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

  if (isIdle || isConnecting) {
    return <Loading />;
  }

  return (
    <Grid container wrap="nowrap" justify="flex-start" className={classes.container}>
      <Hidden mdDown>
        <SideMenu
          className="left"
          setMenuOption={setMenuOption}
          menuOption={menuOption}
          openMessageTab={() => setMenuOption(0)}
          notificationAvailables={chatList.some(
            chat => chat.unread_messages[chat.users.find(user => user.user_type === 'PATIENT').id] > 0
          )}
        />
      </Hidden>

      <SelectedOptionContent menuOption={menuOption} setMenuOption={setMenuOption} />

      <Hidden lgUp>
        <MobileNavbar
          setMenuOption={setMenuOption}
          menuOption={menuOption}
          notificationAvailables={chatList.some(
            chat => chat.unread_messages[chat.users.find(user => user.user_type === 'PATIENT').id] > 0
          )}
        />
      </Hidden>
    </Grid>
  );
};

export default HomeScreen;
