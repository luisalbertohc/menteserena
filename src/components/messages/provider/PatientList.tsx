import { Grid, makeStyles, Typography, TextField, Hidden, useMediaQuery } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState, useMemo } from 'react';

import ConversationPreviewCard from '../common/ConversationPreviewCard';
import Conversation from '../common/Conversation';
import PatientProfile from './PatientProfile';
import { Provider, ChatHistories } from '@types';

const useStyles = makeStyles(theme => ({
  headerContainer: {
    padding: theme.spacing(4, 2, 2, 2),
    borderBottom: '1px solid #E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '24px',
  },
  searchBar: {
    height: 30,
    width: 200,
  },
  searchIcon: {
    fill: theme.palette.grey[600],
  },
  profileContainer: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginLeft: 'unset',
    },
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface PatientListProps {
  chatList: ChatHistories;
}

const PatientList = ({ chatList }: PatientListProps) => {
  const classes = useStyles();

  const [chatMessage, setChatMessage] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isvideoCallInProcess, setIsVideoCallInProcess] = useState(false);

  const isTabletSize = useMediaQuery('(max-width: 1280px)');

  const user = chatMessage?.users.find(user => user.user_type === 'PATIENT');

  const list = useMemo(
    () =>
      searchTerm && Boolean(chatList?.length)
        ? chatList.filter(chat =>
            searchTerm
              .toLowerCase()
              .split(' ')
              .every(
                word =>
                  chat.users[0].first_name.toLowerCase().includes(word) ||
                  chat.users[0].last_name.toLowerCase().includes(word)
              )
          )
        : chatList,
    [searchTerm, chatList]
  );

  //This will only be visible on mobile and tablet size.
  if (selectedPatient && isTabletSize && !isvideoCallInProcess) {
    return (
      <div className={`${classes.profileContainer} center`}>
        <PatientProfile patient={selectedPatient} closeProfile={() => setSelectedPatient(null)} />
      </div>
    );
  }

  return (
    <>
      <Grid container className="center">
        {chatMessage ? (
          <Conversation
            messageData={chatMessage}
            user={user}
            receiverId={chatMessage.users.find(user => user.user_type === 'PATIENT').id}
            senderId={chatMessage.users.find(user => user.user_type === 'PROVIDER').id}
            setChatMessage={() => setChatMessage(null)}
            userClickHandler={() => setSelectedPatient(user)}
            setIsVideoCallInProcess={setIsVideoCallInProcess}
          />
        ) : (
          <Grid className={classes.listContainer}>
            <Grid container alignItems="center" justifyContent="space-between" className={classes.headerContainer}>
              <Typography className={classes.title} color="primary">
                Pacientes
              </Typography>
              <TextField
                variant="outlined"
                onChange={event => setSearchTerm(event.target.value)}
                InputProps={{
                  className: classes.searchBar,
                  endAdornment: <SearchIcon className={classes.searchIcon} />,
                }}
                placeholder="Buscar"
              />
            </Grid>
            {list.map((chat, index) => {
              const chatUser = chat.users.find(user => user.user_type === 'PATIENT');

              const isRestrictedChat = chat.status === 'restricted_contact';
              return (
                <ConversationPreviewCard
                  user={chatUser}
                  chatData={chat}
                  key={index}
                  notificationAvailables={
                    chat.unread_messages[chat.users.find(user => user.user_type === 'PROVIDER').id] > 0
                  }
                  setChatMessage={() => {
                    setChatMessage(chat);
                    setSelectedPatient(isTabletSize ? null : chatUser);
                    setSearchTerm('');
                  }}
                  isRestrictedChat={isRestrictedChat}
                />
              );
            })}
          </Grid>
        )}
      </Grid>

      {Boolean(selectedPatient) && (
        <Hidden mdDown>
          <Grid className={`${classes.profileContainer} right`}>
            <PatientProfile patient={selectedPatient} closeProfile={() => setSelectedPatient(null)} />
          </Grid>
        </Hidden>
      )}
    </>
  );
};

export default PatientList;
