import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './SocialLink.css';

// Importing SVG icons
import instagram from './icons/instagram.svg';
import youtube from './icons/youtube.svg';
import linkedin from './icons/linkedin.svg';
import twitter from './icons/twiter.svg';
import website from './icons/website.svg';
import facebook from './icons/facebook.svg';
import spotify from './icons/spotify.svg';

const SocialLink = ({ 
  id, 
  index, 
  platform, 
  url, 
  isDraggable, 
  moveSocialLink,
  // Theme properties
  accentColor = '#3b82f6',
  textColor = '#333333',
  backgroundColor = '#ffffff',
  secondaryColor = '#f5f5f5'
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'social-link',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveSocialLink(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'social-link',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable,
  });

  drag(drop(ref));

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <img src={instagram} alt="Instagram" className="platform-icon-svg" />;
      case 'youtube':
        return <img src={youtube} alt="YouTube" className="platform-icon-svg" />;
      case 'twitter':
      case 'x':
        return <img src={twitter} alt="Twitter" className="platform-icon-svg" />;
      case 'facebook':
        return <img src={facebook} alt="Facebook" className="platform-icon-svg" />;
      case 'linkedin':
        return <img src={linkedin} alt="LinkedIn" className="platform-icon-svg" />;
      case 'spotify':
        return <img src={spotify} alt="Spotify" className="platform-icon-svg" />;
      case 'website':
        return <img src={website} alt="Website" className="platform-icon-svg" />;
      default:
        return '🔗';
    }
  };

  // Dynamic styles based on theme properties
  const linkStyle = {
    backgroundColor: isDraggable ? `${backgroundColor}` : secondaryColor,
    color: textColor,
    border: `1px solid ${accentColor}40`,
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.1)`,
    transition: 'all 0.3s ease'
  };

  const hoverStyles = {
    '--hover-bg': isDraggable ? `${secondaryColor}` : `${accentColor}15`,
    '--hover-border': `${accentColor}`
  };

  const draggingStyles = isDragging ? {
    opacity: 0.85,
    backgroundColor: `${accentColor}30`,
    transform: 'scale(1.02)',
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)`,
    border: `2px solid ${accentColor}`
  } : {};

  return (
    <div
      ref={ref}
      className={`social-link ${isDraggable ? 'draggable' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => (isDraggable ? null : window.open(url, '_blank'))}
      style={{
        ...linkStyle,
        ...hoverStyles,
        ...draggingStyles,
        cursor: isDraggable ? 'grab' : 'pointer'
      }}
    >
      <div className="social-link-content">
        <div className="platform-icon" style={{ color: accentColor }}>
          {getPlatformIcon(platform)}
        </div>
        <span className="platform-name" style={{ 
          color: textColor,
          fontWeight: '500'
        }}>
          {platform}
        </span>
      </div>
      {isDraggable && (
        <button 
          className="more-options-btn"
          style={{ 
            color: textColor,
            backgroundColor: 'transparent'
          }}
        >
          ⋯
        </button>
      )}
    </div>
  );
};

export default SocialLink;