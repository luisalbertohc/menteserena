import { Grid, Dialog, DialogContent, Button, Typography, makeStyles, Container, IconButton } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Edit as EditIcon, Visibility as VisibilityIcon } from '@material-ui/icons';

import { useUsersAsAdmin, toggleActive, toggleAdmin } from '@api';
import { ExtendedUser } from '@types';
import UserLogsTable from './UserLogsTable';
import UserTypeText from './UserTypeText';
import { Loading } from '@components/shared';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  infoContainer: {
    marginBottom: theme.spacing(4),
  },
  label: {
    fontWeight: 700,
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
    width: 200,
  },
  tableContainer: {
    margin: theme.spacing(5, 0),
  },
}));

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const UsersTable = ({ token }) => {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState<ExtendedUser>();
  const [selectedUserLogs, setSelectedUserLogs] = useState<ExtendedUser>();
  const { data, refetch, isFetching } = useUsersAsAdmin(token);
  const [errorMessage, setErrorMessage] = useState(false);

  const { mutate: toggleApiActive, isLoading: isChangingActive } = useMutation(async (user: ExtendedUser) => {
    const newUser = await toggleActive(token, user);
    setSelectedUser(newUser);
    await refetch();
  });

  const { mutate: toggleApiAdmin, isLoading: isChangingAdmin } = useMutation(async (user: ExtendedUser) => {
    try {
      setSelectedUser(await toggleAdmin(token, user));
      await refetch();
    } catch (e) {
      if (e.message.includes('403')) {
        setErrorMessage(true);
      }
    }
  });

  if (isFetching) {
    return <Loading />;
  }

  const columns = [
    {
      name: 'user_id',
      label: 'Id',
    },
    {
      name: 'first_name',
      label: 'First Name',
    },
    {
      name: 'last_name',
      label: 'Last Name',
    },
    {
      name: 'email',
      label: 'E-Mail',
    },
    {
      name: 'personal_phone',
      label: 'Personal Phone',
    },
    {
      name: 'office_phone',
      label: 'Office Phone',
    },
    {
      name: 'inserted_at',
      label: 'Date Created',
      options: {
        customBodyRender: (date: Date) => {
          const utcDate = utcToZonedTime(date, localTimeZone || 'America/Puerto_Rico');
          return format(new Date(utcDate), 'MM/dd/yyyy h:mm aaa');
        },
      },
    },
    {
      name: 'last_login_time',
      label: 'Last Login',
      options: {
        customBodyRender: (date: Date) => {
          if (!date) {
            return '';
          }
          const utcDate = utcToZonedTime(date, localTimeZone || 'America/Puerto_Rico');
          return format(new Date(utcDate), 'MM/dd/yyyy h:mm aaa');
        },
      },
    },
    {
      name: 'user_type',
      label: 'Type',
      options: {
        customBodyRender: (value: string) => {
          return <UserTypeText text={value} />;
        },
      },
    },
    {
      name: 'deactivated',
      label: 'Active',
      options: {
        customBodyRender: (value: boolean) => {
          return !value ? 'Yes' : 'No'; //flip the value since we're showing as 'active'.
        },
      },
    },
    {
      name: 'is_admin',
      label: 'Admin?',
      options: {
        customBodyRender: (value: boolean) => {
          return !!value ? 'Yes' : 'No';
        },
      },
    },
    {
      name: 'edit',
      label: 'Edit',
      options: {
        customBodyRender: (_: string, { rowData: [id] }) => {
          return (
            <IconButton onClick={() => setSelectedUser(data.users.find(user => user.user_id === id))}>
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
    {
      name: 'logs',
      label: 'Logs',
      options: {
        customBodyRender: (_: string, { rowIndex, rowData: [id] }) => {
          const user = data.users[rowIndex];

          return (
            <IconButton
              disabled={user.user_type === 'PATIENT'}
              onClick={() => setSelectedUserLogs(data.users.find(user => user.user_id === id))}
            >
              <VisibilityIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  return (
    <Grid container alignItems="center" justify="center">
      <Container className={classes.tableContainer}>
        {selectedUserLogs ? (
          <UserLogsTable setSelectedUserLogs={setSelectedUserLogs} user={selectedUserLogs} />
        ) : (
          <MUIDataTable
            title="Users"
            columns={columns}
            data={data.users}
            options={{
              selectableRows: 'none',
            }}
          />
        )}
      </Container>
      {selectedUser && (
        <Dialog open onClose={() => setSelectedUser(null)}>
          <DialogContent>
            <Typography color="primary" variant="h5" className={classes.title}>
              Editar Proveedor
            </Typography>
            <Grid container direction="column" className={classes.infoContainer}>
              <Typography>
                <span className={classes.label}>ID:</span> {selectedUser?.user_id}
              </Typography>
              <Typography>
                <span className={classes.label}>Nombre:</span>
                {selectedUser?.first_name} {selectedUser?.last_name}
              </Typography>
              <Typography>
                <span className={classes.label}>Correo Electronico:</span> {selectedUser?.email}
              </Typography>
              <Typography>
                <span className={classes.label}>Estado:</span> {selectedUser?.deactivated ? 'No Activo' : 'Activado'}
              </Typography>
              <Typography>
                <span className={classes.label}>Tipo de usuario:</span> {selectedUser?.user_type}
              </Typography>
              <Grid container direction="column" alignItems="center" className={classes.buttonContainer}>
                <Typography color="primary" variant="h5" className={classes.title}>
                  Cambiar Estados
                </Typography>
                <Typography>
                  If checked, this provider will no longer be able to login and will be hidden from the therapist
                  directory.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleApiActive(selectedUser)}
                  className={classes.button}
                  disabled={isChangingActive}
                >
                  {selectedUser?.deactivated ? 'Activate User' : 'Deactivate User'}
                </Button>

                {selectedUser.user_type === 'PROVIDER' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleApiAdmin(selectedUser)}
                    className={classes.button}
                    disabled={isChangingAdmin}
                  >
                    {selectedUser?.is_admin ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                )}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
      {errorMessage && (
        <Dialog open onClose={() => setErrorMessage(false)}>
          <DialogContent>
            <Grid container direction="column" alignItems="center">
              <Typography color="primary" variant="h6" className={classes.title}>
                No puede eliminarse a sí mismo como administrador
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setErrorMessage(false)}>
                ok
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Grid>
  );
};

export default UsersTable;
