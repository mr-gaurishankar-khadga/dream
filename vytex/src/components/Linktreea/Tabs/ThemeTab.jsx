import { useState } from 'react';
import ThemeSelector from '../ThemeSelector';

const ThemeTab = ({ profileData, onUpdateProfile, showMessage }) => {
  // Add current theme state
  const [currentTheme, setCurrentTheme] = useState({
    backgroundColor: profileData.backgroundColor,
    accentColor: profileData.accentColor,
    textColor: profileData.textColor || '#333333',
    secondaryColor: profileData.secondaryColor || '#f5f5f5',
    gradient: profileData.gradient || null
  });
  
  // Handle theme change
  const handleThemeChange = async (newTheme) => {
    setCurrentTheme(newTheme);
    
    try {
      await onUpdateProfile({
        ...profileData,
        backgroundColor: newTheme.backgroundColor,
        accentColor: newTheme.accentColor,
        textColor: newTheme.textColor,
        secondaryColor: newTheme.secondaryColor,
        gradient: newTheme.gradient
      });
      showMessage('Theme updated successfully');
    } catch (err) {
      console.error('Error updating theme:', err);
      showMessage('Failed to update theme', 'error');
    }
  };

  return (
    <div className="ep-tab-content">
      <div className="ep-theme-section">
        <div className="ep-theme-selector-container">
          <ThemeSelector 
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}

          />
        </div>
      </div>
    </div>
  );
};

export default ThemeTab;