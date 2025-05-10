// src/ProfileSection.jsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import ProfileView from './ProfileView';
import './LinktreeLayout.css';

// Choose the appropriate backend based on device
const dndBackend = isMobile ? TouchBackend : HTML5Backend;

function ProfileSection({ 
  profileData, 
  isLoggedIn,
  onReorderLinks,
  onUpdateProfile,
  onUploadProfileImage,
  onAddSocialLink,
  onUpdateSocialLink,
  onDeleteSocialLink,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) {
  return (
    <div className="phone-frame">
      {profileData && (
        <ProfileView 
          profileData={profileData}
          isEditMode={isLoggedIn} 
          onReorderLinks={onReorderLinks}
          onUpdateProfile={onUpdateProfile}
          onUploadProfileImage={onUploadProfileImage}
          onAddSocialLink={onAddSocialLink}
          onUpdateSocialLink={onUpdateSocialLink}
          onDeleteSocialLink={onDeleteSocialLink}
          onAddProduct={onAddProduct}
          onUpdateProduct={onUpdateProduct}
          onDeleteProduct={onDeleteProduct}
          
        />
      )}
    </div>
  );
}

export default ProfileSection;