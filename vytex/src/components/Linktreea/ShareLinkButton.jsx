import { useState, useEffect } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

const ShareLinkButton = ({ username, profileData, accentColor, textColor }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Generate link from username
  useEffect(() => {
    if (profileData) {
      // Use the username from profile data if available, otherwise format the name
      const linkUsername = profileData.username || 
        (profileData.name ? profileData.name.toLowerCase().replace(/\s+/g, '') : '');
      setGeneratedLink(`https://www.linktreea.${linkUsername}`);
    }
  }, [profileData]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.name}'s Linktree`,
        url: generatedLink
      }).catch(err => console.error('Error sharing:', err));
    } else {
      copyToClipboard();
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full px-4 mt-6 mb-4">
      <button 
        onClick={toggleExpand}
        className="flex items-center justify-center gap-2 px-4 py-2 mb-3 text-sm font-medium rounded-full shadow-md transition-all duration-300 ease-in-out"
        style={{ backgroundColor: accentColor, color: 'white' }}
      >
        <Share2 size={16} />
        <span>Share Your Profile</span>
      </button>
      
      {isExpanded && (
        <div className="w-full max-w-xs animate-fadeIn">
          <div className="flex overflow-hidden border-2 rounded-lg shadow-md bg-white bg-opacity-15 backdrop-blur-md"
               style={{ borderColor: accentColor }}>
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 px-3 py-2 text-sm bg-transparent border-none outline-none"
              style={{ color: textColor }}
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-all duration-200"
              style={{ backgroundColor: accentColor }}
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <p className="mt-2 text-xs opacity-80 text-center">
            Share this link on your social media bio
          </p>
        </div>
      )}
    </div>
  );
};

export default ShareLinkButton;