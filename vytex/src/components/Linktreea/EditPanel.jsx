import { useState, useEffect } from 'react';
import './EditPanel.css';
import { User, Palette, Share2, ShoppingBag, Eye } from 'lucide-react';

import ProfileTab from './Tabs/ProfileTab';
import ThemeTab from './Tabs/ThemeTab';
import SocialTab from './Tabs/SocialTab';
import ProductsTab from './Tabs/ProductsTab';
import ProfileSection from './ProfileSection';

const EditPanel = ({ 
  profileData, 
  onUpdateProfile, 
  onUploadProfileImage,
  onAddSocialLink,
  onUpdateSocialLink,
  onDeleteSocialLink,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onReorderLinks
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get appropriate title for mobile view based on active tab
  const getMobileTitle = () => {
    switch(activeTab) {
      case 'profile': return 'Profile Settings';
      case 'theme': return 'Theme Options';
      case 'social': return 'Social Links';
      case 'products': return 'Product Management';
      case 'preview': return 'Preview';
      default: return '';
    }
  };

  return (
    <div className="ep-edit-panel" >
      {/* Regular tabs for desktop only */}
      {!isMobile && (
        <div className="ep-tabs">
          <button 
            className={`ep-tab ${activeTab === 'profile' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Add Profile
          </button>
          <button 
            className={`ep-tab ${activeTab === 'theme' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            Theme Template
          </button>
          <button 
            className={`ep-tab ${activeTab === 'social' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Add Social Links
          </button>
          <button 
            className={`ep-tab ${activeTab === 'products' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Add Products
          </button>
        </div>
      )}
      
      {message.text && (
        <div className={`ep-message ep-${message.type}`}>
          {message.text}
        </div>
      )}
      
      {/* Tab content */}
      <div className="ep-tab-content" data-mobile-title={isMobile ? getMobileTitle() : ''}>
        {activeTab === 'profile' && (
          <ProfileTab 
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
            onUploadProfileImage={onUploadProfileImage}
            showMessage={showMessage}
          />
        )}
        
        {activeTab === 'theme' && (
          <ThemeTab 
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
            showMessage={showMessage}
          />
        )}
        
        {activeTab === 'social' && (
          <SocialTab 
            profileData={profileData}
            onAddSocialLink={onAddSocialLink}
            onDeleteSocialLink={onDeleteSocialLink}
            showMessage={showMessage}
          />
        )}
        
        {activeTab === 'products' && (
          <ProductsTab 
            profileData={profileData}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
            showMessage={showMessage}
          />
        )}

        {activeTab === 'preview' && isMobile && (
          <div className="preview-container">
            <ProfileSection 
              profileData={profileData}
              isLoggedIn={true}
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
          </div>
        )}
      </div>

      {/* Mobile bottom navigation with Lucide icons */}
      {isMobile && (
        <div className="ep-mobile-tabs">
          <button 
            className={`ep-mobile-tab ${activeTab === 'profile' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('profile')}
            data-tab="profile"
          >
            <User size={24} />
            <span>Profile</span>
          </button>
          <button 
            className={`ep-mobile-tab ${activeTab === 'theme' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('theme')}
            data-tab="theme"
          >
            <Palette size={24} />
            <span>Theme</span>
          </button>
          <button 
            className={`ep-mobile-tab ${activeTab === 'social' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('social')}
            data-tab="social"
          >
            <Share2 size={24} />
            <span>Social</span>
          </button>
          <button 
            className={`ep-mobile-tab ${activeTab === 'products' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('products')}
            data-tab="products"
          >
            <ShoppingBag size={24} />
            <span>Products</span>
          </button>
          <button 
            className={`ep-mobile-tab ${activeTab === 'preview' ? 'ep-active' : ''}`}
            onClick={() => setActiveTab('preview')}
            data-tab="preview"
          >
            <Eye size={24} />
            <span>Preview</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPanel;