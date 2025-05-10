import { useState } from 'react';

const ProfileTab = ({ profileData, onUpdateProfile, onUploadProfileImage, showMessage }) => {
  const [profileForm, setProfileForm] = useState({
    name: profileData.name,
    tagline: profileData.tagline,
    backgroundColor: profileData.backgroundColor,
    accentColor: profileData.accentColor
  });

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await onUpdateProfile(profileForm);
      showMessage('Profile updated successfully');
    } catch (err) {
      showMessage('Failed to update profile', 'error');
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      await onUploadProfileImage(file);
      showMessage('Profile image updated successfully');
    } catch (err) {
      showMessage('Failed to upload image', 'error');
    }
  };

  return (
    <div className="ep-tab-content">
      <form onSubmit={handleSaveProfile}>
        <div className="ep-form-group profileme" style={{display:'inline'}}>
          <label>Profile Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </div>

        <div className="profilelabel">
          <label>YOUR NAME</label>
          <label>YOUR BIO</label>
        </div>

        <div className="ep-form-group profiledetail">
          <input 
            type="text" 
            name="name" 
            value={profileForm.name} 
            onChange={handleProfileChange} 
            placeholder="Your name" 
          />

          <input 
            type="text" 
            name="tagline" 
            value={profileForm.tagline} 
            onChange={handleProfileChange} 
            placeholder="Your tagline" 
          />
        </div>
        
        <button type="submit" className="ep-save-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileTab;