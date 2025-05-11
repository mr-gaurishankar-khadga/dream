import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileView from './ProfileView';
import Loading from '../Loading';

// Get API URL from environment or use default
// Fix: Use import.meta.env for Vite or window.__ENV__ pattern as fallback
const API_URL = import.meta.env?.VITE_API_URL || 
                window.__ENV__?.API_URL || 
                'https://dream-1-33wv.onrender.com/api';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log(`Fetching profile for username: ${username}`);
        
        // Make API request to get profile by username
        const response = await axios.get(`${API_URL}/profile/${username}`);
        
        if (response.data) {
          console.log('Profile data received:', response.data);
          setProfile(response.data);
          setError(null);
        } else {
          console.error('No profile data received');
          setError('Profile not found');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  // Show loading state
  if (loading) {
    return (
      <div className="public-profile-loading">
        <Loading />
      </div>
    );
  }

  // Show error state
  if (error || !profile) {
    return (
      <div className="public-profile-error">
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>Sorry, we couldn't find a profile for "{username}"</p>
          <p className="error-details">{error}</p>
        </div>
      </div>
    );
  }

  // Show profile
  return (
    <div className="public-profile-wrapper">
      <ProfileView profileData={profile} />
    </div>
  );
};

export default PublicProfile;