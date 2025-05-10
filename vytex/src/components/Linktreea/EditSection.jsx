
import React from 'react';
import EditPanel from './EditPanel';
import './LinktreeLayout.css';

function EditSection({
  profileData,
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
    <EditPanel 
      profileData={profileData}
      onUpdateProfile={onUpdateProfile}
      onUploadProfileImage={onUploadProfileImage}
      onAddSocialLink={onAddSocialLink}
      onUpdateSocialLink={onUpdateSocialLink}
      onDeleteSocialLink={onDeleteSocialLink}
      onAddProduct={onAddProduct}
      onUpdateProduct={onUpdateProduct}
      onDeleteProduct={onDeleteProduct}
    />
  );
}

export default EditSection;