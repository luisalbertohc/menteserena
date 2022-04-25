import AuthLayout from '@components/layout/AuthLayout';
import ResetPassword from '@components/auth/forms/ResetPassword';

const NewPasswordScreen = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default NewPasswordScreen;
