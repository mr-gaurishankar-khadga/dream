import { useState, useEffect } from 'react';
import { User, Mail, AtSign, Camera } from 'lucide-react';
import defaultAvatar from './avatar.png';
import './Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: 'Loading...',
    email: 'loading...',
    username: 'loading',
    profileImage: defaultAvatar,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Not authenticated. Please log in.');
          setIsLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();
        setProfileData({
          name: profileData.name || 'User',
          email: JSON.parse(localStorage.getItem('user'))?.email || 'No email',
          username: profileData.username || 'user',
          profileImage: profileData.profileImage
            ? `http://localhost:5000${profileData.profileImage}`
            : defaultAvatar,
        });
      } catch (error) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setProfileData({
            name: storedUser.username || 'User',
            email: storedUser.email || 'No email',
            username: storedUser.username || 'user',
            profileImage: defaultAvatar,
          });
        }
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="custom-profile-page">
      <div className="custom-profile-header">
        <h1>My Profile</h1>
        <p>View and manage your profile information</p>
      </div>

      {isLoading ? (
        <div className="custom-profile-loading">
          <div className="custom-loading-spinner"></div>
          <p>Loading profile information...</p>
        </div>
      ) : error ? (
        <div className="custom-profile-error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="custom-profile-content">
          <div className="custom-profile-card">
            <div className="custom-profile-avatar-container">
              <img
                src={profileData.profileImage}
                alt="Profile Avatar"
                className="custom-profile-avatar"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
              <div className="custom-avatar-overlay">
                <Camera size={24} />
              </div>
            </div>

            <div className="custom-profile-details-list">
              <div className="custom-profile-detail-item">
                <div className="custom-detail-icon">
                  <User size={18} />
                </div>
                <div className="custom-detail-content">
                  <label>Full Name</label>
                  <div className="custom-detail-value">{profileData.name}</div>
                </div>
              </div>

              <div className="custom-profile-detail-item">
                <div className="custom-detail-icon">
                  <AtSign size={18} />
                </div>
                <div className="custom-detail-content">
                  <label>Username</label>
                  <div className="custom-detail-value">{profileData.username}</div>
                </div>
              </div>

              <div className="custom-profile-detail-item">
                <div className="custom-detail-icon">
                  <Mail size={18} />
                </div>
                <div className="custom-detail-content">
                  <label>Email Address</label>
                  <div className="custom-detail-value">{profileData.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
