import { useState, useEffect } from 'react';
import { Camera, Sparkles, ShoppingBag, Link as LinkIcon, ChevronUp, Copy, Check } from 'lucide-react';
import SocialLink from './SocialLink';
import ProductsSection from './ProductsSection';
import './ProfileView.css';

// Helper function to calculate contrast color for better accessibility
const calculateContrastColor = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark colors and dark gray for light colors
  return luminance > 0.5 ? '#333333' : '#ffffff';
};

// Helper to determine if a color is dark or light
const isColorDark = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance (same as above)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if color is dark
  return luminance < 0.5;
};

const ProfileView = ({ profileData }) => {
  const [socialLinks, setSocialLinks] = useState(
    profileData.socialLinks.sort((a, b) => a.order - b.order)
  );
  const [activeTab, setActiveTab] = useState('links');
  const [animateProfileImage, setAnimateProfileImage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draggingLink, setDraggingLink] = useState(null);
  
  // Theme state
  const [currentTheme, setCurrentTheme] = useState({
    backgroundColor: profileData.backgroundColor,
    accentColor: profileData.accentColor,
    textColor: profileData.textColor,
    secondaryColor: profileData.secondaryColor,
    gradient: profileData.gradient || null
  });
  
  // Calculate appropriate text colors based on themes
  const [calculatedColors, setCalculatedColors] = useState({
    primaryTextColor: calculateContrastColor(profileData.backgroundColor),
    accentTextColor: calculateContrastColor(profileData.accentColor),
    buttonTextColor: calculateContrastColor(profileData.accentColor),
    linkFieldTextColor: '#333333',
    linkFieldBgColor: 'rgba(255, 255, 255, 0.8)'
  });

  // Update social links when profileData changes
  useEffect(() => {
    setSocialLinks(profileData.socialLinks.sort((a, b) => a.order - b.order));
  }, [profileData.socialLinks]);

  // Update theme state when profileData changes
  useEffect(() => {
    setCurrentTheme({
      backgroundColor: profileData.backgroundColor,
      accentColor: profileData.accentColor,
      textColor: profileData.textColor,
      secondaryColor: profileData.secondaryColor,
      gradient: profileData.gradient
    });
    
    // Recalculate appropriate colors
    const baseColor = profileData.gradient ? 
      // For gradient themes, try to determine a dominant color
      // This is a simple approach - for a more accurate approach, use the first color in gradient
      profileData.backgroundColor : 
      profileData.backgroundColor;
    
    setCalculatedColors({
      primaryTextColor: calculateContrastColor(baseColor),
      accentTextColor: calculateContrastColor(profileData.accentColor),
      buttonTextColor: calculateContrastColor(profileData.accentColor),
      // For the link field, adapt based on background darkness
      linkFieldTextColor: isColorDark(baseColor) ? '#ffffff' : '#333333',
      linkFieldBgColor: isColorDark(baseColor) ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)'
    });
  }, [profileData]);

  // Trigger entrance animation on component mount
  useEffect(() => {
    setAnimateProfileImage(true);
  }, []);

  // Get background style based on current theme
  const getBackgroundStyle = () => {
    if (currentTheme.gradient) {
      return {
        background: currentTheme.gradient,
      };
    }
    
    return {
      backgroundColor: currentTheme.backgroundColor,
      backgroundImage: `radial-gradient(circle at top right, ${currentTheme.accentColor}22, ${currentTheme.backgroundColor}), 
                         linear-gradient(45deg, ${currentTheme.backgroundColor} 0%, ${currentTheme.backgroundColor}99 100%)`,
    };
  };

  // Generate profile link from username
  const generateProfileLink = () => {
    const username = profileData.name.toLowerCase().replace(/\s+/g, '');
    return `https://www.linktreea.netlify.app/${username}`;
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    const link = generateProfileLink();
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  // Handle drag start
  const handleDragStart = (e, linkId) => {
    setDraggingLink(linkId);
    // Set custom drag image if needed
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', linkId);
    }
  };

  // Handle drag over
  const handleDragOver = (e, linkId) => {
    e.preventDefault();
    if (draggingLink === linkId) return;
    
    const draggedLinkIndex = socialLinks.findIndex(link => link._id === draggingLink);
    const targetLinkIndex = socialLinks.findIndex(link => link._id === linkId);
    
    if (draggedLinkIndex === -1 || targetLinkIndex === -1) return;
    
    // Create a new array with the updated order
    const newSocialLinks = [...socialLinks];
    const [draggedLink] = newSocialLinks.splice(draggedLinkIndex, 1);
    newSocialLinks.splice(targetLinkIndex, 0, draggedLink);
    
    // Update the order property for each link
    const updatedLinks = newSocialLinks.map((link, index) => ({
      ...link,
      order: index
    }));
    
    setSocialLinks(updatedLinks);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggingLink(null);
  };

  return (
    <div 
      className="profile-view"
      style={{ 
        ...getBackgroundStyle(),
        color: calculatedColors.primaryTextColor
      }}
    >
      {/* Animated background particles */}
      <div className="particles-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`} style={{ backgroundColor: currentTheme.accentColor }} />
        ))}
      </div>

      {/* Accent decorations */}
      <div className="accent-decoration top-right" 
        style={{ backgroundColor: currentTheme.accentColor }} />
      <div className="accent-decoration bottom-left" 
        style={{ backgroundColor: currentTheme.accentColor }} />
      <div className="accent-circle" style={{ backgroundColor: `${currentTheme.accentColor}22` }} />

      {/* Profile header */}
      <div className={`profile-header ${animateProfileImage ? 'animate-in' : ''}`}>
        <div className="profile-image-container">
          <div className="profile-image-ring" style={{ borderColor: currentTheme.accentColor }}>
            <img 
              src={profileData.profileImage ? 
                (profileData.profileImage.startsWith('http') ? 
                  profileData.profileImage : 
                  `${import.meta.env.VITE_BACKEND_URL}${profileData.profileImage}`

                ) : 
                '/default-avatar.png'
              } 
              alt={profileData.name || 'Profile'} 
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.png';
              }}
            />
          </div>
        </div>
        
        <div className="profile-name-container">
          <h1 className="profile-name" style={{ color: calculatedColors.primaryTextColor }}>{profileData.name}</h1>
        </div>
        
        <div className="tagline-container">
          <p className="profile-tagline" style={{ color: calculatedColors.primaryTextColor }}>{profileData.tagline}</p>
          <Sparkles size={18} className="sparkle-icon" style={{ color: currentTheme.accentColor }} />
        </div>

        {/* Profile Link Generator */}
        <div className="profile-link-container">
          <div className="link-field">
            <input 
              type="text" 
              value={generateProfileLink()} 
              readOnly 
              onClick={(e) => e.target.select()}
              style={{ 
                borderColor: currentTheme.accentColor,
                color: calculatedColors.linkFieldTextColor,
                backgroundColor: calculatedColors.linkFieldBgColor
              }}
            />
            <button 
              onClick={copyToClipboard}
              style={{ 
                backgroundColor: currentTheme.accentColor,
                color: calculatedColors.accentTextColor 
              }}
            >
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
            </button>
          </div>
          <p className="link-instruction" style={{ color: calculatedColors.primaryTextColor }}>
            Share this link on your social media profiles
          </p>
        </div>
      </div>

      {/* Navigation buttons - fully dynamic */}
      <div 
        className="nav-buttons" 
        style={{ 
          backgroundColor: currentTheme.gradient ? 'rgba(0, 0, 0, 0.1)' : `${currentTheme.backgroundColor}95`,
          borderBottom: `1px solid ${currentTheme.accentColor}20` 
        }}
      >
        <button 
          className={`nav-button ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
          style={{ 
            '--highlight-color': currentTheme.accentColor,
            border: activeTab === 'links' ? `2px solid ${currentTheme.accentColor}` : 'none',
            color: activeTab === 'links' ? currentTheme.accentColor : calculatedColors.primaryTextColor,
            backgroundColor: activeTab === 'links' ? 
              (currentTheme.gradient ? 'rgba(0, 0, 0, 0.2)' : currentTheme.backgroundColor) : 
              'transparent'
          }}
        >
          <LinkIcon 
            size={18} 
            style={{ color: activeTab === 'links' ? currentTheme.accentColor : calculatedColors.primaryTextColor }} 
          />
          <span>Links</span>
        </button>
        <button 
          className={`nav-button ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
          style={{ 
            '--highlight-color': currentTheme.accentColor,
            border: activeTab === 'shop' ? `2px solid ${currentTheme.accentColor}` : 'none',
            color: activeTab === 'shop' ? currentTheme.accentColor : calculatedColors.primaryTextColor,
            backgroundColor: activeTab === 'shop' ? 
              (currentTheme.gradient ? 'rgba(0, 0, 0, 0.2)' : currentTheme.backgroundColor) : 
              'transparent'
          }}
        >
          <ShoppingBag 
            size={18} 
            style={{ color: activeTab === 'shop' ? currentTheme.accentColor : calculatedColors.primaryTextColor }} 
          />
          <span>Shop</span>
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'shop' ? (
          <div className="shop-tab-container">
            <ProductsSection 
              products={profileData.products} 
              accentColor={currentTheme.accentColor} 
              textColor={calculatedColors.primaryTextColor}
              secondaryColor={currentTheme.secondaryColor}
              backgroundColor={currentTheme.backgroundColor}
            />
          </div>
        ) : (
          <div className="links-tab-container">
            <div className="social-links-section" style={{ color: calculatedColors.primaryTextColor }}>
              {socialLinks.map((link, index) => (
                <div
                  key={link._id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, link._id)}
                  onDragOver={(e) => handleDragOver(e, link._id)}
                  onDragEnd={handleDragEnd}
                  className={`draggable-link-container ${draggingLink === link._id ? 'dragging' : ''}`}
                >
                  <SocialLink
                    index={index}
                    id={link._id}
                    platform={link.platform}
                    url={link.url}
                    accentColor={currentTheme.accentColor}  
                    textColor={calculatedColors.primaryTextColor}
                    backgroundColor={currentTheme.backgroundColor}
                    secondaryColor={currentTheme.secondaryColor}
                    isDraggable={true}
                    isGradient={Boolean(currentTheme.gradient)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div 
        className="linktree-footer" 
        style={{ 
          color: calculatedColors.primaryTextColor,
          borderTop: `1px solid ${currentTheme.accentColor}15` 
        }}
      >
        <button 
          className="scroll-to-top" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ 
            backgroundColor: currentTheme.accentColor,
            color: calculatedColors.accentTextColor
          }}
        >
          <ChevronUp size={20} style={{ color: calculatedColors.accentTextColor }} />
        </button>
        <span style={{ color: calculatedColors.primaryTextColor }}>Linktree<sup>*</sup></span>
      </div>
    </div>
  );
};

export default ProfileView;