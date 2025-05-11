import { useState, useEffect, useRef } from 'react';
import { Palette, Check, X, Moon, Sun, Sliders, Save, Copy, Plus, Trash2 } from 'lucide-react';
import './ThemeSelector.css';

// Predefined theme options with complete color schemes
const themeOptions = [
  // Original solid themes
  {
    id: 'theme1',
    name: 'Ocean Blue',
    backgroundColor: '#f0f8ff',
    accentColor: '#0078d7',
    textColor: '#333333',
    secondaryColor: '#e6f2ff',
    linkColor: '#0062b1',
    gradient: 'linear-gradient(135deg, #f0f8ff 0%, #d6e8ff 100%)'
  },
  {
    id: 'theme2',
    name: 'Sunset Orange',
    backgroundColor: '#fff5f0',
    accentColor: '#ff5722',
    textColor: '#3a2c2b',
    secondaryColor: '#ffe8e0',
    linkColor: '#d93800',
    gradient: 'linear-gradient(135deg, #fff5f0 0%, #ffcab8 100%)'
  },
  {
    id: 'theme3',
    name: 'Mint Green',
    backgroundColor: '#f0fff4',
    accentColor: '#00c853',
    textColor: '#2e3d2d',
    secondaryColor: '#e0f7e9',
    linkColor: '#00a243',
    gradient: 'linear-gradient(135deg, #f0fff4 0%, #c8e6c9 100%)'
  },
  {
    id: 'theme4',
    name: 'Royal Purple',
    backgroundColor: '#f8f0ff',
    accentColor: '#673ab7',
    textColor: '#332b3a',
    secondaryColor: '#ede0ff',
    linkColor: '#512da8',
    gradient: 'linear-gradient(135deg, #f8f0ff 0%, #d8c1f7 100%)'
  },
  {
    id: 'theme5',
    name: 'Golden Hour',
    backgroundColor: '#fffaf0',
    accentColor: '#ffc107',
    textColor: '#3a3526',
    secondaryColor: '#fff2d6',
    linkColor: '#e6ac00',
    gradient: 'linear-gradient(135deg, #fffaf0 0%, #ffe0a3 100%)'
  },
  {
    id: 'theme6',
    name: 'Midnight',
    backgroundColor: '#21252b',
    accentColor: '#61dafb',
    textColor: '#e6e6e6',
    secondaryColor: '#2c313a',
    linkColor: '#4bbce8',
    gradient: 'linear-gradient(135deg, #21252b 0%, #2c313a 100%)'
  },
  
];



// Gradient theme options (Original 5 + 10 new ones)
const gradientThemes = [
  // Original gradient themes
  {
    id: 'gradient1',
    name: 'Sunset Vibes',
    backgroundColor: '#181818',
    accentColor: '#ff5252',
    textColor: '#2b3866',
    secondaryColor: '#fad0c4',
    linkColor: '#e73c3c',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fad0c4 100%)'
  },
  {
    id: 'gradient2',
    name: 'Northern Lights',
    backgroundColor: '#43cea2',
    accentColor: '#3f51b5',
    textColor: '#75295e',
    secondaryColor: '#185a9d',
    linkColor: '#7986cb',
    gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)'
  },
  {
    id: 'gradient3',
    name: 'Berry Fusion',
    backgroundColor: '#8e2de2',
    accentColor: '#ff4081',
    textColor: '#4df7c5',
    secondaryColor: '#4a00e0',
    linkColor: '#ff80ab',
    gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)'
  },
  {
    id: 'gradient4',
    name: 'Peachy Dream',
    backgroundColor: '#f2709c',
    accentColor: '#ff9472',
    textColor: '#1a4659',
    secondaryColor: '#f7819f',
    linkColor: '#ffb88c',
    gradient: 'linear-gradient(135deg, #f2709c 0%, #ff9472 100%)'
  },
  {
    id: 'gradient5',
    name: 'Ocean Depths',
    backgroundColor: '#0f2027',
    accentColor: '#00b4db',
    textColor: '#ffb86c',
    secondaryColor: '#203a43',
    linkColor: '#4dd0e1',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
  },
  
  // 10 Additional modern gradient themes
  {
    id: 'gradient6',
    name: 'Cosmic Fusion',
    backgroundColor: '#3a1c71',
    accentColor: '#ff82c9',
    textColor: '#ffffff',
    secondaryColor: '#4c2885',  
    linkColor: '#fc9deb',
    gradient: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)'
  },
  {
    id: 'gradient7',
    name: 'Mojito Fresh',
    backgroundColor: '#1d976c',
    accentColor: '#93f9b9',
    textColor: '#ffffff',
    secondaryColor: '#238e68',
    linkColor: '#baffd2',
    gradient: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)'
  },
  {
    id: 'gradient8',
    name: 'Purple Haze',
    backgroundColor: '#4776E6',
    accentColor: '#e989ff',
    textColor: '#ffffff',
    secondaryColor: '#5a4ee6',
    linkColor: '#d6c9ff',
    gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)'
  },
  {
    id: 'gradient9',
    name: 'Crimson Tide',
    backgroundColor: '#8A2387',
    accentColor: '#E94057',
    textColor: '#75dca1',
    secondaryColor: '#a530a5',
    linkColor: '#ff8c9e',
    gradient: 'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)'
  },
  {
    id: 'gradient10',
    name: 'Blue Moon',
    backgroundColor: '#2C3E50',
    accentColor: '#4CA1AF',
    textColor: '#ffffff',
    secondaryColor: '#34495E',
    linkColor: '#6dc7d5',
    gradient: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)'
  },
  {
    id: 'gradient11',
    name: 'Emerald Water',
    backgroundColor: '#348F50',
    accentColor: '#86dba9',
    textColor: '#ffffff',
    secondaryColor: '#488e5a',
    linkColor: '#a8edc8',
    gradient: 'linear-gradient(135deg, #348F50 0%, #56B4D3 100%)'
  },
  {
    id: 'gradient12',
    name: 'Burning Orange',
    backgroundColor: '#FF416C',
    accentColor: '#ffb199',
    textColor: '#ffffff',
    secondaryColor: '#ff5257',
    linkColor: '#ffd0c4',
    gradient: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)'
  },
  {
    id: 'gradient13',
    name: 'Wiretap',
    backgroundColor: '#8A2387',
    accentColor: '#d782ff',
    textColor: '#ffffff',
    secondaryColor: '#7237b7',
    linkColor: '#efb1ff',
    gradient: 'linear-gradient(135deg, #8A2387 0%, #E94057 75%, #F27121 100%)'
  },
  {
    id: 'gradient14',
    name: 'Azure Lane',
    backgroundColor: '#1A2980',
    accentColor: '#59c4ff',
    textColor: '#ffffff',
    secondaryColor: '#263e92',
    linkColor: '#99d8ff',
    gradient: 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)'
  },
  {
    id: 'gradient15',
    name: 'Velvet Morning',
    backgroundColor: '#355C7D',
    accentColor: '#C06C84',
    textColor: '#7de8c3',
    secondaryColor: '#6C5B7B',
    linkColor: '#f7a4b9',
    gradient: 'linear-gradient(135deg, #355C7D 0%, #6C5B7B 50%, #C06C84 100%)'
  },
  {
    id: 'neon_future',
    name: 'Neon Future',
    backgroundColor: '#0E0B16',
    accentColor: '#E7DFDD',
    textColor: '#A239CA',
    secondaryColor: '#4717F6',
    linkColor: '#FF124F',
    gradient: 'linear-gradient(135deg, #0E0B16 0%, #4717F6 50%, #A239CA 100%)'
},

{
    id: 'cyber_mint',
    name: 'Cyber Mint',
    backgroundColor: '#151515',
    accentColor: '#4ECCA3',
    textColor: '#EEEEEE',
    secondaryColor: '#232931',
    linkColor: '#00FFF5',
    gradient: 'linear-gradient(135deg, #151515 0%, #232931 50%, #393E46 100%)'
},

{
    id: 'volcanic_fusion',
    name: 'Volcanic Fusion',
    backgroundColor: '#2D142C',
    accentColor: '#EE4540',
    textColor: '#EDF5E1',
    secondaryColor: '#510A32',
    linkColor: '#F16821',
    gradient: 'linear-gradient(135deg, #2D142C 0%, #510A32 50%, #801336 100%)'
},

{
    id: 'quantum_violet',
    name: 'Quantum Violet',
    backgroundColor: '#1A1A2E',
    accentColor: '#C874D9',
    textColor: '#E94560',
    secondaryColor: '#16213E',
    linkColor: '#A239EA',
    gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)'
},

{
    id: 'electric_jungle',
    name: 'Electric Jungle',
    backgroundColor: '#222629',
    accentColor: '#86C232',
    textColor: '#FFFFFF',
    secondaryColor: '#474B4F',
    linkColor: '#61892F',
    gradient: 'linear-gradient(135deg, #222629 0%, #474B4F 50%, #6B6E70 100%)'
},

{
    id: 'cosmic_latte',
    name: 'Cosmic Latte',
    backgroundColor: '#352F44',
    accentColor: '#FAF0E6',
    textColor: '#DBD8E3',
    secondaryColor: '#5C5470',
    linkColor: '#B9B4C7',
    gradient: 'linear-gradient(135deg, #352F44 0%, #5C5470 50%, #B9B4C7 100%)'
},

{
    id: 'retrowave',
    name: 'Retrowave',
    backgroundColor: '#2B1B2D',
    accentColor: '#FF38D1',
    textColor: '#00FECA',
    secondaryColor: '#411E8F',
    linkColor: '#FE4A49',
    gradient: 'linear-gradient(135deg, #2B1B2D 0%, #411E8F 50%, #A12568 100%)'
},

{
    id: 'frozen_ember',
    name: 'Frozen Ember',
    backgroundColor: '#2C3333',
    accentColor: '#FF5722',
    textColor: '#E7F6F2',
    secondaryColor: '#395B64',
    linkColor: '#A5C9CA',
    gradient: 'linear-gradient(135deg, #2C3333 0%, #395B64 50%, #A5C9CA 100%)'
},

{
    id: 'matrix_code',
    name: 'Matrix Code',
    backgroundColor: '#000000',
    accentColor: '#08F26E',
    textColor: '#22EAAA',
    secondaryColor: '#0D1B0E',
    linkColor: '#00FF41',
    gradient: 'linear-gradient(135deg, #000000 0%, #0D1B0E 50%, #1B392F 100%)'
},

{
    id: 'autumn_breeze',
    name: 'Autumn Breeze',
    backgroundColor: '#1F2833',
    accentColor: '#C5C6C7',
    textColor: '#FFCB9A',
    secondaryColor: '#45A29E',
    linkColor: '#66FCF1',
    gradient: 'linear-gradient(135deg, #1F2833 0%, #45A29E 50%, #66FCF1 100%)'
}
];
















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

// Helper function to generate complementary colors
const generateComplementaryColor = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Invert the colors
  const r2 = 255 - r;
  const g2 = 255 - g;
  const b2 = 255 - b;
  
  // Convert back to hex
  return `#${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}`;
};

// Helper to generate shades of a color
const generateShades = (hexColor, amount = 0.15) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Generate lighter shade
  const lighterR = Math.min(255, Math.round(r + (255 - r) * amount));
  const lighterG = Math.min(255, Math.round(g + (255 - g) * amount));
  const lighterB = Math.min(255, Math.round(b + (255 - b) * amount));
  
  // Generate darker shade
  const darkerR = Math.max(0, Math.round(r * (1 - amount)));
  const darkerG = Math.max(0, Math.round(g * (1 - amount)));
  const darkerB = Math.max(0, Math.round(b * (1 - amount)));
  
  // Convert back to hex
  const lighter = `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
  const darker = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  
  return { lighter, darker };
};

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  // Set isOpen to true by default so themes are always shown
  const [isOpen, setIsOpen] = useState(true);
  const [themeMode, setThemeMode] = useState('solid'); // 'solid' or 'gradient'
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || themeOptions[0]);
  const [activeTab, setActiveTab] = useState('presets'); // 'presets', 'custom', 'advanced'
  const [customThemes, setCustomThemes] = useState([]);
  const [isSaving, setSaving] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const selectorRef = useRef(null);

  useEffect(() => {
    // Load any saved custom themes from localStorage
    const savedThemes = localStorage.getItem('customThemes');
    if (savedThemes) {
      try {
        setCustomThemes(JSON.parse(savedThemes));
      } catch (e) {
        console.error('Failed to parse saved themes', e);
      }
    }
  }, []);

  useEffect(() => {
    // Update selected theme when currentTheme prop changes
    if (currentTheme) {
      setSelectedTheme({
        ...currentTheme,
        // Add linkColor if not present
        linkColor: currentTheme.linkColor || currentTheme.accentColor
      });
      
      // Determine if it's a gradient theme
      const isGradientTheme = currentTheme.gradient && 
        currentTheme.gradient.includes('linear-gradient');
      
      setThemeMode(isGradientTheme ? 'gradient' : 'solid');
    }
  }, [currentTheme]);

  useEffect(() => {
    // Click outside handler to close the selector - we can keep this for possible future use
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        // We can comment this out if we want the selector to always stay open
        // setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSelector = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeSelect = (theme) => {
    const updatedTheme = {
      ...theme,
      // Ensure all required properties exist
      linkColor: theme.linkColor || theme.accentColor
    };
    
    setSelectedTheme(updatedTheme);
    onThemeChange(updatedTheme);
    
    // Keep selector open if in advanced mode
    if (activeTab !== 'advanced') {
      // Don't close the selector when a theme is selected
      // setIsOpen(false);
    }
  };

  const switchThemeMode = (mode) => {
    setThemeMode(mode);
  };

  const updateThemeProperty = (property, value) => {
    // Create updated theme
    const updatedTheme = { 
      ...selectedTheme,
      [property]: value 
    };
    
    // If we're updating backgroundColor or accentColor, also update contrast-dependent colors
    if (property === 'backgroundColor') {
      updatedTheme.textColor = calculateContrastColor(value);
      // Create slightly different shade for secondary color
      updatedTheme.secondaryColor = generateShades(value).lighter;
    }
    
    if (property === 'accentColor' && !updatedTheme.linkColor) {
      // If linkColor doesn't exist yet, set it based on accent
      updatedTheme.linkColor = generateShades(value).darker;
    }
    
    setSelectedTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const generateComplementaryTheme = () => {
    const { backgroundColor, accentColor } = selectedTheme;
    const complementaryAccent = generateComplementaryColor(backgroundColor);
    const complementaryBackground = generateShades(accentColor).lighter;
    
    const updatedTheme = {
      ...selectedTheme,
      backgroundColor: complementaryBackground,
      accentColor: complementaryAccent,
      textColor: calculateContrastColor(complementaryBackground),
      secondaryColor: generateShades(complementaryBackground).lighter,
      linkColor: generateShades(complementaryAccent).darker
    };
    
    setSelectedTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const saveCustomTheme = () => {
    if (!newThemeName.trim()) {
      alert('Please enter a name for your theme');
      return;
    }
    
    const themeToSave = {
      ...selectedTheme,
      id: `custom-${Date.now()}`,
      name: newThemeName
    };
    
    const updatedThemes = [...customThemes, themeToSave];
    setCustomThemes(updatedThemes);
    
    // Save to localStorage
    localStorage.setItem('customThemes', JSON.stringify(updatedThemes));
    
    // Reset form
    setNewThemeName('');
    setSaving(false);
  };

  const deleteCustomTheme = (themeId) => {
    const updatedThemes = customThemes.filter(theme => theme.id !== themeId);
    setCustomThemes(updatedThemes);
    
    // Update localStorage
    localStorage.setItem('customThemes', JSON.stringify(updatedThemes));
  };

  // Get the right theme options based on the selected mode
  const activeThemes = themeMode === 'gradient' ? gradientThemes : themeOptions;

  return (
    <div className="theme-selector-container" ref={selectorRef}>
      {/* Theme toggle button - can keep this for possible future use */}
      <button 
        className="theme-toggle-button"
        onClick={toggleSelector}
        style={{ 
          backgroundColor: selectedTheme.backgroundColor,
          color: selectedTheme.accentColor,
          borderColor: selectedTheme.accentColor,
          display: 'none' // Hide the button since we always want to display themes
        }}
      >
        <Palette size={16} />
        <span>Theme</span>
      </button>
      
      {/* Always display the themes wrapper since isOpen is true by default */}
      <div className="theme-selector-wrapper">

        
        
        
        {/* Presets tab - always visible now */}
        <>
          <div className="theme-mode-toggle">
            <button
              className={`mode-button ${themeMode === 'solid' ? 'active' : ''}`}
              onClick={() => switchThemeMode('solid')}
            >
              <Sun size={16} /> Solid
            </button>
            <button
              className={`mode-button ${themeMode === 'gradient' ? 'active' : ''}`}
              onClick={() => switchThemeMode('gradient')}
            >
              <Palette size={16} /> Gradient
            </button>
          </div>
          
          <div className="theme-options">
            {activeThemes.map((theme) => (
              <div 
                key={theme.id}
                className={`theme-option ${selectedTheme.id === theme.id ? 'selected' : ''}`}
                onClick={() => handleThemeSelect(theme)}
              >
                <div 
                  className="theme-preview" 
                  style={{ 
                    background: theme.gradient || theme.backgroundColor,
                    borderColor: theme.accentColor
                  }}
                >
                  <div 
                    className="theme-accent-dot" 
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  {selectedTheme.id === theme.id && (
                    <div className="theme-selected-indicator">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <span className="theme-name">{theme.name}</span>
              </div>
            ))}
          </div>
        </>
        
        {/* Keep the remaining code for custom themes and advanced settings for future use */}
        {activeTab === 'custom' && (
          <div className="custom-themes-tab">
            {!isSaving ? (
              <>
                <div className="custom-themes-header">
                  <h4>Your Saved Themes</h4>
                  <button 
                    className="save-current-theme-button"
                    onClick={() => setSaving(true)}
                    style={{ backgroundColor: selectedTheme.accentColor }}
                  >
                    <Plus size={16} />
                    <span>Save Current</span>
                  </button>
                </div>
                
                {customThemes.length === 0 ? (
                  <div className="no-custom-themes">
                    <p>You haven't saved any custom themes yet.</p>
                    <p>Customize your theme in the Advanced tab and save it here!</p>
                  </div>
                ) : (
                  <div className="theme-options">
                    {customThemes.map((theme) => (
                      <div 
                        key={theme.id}
                        className={`theme-option custom ${selectedTheme.id === theme.id ? 'selected' : ''}`}
                      >
                        <div 
                          className="theme-preview" 
                          style={{ 
                            background: theme.gradient || theme.backgroundColor,
                            borderColor: theme.accentColor
                          }}
                          onClick={() => handleThemeSelect(theme)}
                        >
                          <div 
                            className="theme-accent-dot" 
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          {selectedTheme.id === theme.id && (
                            <div className="theme-selected-indicator">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                        <div className="custom-theme-controls">
                          <span className="theme-name">{theme.name}</span>
                          <button 
                            className="delete-theme-button"
                            onClick={() => deleteCustomTheme(theme.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="save-theme-form">
                <h4>Save Current Theme</h4>
                <div className="theme-preview-large" 
                  style={{ 
                    background: selectedTheme.gradient || selectedTheme.backgroundColor
                  }}
                >
                  <div className="preview-accent-element" style={{ backgroundColor: selectedTheme.accentColor }}></div>
                  <div className="preview-link-element" style={{ backgroundColor: selectedTheme.linkColor || selectedTheme.accentColor }}></div>
                  <div className="preview-text-sample" style={{ color: selectedTheme.textColor }}>Text Sample</div>
                </div>
                <div className="theme-name-input">
                  <label>Theme Name</label>
                  <input 
                    type="text" 
                    value={newThemeName}
                    onChange={(e) => setNewThemeName(e.target.value)}
                    placeholder="My Amazing Theme"
                  />
                </div>
                <div className="save-theme-buttons">
                  <button 
                    className="save-button"
                    onClick={saveCustomTheme}
                    style={{ backgroundColor: selectedTheme.accentColor }}
                  >
                    <Save size={16} />
                    <span>Save Theme</span>
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={() => setSaving(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'advanced' && (
          <div className="advanced-theme-editor">
            <div className="theme-preview-container">
              <div 
                className="theme-preview-large" 
                style={{ 
                  background: selectedTheme.gradient || selectedTheme.backgroundColor
                }}
              >
                <div className="preview-profile" style={{ borderColor: selectedTheme.accentColor }}></div>
                <div className="preview-header" style={{ color: selectedTheme.textColor }}>Preview</div>
                <div className="preview-link" style={{ backgroundColor: selectedTheme.secondaryColor, borderLeftColor: selectedTheme.linkColor }}>
                  <span style={{ color: selectedTheme.linkColor }}>Link</span>
                </div>
                <div className="preview-button" style={{ backgroundColor: selectedTheme.accentColor }}>
                  <span style={{ color: calculateContrastColor(selectedTheme.accentColor) }}>Button</span>
                </div>
              </div>
            </div>
            
            <div className="advanced-color-pickers">
              <div className="color-picker-group">
                <h4>Primary Colors</h4>
                <div className="color-pickers-row">
                  <div className="color-picker">
                    <label>Background</label>
                    <input
                      type="color"
                      value={selectedTheme.backgroundColor}
                      onChange={(e) => updateThemeProperty('backgroundColor', e.target.value)}
                    />
                    <span className="color-value">{selectedTheme.backgroundColor}</span>
                  </div>
                  <div className="color-picker">
                    <label>Accent</label>
                    <input
                      type="color"
                      value={selectedTheme.accentColor}
                      onChange={(e) => updateThemeProperty('accentColor', e.target.value)}
                    />
                    <span className="color-value">{selectedTheme.accentColor}</span>
                  </div>
                </div>
              </div>
              
              <div className="color-picker-group">
                <h4>Secondary Colors</h4>
                <div className="color-pickers-row">
                  <div className="color-picker">
                    <label>Text</label>
                    <input
                      type="color"
                      value={selectedTheme.textColor}
                      onChange={(e) => updateThemeProperty('textColor', e.target.value)}
                    />
                    <span className="color-value">{selectedTheme.textColor}</span>
                  </div>
                  <div className="color-picker">
                    <label>Background Accent</label>
                    <input
                      type="color"
                      value={selectedTheme.secondaryColor}
                      onChange={(e) => updateThemeProperty('secondaryColor', e.target.value)}
                    />
                    <span className="color-value">{selectedTheme.secondaryColor}</span>
                  </div>
                </div>
              </div>
              
              <div className="color-picker-group">
                <h4>Link Colors</h4>
                <div className="color-pickers-row">
                  <div className="color-picker">
                    <label>Link Color</label>
                    <input
                      type="color"
                      value={selectedTheme.linkColor || selectedTheme.accentColor}
                      onChange={(e) => updateThemeProperty('linkColor', e.target.value)}
                    />
                    <span className="color-value">{selectedTheme.linkColor || selectedTheme.accentColor}</span>
                  </div>
                </div>
              </div>
              
              {themeMode === 'gradient' && (
                <div className="gradient-editor">
                  <h4>Gradient</h4>
                  <p>For advanced gradient editing, use the preset gradients and customize individual colors.</p>
                </div>
              )}
              
              <div className="theme-actions">
                <button 
                  className="complement-button"
                  onClick={generateComplementaryTheme}
                >
                  <Palette size={16} />
                  <span>Generate Complementary</span>
                </button>
                
                <button 
                  className="save-button"
                  onClick={() => {
                    setActiveTab('custom');
                    setSaving(true);
                  }}
                  style={{ backgroundColor: selectedTheme.accentColor }}
                >
                  <Save size={16} />
                  <span>Save Theme</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;