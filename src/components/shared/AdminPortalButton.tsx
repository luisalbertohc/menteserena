import { makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@api';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.common.black,
  },
}));

const AdminPortalButton = () => {
  const classes = useStyles();
  const { data: entity, isLoading } = useUser();

  const router = useRouter();
  const isAdminPage = router.pathname === '/admin';

  const { user } = entity || {};

  if (isLoading) {
    return null;
  }

  return (
    <>
      {user?.is_admin && (
        <Link href={isAdminPage ? '/portal' : '/admin'}>
          <a className={classes.link}>
            <Typography>{isAdminPage ? 'Mi Portal' : 'Administrador'}</Typography>
          </a>
        </Link>
      )}
    </>
  );
};

export default AdminPortalButton;
