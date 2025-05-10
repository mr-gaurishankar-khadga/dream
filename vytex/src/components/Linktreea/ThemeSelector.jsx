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
  {
    id: 'theme7',
    name: 'Coral Pink',
    backgroundColor: '#fff0f5',
    accentColor: '#ff4081',
    textColor: '#3a2d33',
    secondaryColor: '#ffe0eb',
    linkColor: '#e91e63',
    gradient: 'linear-gradient(135deg, #fff0f5 0%, #ffb6c9 100%)'
  },
  {
    id: 'theme8',
    name: 'Teal Breeze',
    backgroundColor: '#f0ffff',
    accentColor: '#009688',
    textColor: '#263a38',
    secondaryColor: '#e0f2f1',
    linkColor: '#00796b',
    gradient: 'linear-gradient(135deg, #f0ffff 0%, #b2dfdb 100%)'
  },
  
  // Additional 30 solid themes
  {
    id: 'theme9',
    name: 'Lavender Dreams',
    backgroundColor: '#f5f3ff',
    accentColor: '#8a4fff',
    textColor: '#2e2a3d',
    secondaryColor: '#e9e4ff',
    linkColor: '#7038e0',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #dfd8ff 100%)'
  },
  {
    id: 'theme10',
    name: 'Forest Green',
    backgroundColor: '#f2f7f2',
    accentColor: '#2e7d32',
    textColor: '#2c3b2d',
    secondaryColor: '#e0eee0',
    linkColor: '#1b5e20',
    gradient: 'linear-gradient(135deg, #f2f7f2 0%, #c8e6c9 100%)'
  },
  {
    id: 'theme11',
    name: 'Coffee Cream',
    backgroundColor: '#f8f5f0',
    accentColor: '#795548',
    textColor: '#3e2723',
    secondaryColor: '#eee5db',
    linkColor: '#5d4037',
    gradient: 'linear-gradient(135deg, #f8f5f0 0%, #e0d2c7 100%)'
  },
  {
    id: 'theme12',
    name: 'Slate Gray',
    backgroundColor: '#f5f7fa',
    accentColor: '#607d8b',
    textColor: '#263238',
    secondaryColor: '#eceff1',
    linkColor: '#455a64',
    gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfd9 100%)'
  },
  {
    id: 'theme13',
    name: 'Cherry Blossom',
    backgroundColor: '#fff9fb',
    accentColor: '#f06292',
    textColor: '#4a2c36',
    secondaryColor: '#fce4ec',
    linkColor: '#ec407a',
    gradient: 'linear-gradient(135deg, #fff9fb 0%, #f8bbd0 100%)'
  },
  {
    id: 'theme14',
    name: 'Sky Blue',
    backgroundColor: '#f7fbff',
    accentColor: '#03a9f4',
    textColor: '#01579b',
    secondaryColor: '#e1f5fe',
    linkColor: '#0288d1',
    gradient: 'linear-gradient(135deg, #f7fbff 0%, #bbdefb 100%)'
  },
  {
    id: 'theme15',
    name: 'Amber Glow',
    backgroundColor: '#fffbf0',
    accentColor: '#ffab00',
    textColor: '#3e2f00',
    secondaryColor: '#fff8e1',
    linkColor: '#ff8f00',
    gradient: 'linear-gradient(135deg, #fffbf0 0%, #ffe082 100%)'
  },
  {
    id: 'theme16',
    name: 'Dark Charcoal',
    backgroundColor: '#2d3436',
    accentColor: '#00e676',
    textColor: '#eceff1',
    secondaryColor: '#37474f',
    linkColor: '#69f0ae',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #37474f 100%)'
  },
  {
    id: 'theme17',
    name: 'Rose Gold',
    backgroundColor: '#fff7f7',
    accentColor: '#f48fb1',
    textColor: '#4a3f3f',
    secondaryColor: '#fce4ec',
    linkColor: '#ec407a',
    gradient: 'linear-gradient(135deg, #fff7f7 0%, #f8bbd0 100%)'
  },
  {
    id: 'theme18',
    name: 'Indigo Night',
    backgroundColor: '#e8eaf6',
    accentColor: '#3f51b5',
    textColor: '#1a237e',
    secondaryColor: '#c5cae9',
    linkColor: '#303f9f',
    gradient: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)'
  },
  {
    id: 'theme19',
    name: 'Lime Fresh',
    backgroundColor: '#f9fbe7',
    accentColor: '#cddc39',
    textColor: '#33691e',
    secondaryColor: '#f0f4c3',
    linkColor: '#afb42b',
    gradient: 'linear-gradient(135deg, #f9fbe7 0%, #dce775 100%)'
  },
  {
    id: 'theme20',
    name: 'Deep Sea',
    backgroundColor: '#e0f7fa',
    accentColor: '#00acc1',
    textColor: '#006064',
    secondaryColor: '#b2ebf2',
    linkColor: '#0097a7',
    gradient: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)'
  },
  {
    id: 'theme21',
    name: 'Ruby Red',
    backgroundColor: '#ffebee',
    accentColor: '#e53935',
    textColor: '#b71c1c',
    secondaryColor: '#ffcdd2',
    linkColor: '#c62828',
    gradient: 'linear-gradient(135deg, #ffebee 0%, #ef9a9a 100%)'
  },
  {
    id: 'theme22',
    name: 'Dark Mode',
    backgroundColor: '#121212',
    accentColor: '#bb86fc',
    textColor: '#e6e6e6',
    secondaryColor: '#1e1e1e',
    linkColor: '#03dac6',
    gradient: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)'
  },
  {
    id: 'theme23',
    name: 'Sunrise Yellow',
    backgroundColor: '#fffde7',
    accentColor: '#fdd835',
    textColor: '#f57f17',
    secondaryColor: '#fff9c4',
    linkColor: '#fbc02d',
    gradient: 'linear-gradient(135deg, #fffde7 0%, #fff59d 100%)'
  },
  {
    id: 'theme24',
    name: 'Soft Cyan',
    backgroundColor: '#e0f7fa',
    accentColor: '#26c6da',
    textColor: '#006064',
    secondaryColor: '#b2ebf2',
    linkColor: '#00acc1',
    gradient: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)'
  },
  {
    id: 'theme25',
    name: 'Emerald Green',
    backgroundColor: '#e8f5e9',
    accentColor: '#43a047',
    textColor: '#1b5e20',
    secondaryColor: '#c8e6c9',
    linkColor: '#2e7d32',
    gradient: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)'
  },
  {
    id: 'theme26',
    name: 'Burgundy',
    backgroundColor: '#f3e5f5',
    accentColor: '#8e24aa',
    textColor: '#4a148c',
    secondaryColor: '#e1bee7',
    linkColor: '#7b1fa2',
    gradient: 'linear-gradient(135deg, #f3e5f5 0%, #ce93d8 100%)'
  },
  {
    id: 'theme27',
    name: 'Aero Blue',
    backgroundColor: '#e1f5fe',
    accentColor: '#29b6f6',
    textColor: '#01579b',
    secondaryColor: '#b3e5fc',
    linkColor: '#0288d1',
    gradient: 'linear-gradient(135deg, #e1f5fe 0%, #81d4fa 100%)'
  },
  {
    id: 'theme28',
    name: 'Terracotta',
    backgroundColor: '#fbe9e7',
    accentColor: '#ff5722',
    textColor: '#bf360c',
    secondaryColor: '#ffccbc',
    linkColor: '#e64a19',
    gradient: 'linear-gradient(135deg, #fbe9e7 0%, #ffab91 100%)'
  },
  {
    id: 'theme29',
    name: 'Light Sage',
    backgroundColor: '#f1f8e9',
    accentColor: '#7cb342',
    textColor: '#33691e',
    secondaryColor: '#dcedc8',
    linkColor: '#558b2f',
    gradient: 'linear-gradient(135deg, #f1f8e9 0%, #c5e1a5 100%)'
  },
  {
    id: 'theme30',
    name: 'Gunmetal',
    backgroundColor: '#263238',
    accentColor: '#90a4ae',
    textColor: '#eceff1',
    secondaryColor: '#37474f',
    linkColor: '#b0bec5',
    gradient: 'linear-gradient(135deg, #263238 0%, #37474f 100%)'
  },
  {
    id: 'theme31',
    name: 'Peach Cream',
    backgroundColor: '#fff3e0',
    accentColor: '#ffb74d',
    textColor: '#e65100',
    secondaryColor: '#ffe0b2',
    linkColor: '#ff9800',
    gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)'
  },
  {
    id: 'theme32',
    name: 'Steel Blue',
    backgroundColor: '#e3f2fd',
    accentColor: '#1976d2',
    textColor: '#0d47a1',
    secondaryColor: '#bbdefb',
    linkColor: '#1565c0',
    gradient: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)'
  },
  {
    id: 'theme33',
    name: 'Matcha Green',
    backgroundColor: '#e8f5e9',
    accentColor: '#66bb6a',
    textColor: '#1b5e20',
    secondaryColor: '#c8e6c9',
    linkColor: '#43a047',
    gradient: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)'
  },
  {
    id: 'theme34',
    name: 'Dusty Rose',
    backgroundColor: '#fce4ec',
    accentColor: '#ec407a',
    textColor: '#880e4f',
    secondaryColor: '#f8bbd0',
    linkColor: '#d81b60',
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)'
  },
  {
    id: 'theme35',
    name: 'Whiskey Brown',
    backgroundColor: '#efebe9',
    accentColor: '#8d6e63',
    textColor: '#3e2723',
    secondaryColor: '#d7ccc8',
    linkColor: '#6d4c41',
    gradient: 'linear-gradient(135deg, #efebe9 0%, #bcaaa4 100%)'
  },
  {
    id: 'theme36',
    name: 'Ice Blue',
    backgroundColor: '#e8f1f8',
    accentColor: '#4fc3f7',
    textColor: '#01579b',
    secondaryColor: '#b3e5fc',
    linkColor: '#039be5',
    gradient: 'linear-gradient(135deg, #e8f1f8 0%, #81d4fa 100%)'
  },
  {
    id: 'theme37',
    name: 'Olive Green',
    backgroundColor: '#f9fbe7',
    accentColor: '#9e9d24',
    textColor: '#3e2723',
    secondaryColor: '#f0f4c3',
    linkColor: '#827717',
    gradient: 'linear-gradient(135deg, #f9fbe7 0%, #e6ee9c 100%)'
  },
  {
    id: 'theme38',
    name: 'Plum Purple',
    backgroundColor: '#f3e5f5',
    accentColor: '#ab47bc',
    textColor: '#4a148c',
    secondaryColor: '#e1bee7',
    linkColor: '#8e24aa',
    gradient: 'linear-gradient(135deg, #f3e5f5 0%, #ce93d8 100%)'
  }
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