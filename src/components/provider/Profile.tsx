import { useState } from 'react';
import { useProviderProfile } from '@api';
import { Grid } from '@material-ui/core';

import EditProfileForms from './editProfile/EditProfileForms';
import ProfileView from './editProfile/ProfileView';
import { Loading } from '@components/shared';
import { Provider } from '@types';

interface ProfileProps {
  provider: Provider;
}

const Profile = ({ provider }: ProfileProps) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { data: profile, isLoading } = useProviderProfile();

  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <>
      <Grid item className="center">
        {isEditProfile ? (
          <EditProfileForms profile={profile} backToProfile={() => setIsEditProfile(false)} />
        ) : (
          <Grid container justifyContent="center">
            <ProfileView profile={profile} editProfile={() => setIsEditProfile(true)} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Profile;
