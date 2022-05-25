import { usePatientProfile } from '@api';
import { useState } from 'react';
import { Grid } from '@material-ui/core';

import { Loading } from '@components/shared';
import EditProfileForm from './editProfile/EditProfileForm';
import ProfileView from './editProfile/ProfileView';

const Profile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { isLoading, data: patient } = usePatientProfile();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid item className="center">
      {isEditProfile ? (
        <EditProfileForm patient={patient} backToProfile={() => setIsEditProfile(false)} />
      ) : (
        <Grid container justify="center">
          <ProfileView patient={patient} editProfile={() => setIsEditProfile(true)} />
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;
