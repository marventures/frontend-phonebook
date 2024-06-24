import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { ProfileForm } from '../../components/ProfileForm/ProfileForm';

const ProfilePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Profile</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default ProfilePage;
