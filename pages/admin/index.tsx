import { useUser } from '@api';
import { Loading } from '@components/shared';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import UsersTable from '@components/admin/users/UsersTable';
import { MenuList, MenuItem, Paper } from '@material-ui/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { useCognito, withAuthenticationRequired } from '@components/context/AuthContext';

const AdminHome = () => {
  const { isLoading, data: entity } = useUser();
  const router = useRouter();

  const [token, setToken] = useState<string>();
  const [selectedTab, setSelectedTab] = useState('Users');
  const { getSession } = useCognito();

  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      
      setToken(session.getAccessToken().getJwtToken());
    };
    if (!token) {
      fetchToken();
    }
  }, [token]);
  const { user } = entity || {};

  if (isLoading) {
    return <Loading />;
  }

  if (user && !user.is_admin) {
    router.push('/portal/');
    return null;
  }

  return (
    <>
      <Paper>
        <MenuList>
          <MenuItem onClick={() => setSelectedTab('Users')}>Users</MenuItem>
          {/* <MenuItem>Statistics</MenuItem>
          <MenuItem>Admin Audit Log</MenuItem> */}
        </MenuList>
      </Paper>
      {selectedTab === 'Users' && <UsersTable token={token} />}
    </>
  );
};

export default withAuthenticationRequired(AdminHome);
