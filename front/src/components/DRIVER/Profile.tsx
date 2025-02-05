import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/api/users/${user.id}`)
        .then(response => setProfile(response.data))
        .catch(error => console.error('Error fetching profile:', error));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/users/${user?.id}`, profile)
      .then(response => {
        console.log('Profile updated:', response.data);
        // Optionally update the Redux state here
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={profile.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
