import React from 'react';
import { me } from '@/api/operations';

const ProfilePage = async () => {
  const user = await me();
  
  return (
    <div className="profile-page">
      <h1>Profile page coming soon</h1>
      <p>User: {user?.name}</p>
    </div>
  );
};

export default ProfilePage;