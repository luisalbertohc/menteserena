import { makeStyles, Container, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { format, utcToZonedTime } from 'date-fns-tz';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { useQuery } from 'react-query';

import { ExtendedUser } from '@types';
import UserTypeText from './UserTypeText';
import { api } from '@api';
import { Loading } from '@components/shared';
import { useCognito } from '@components/context/AuthContext';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const useStyles = makeStyles(theme => ({
  backButton: {
    marginBottom: theme.spacing(3),
  },
}));

interface UserLogsTableProps {
  setSelectedUserLogs: (params: any) => void;
  user: ExtendedUser;
}

interface LogsProps {
  user_logs: string[];
}

const fetchLogs = async ({
  queryKey: [_key, { user, getSession }],
}: {
  queryKey: [any, { user: ExtendedUser; getSession: () => Promise<CognitoUserSession> }];
}) => {
  const session = await getSession();
  const res = await api.get(`api/admin/user/${user.user_id}/logs`, {
    headers: {
      authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
    },
  });
  return res.data as any;
};

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const UserLogsTable = ({ setSelectedUserLogs, user }: UserLogsTableProps) => {
  const classes = useStyles();
  const { getSession } = useCognito();

  const { data, isLoading, isIdle } = useQuery<LogsProps>(['logs', { getSession, user }], fetchLogs as any, {});

  if (isLoading || isIdle) {
    return <Loading />;
  }

  const columns = [
    {
      name: 'log_time',
      label: 'Date Created',
      options: {
        sortDescFirst: true,
        customBodyRender: (date: Date) => {
          const utcDate = utcToZonedTime(date, localTimeZone || 'America/Puerto_Rico');
          return format(new Date(utcDate), 'MM/dd/yyyy h:mm aaa');
        },
      },
    },
    {
      name: 'action',
      label: 'Type',
      options: {
        customBodyRender: (value: string) => {
          return <UserTypeText text={value} />;
        },
      },
    },
    {
      name: 'direction',
      label: 'Direction',
    },
    {
      name: 'call_duration',
      label: 'Call Duration',
    },
  ];

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedUserLogs(null)}
        className={classes.backButton}
      >
        <ArrowBackIcon />
        Back
      </Button>
      <MUIDataTable
        title={`Viewing Log: ${user.first_name} ${user.last_name}`}
        columns={columns}
        data={data?.user_logs}
        options={{
          selectableRows: 'none',
        }}
      />
    </Container>
  );
};

export default UserLogsTable;
