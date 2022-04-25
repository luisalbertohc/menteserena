import AuthLayout from '@components/layout/AuthLayout';
import Register from '@components/auth/forms/Register';

import { withNoAuthetication } from '@components/context/AuthContext';

const RegisterScreen = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
};

export default withNoAuthetication(RegisterScreen);
