import AuthLayout from '@components/layout/AuthLayout';
import Login from '@components/auth/forms/Login';

import { withNoAuthetication } from '@components/context/AuthContext';

const LoginScreen = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default withNoAuthetication(LoginScreen);
