import { useState } from 'react';

const SocialTab = ({ profileData, onAddSocialLink, onDeleteSocialLink, showMessage }) => {
  const [newSocialLink, setNewSocialLink] = useState({
    platform: '',
    url: ''
  });
  
  // Handle new social link form changes
  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setNewSocialLink(prev => ({ ...prev, [name]: value }));
  };

  // Add new social link
  const handleAddSocialLink = async (e) => {
    e.preventDefault();
    if (!newSocialLink.platform || !newSocialLink.url) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
    
    try {
      await onAddSocialLink(newSocialLink);
      setNewSocialLink({ platform: '', url: '' });
      showMessage('Social link added successfully');
    } catch (err) {
      showMessage('Failed to add social link', 'error');
    }
  };

  return (
    <div className="ep-tab-content">
      <div className="ep-social-links-list">
        {profileData.socialLinks.sort((a, b) => a.order - b.order).map(link => (
          <div key={link._id} className="ep-social-link-item">
            <div className="ep-social-link-info">
              <span className="ep-platform">{link.platform}</span>
              <span className="ep-url">{link.url}</span>
            </div>
            <button 
              className="ep-delete-button"
              onClick={() => {
                if (window.confirm(`Delete ${link.platform} link?`)) {
                  onDeleteSocialLink(link._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleAddSocialLink} className="ep-add-form">
        <div className="sociallinklabel">
          <label>Select Platform</label>
          <label>Paste URL</label>
        </div>

        <div className="ep-form-group socialselection">
          <select name="platform" value={newSocialLink.platform} onChange={handleSocialLinkChange} required>
            <option value="">Select platform </option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube </option>
            <option value="Twitter">Twitter </option>
            <option value="Facebook">Facebook </option>
            <option value="TikTok">TikTok</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Spotify">Spotify</option>
            <option value="Other">Other</option>
          </select>

          <input 
            type="url" 
            name="url" 
            value={newSocialLink.url} 
            onChange={handleSocialLinkChange} 
            placeholder="https://..." 
            required
          />
        </div>
        
        <button type="submit" className="ep-add-button">
          Add Social Link
        </button>
      </form>
    </div>
  );
};

export default SocialTab;