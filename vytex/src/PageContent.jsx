import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Link2, MessageSquare, ShoppingBag, TrendingUp, Users, Users2, Wallet, Settings, Moon, Sun, BarChart2, Camera, Award, Globe, Calendar, FileText, Gift, HelpCircle, Slack, Zap, Compass, Hash, Target, Database, Send, Shield, VideoIcon } from 'lucide-react';
import './PageContext.css'

// Import all pages
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import MyBioLink from './pages/MyBioLink'
import MediaLibrary from './pages/MediaLibrary'
import Documents from './pages/Documents'
import VideoStudio from './pages/VideoStudio'
import ChatbotsCRM from './pages/Chatbots'
import Campaigns from './pages/Campaigns'
import CommunityHub from './pages/CommunityHub'
import Events from './pages/Events'
import Rewards from './pages/Rewards'
import Storefront from './pages/Storefront'
import NftWallet from './pages/NftWallet'
import Subscriptions from './pages/Subscriptions'
import TrendExplorer from './pages/TrendExplorer'
import AudienceInsights from './pages/AudienceInsights'
import SEOTools from './pages/SEOTools'
import SocialPerformance from './pages/SocialPerformance'
import Collaboration from './pages/Collaboration'
import Workspaces from './pages/Workspaces'
import Certification from './pages/Certification'
import Integrations from './pages/Integrations'
import SettingsPage from './pages/SettingsPage'
import Security from './pages/Security'
import HelpSupport from './pages/HelpSupport'

// Import all subpages
import Welcome from './pages/subpages/Welcome';
import Overview from './pages/subpages/Overview';
import RealTime from './pages/subpages/RealTime';
import Themes from './pages/subpages/Themes';
import Images from './pages/subpages/Images';
import Templates from './pages/subpages/Templates';
import Editor from './pages/subpages/Editor';
import Conversations from './pages/subpages/Conversations';
import Email from './pages/subpages/Email';
import Forums from './pages/subpages/Forums';
import Upcoming from './pages/subpages/Upcoming';
import CalendarPage from './pages/subpages/CalendarPage';
import Registrations from './pages/subpages/Registrations';
import Programs from './pages/subpages/Programs';
import Points from './pages/subpages/Points';
import Products from './pages/subpages/Products';
import Collections from './pages/subpages/Collections';
import Plans from './pages/subpages/Plans';
import Discover from './pages/subpages/Discover';
import Demographics from './pages/subpages/Demographics';
import Keywords from './pages/subpages/Keywords';
import Metrics from './pages/subpages/Metrics';
import Teams from './pages/subpages/Teams';
import Shared from './pages/subpages/Shared';
import Courses from './pages/subpages/Courses';
import Apps from './pages/subpages/Apps';
import Account from './pages/subpages/Account';
import Permissions from './pages/subpages/Permissions';
import ApiKey from './pages/subpages/ApiKey';
import Documentation from './pages/subpages/Documentation';
import QuickStart from './pages/subpages/QuickStart';
import RecentActivity from './pages/subpages/RecentActivity';
import Performance from './pages/subpages/Performance';

// Import ProductsTab component


import ProductsTab from './components/Linktreea/Tabs/ProductsTab';
import ProfileTab from './components/Linktreea/Tabs/ProfileTab';
import SocialTab from './components/Linktreea/Tabs/SocialTab';
import ProfileSection from './components/Linktreea/ProfileSection';



// Navigation items export
export const navItems = [
  // Main Section
  { 
    section: 'MAIN',
    items: [
      { 
        id: 'home', 
        label: 'Home', 
        icon: <Home size={20} />,
        subNavItems: [
          { id: 'welcome', label: 'Welcome' },
          { id: 'quickStart', label: 'Quick Start' },
          { id: 'recentActivity', label: 'Recent Activity' }
        ]
      },
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: <LayoutDashboard size={20} />,
        subNavItems: [
          { id: 'overview', label: 'Overview' },
          { id: 'performance', label: 'Performance' },
          { id: 'statistics', label: 'Statistics' },
          { id: 'reports', label: 'Reports' },
        ]
      },
      { 
        id: 'analytics', 
        label: 'Analytics', 
        icon: <BarChart2 size={20} />,
        subNavItems: [
          { id: 'realTime', label: 'Real-time' }
        ]
      }
    ]
  },







  // Content Section
  {
    section: 'CONTENT',
    items: [
      { 
        id: 'mybiolink', 
        label: 'MyBioLink', 
        icon: <Link2 size={20} />,
        subNavItems: [
          { id: 'theme', label: 'Theme' }
        ]
      },





      { 
        id: 'mediaLibrary', 
        label: 'Media Library', 
        icon: <Camera size={20} />,
        subNavItems: [
          { id: 'images', label: 'Images' }
        ]
      },
      { 
        id: 'documents', 
        label: 'Documents', 
        icon: <FileText size={20} />,
        subNavItems: [
          { id: 'templates', label: 'Templates' }
        ]
      },
      { 
        id: 'videoStudio', 
        label: 'Video Studio', 
        icon: <VideoIcon size={20} />,
        subNavItems: [
          { id: 'editor', label: 'Editor' }
        ]
      }
    ]
  },
  // Engagement Section
  {
    section: 'ENGAGEMENT',
    items: [
      { 
        id: 'chatbots', 
        label: 'Chatbots & CRM', 
        icon: <MessageSquare size={20} />,
        subNavItems: [
          { id: 'conversations', label: 'Conversations' }
        ]
      },
      { 
        id: 'campaigns', 
        label: 'Campaigns', 
        icon: <Send size={20} />,
        subNavItems: [
          { id: 'email', label: 'Email' }
        ]
      },
      { 
        id: 'communityHub', 
        label: 'Community Hub', 
        icon: <Users2 size={20} />,
        subNavItems: [
          { id: 'forums', label: 'Forums' }
        ]
      },
      { 
        id: 'events', 
        label: 'Events', 
        icon: <Calendar size={20} />,
        subNavItems: [
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'calendar', label: 'Calendar' },
          { id: 'registrations', label: 'Registrations' }
        ]
      },
      { 
        id: 'rewards', 
        label: 'Rewards', 
        icon: <Gift size={20} />,
        subNavItems: [
          { id: 'programs', label: 'Programs' },
          { id: 'points', label: 'Points' }
        ]
      }
    ]
  },
  // Commerce Section
  {
    section: 'COMMERCE',
    items: [
      { 
        id: 'storefront', 
        label: 'Storefront', 
        icon: <ShoppingBag size={20} />,
        subNavItems: [
          { id: 'products', label: 'Products' }
        ]
      },
      { 
        id: 'nftWallet', 
        label: 'NFT & Wallet', 
        icon: <Wallet size={20} />,
        subNavItems: [
          { id: 'collections', label: 'Collections' }
        ]
      },
      { 
        id: 'subscriptions', 
        label: 'Subscriptions', 
        icon: <Zap size={20} />,
        subNavItems: [
          { id: 'plans', label: 'Plans' },
        ]
      }
    ]
  },
  // Growth Section
  {
    section: 'GROWTH',
    items: [
      { 
        id: 'trendExplorer', 
        label: 'Trend Explorer', 
        icon: <TrendingUp size={20} />,
        subNavItems: [
          { id: 'discover', label: 'Discover' },
        ]
      },
      { 
        id: 'audienceInsights', 
        label: 'Audience Insights', 
        icon: <Target size={20} />,
        subNavItems: [
          { id: 'demographics', label: 'Demographics' }
        ]
      },
      { 
        id: 'seoTools', 
        label: 'SEO Tools', 
        icon: <Compass size={20} />,
        subNavItems: [
          { id: 'keywords', label: 'Keywords' }
        ]
      },
      { 
        id: 'socialPerformance', 
        label: 'Social Performance', 
        icon: <Hash size={20} />,
        subNavItems: [
          { id: 'metrics', label: 'Metrics' }
        ]
      }
    ]
  },
  // Team Section
  {
    section: 'TEAM',
    items: [
      { 
        id: 'collaboration', 
        label: 'Collaboration', 
        icon: <Users size={20} />,
        subNavItems: [
          { id: 'teams', label: 'Teams' }
        ]
      },
      { 
        id: 'workspaces', 
        label: 'Workspaces', 
        icon: <Slack size={20} />,
        subNavItems: [
          { id: 'shared', label: 'Shared' }
        ]
      },
      { 
        id: 'certification', 
        label: 'Certification', 
        icon: <Award size={20} />,
        subNavItems: [
          { id: 'courses', label: 'Courses' }
        ]
      }
    ]
  },
  // System Section
  {
    section: 'SYSTEM',
    items: [
      { 
        id: 'integrations', 
        label: 'Integrations', 
        icon: <Database size={20} />,
        subNavItems: [
          { id: 'apps', label: 'Apps' },
        ]
      },
      { 
        id: 'settings', 
        label: 'Settings', 
        icon: <Settings size={20} />,
        subNavItems: [
          { id: 'account', label: 'Account' },
        ]
      },
      { 
        id: 'security', 
        label: 'Security', 
        icon: <Shield size={20} />,
        subNavItems: [
          { id: 'permissions', label: 'Permissions' },
          { id: 'apiKeys', label: 'API Keys' },
        ]
      },
      { 
        id: 'help', 
        label: 'Help & Support', 
        icon: <HelpCircle size={20} />,
        subNavItems: [
          { id: 'documentation', label: 'Documentation' }
        ]
      }
    ]
  }
];

// Find page data helper function
export const findPageData = (pageId, subPageId) => {
  for (const section of navItems) {
    for (const item of section.items) {
      if (item.id === pageId) {
        let subPageData = null;
        if (subPageId) {
          subPageData = item.subNavItems.find(subItem => 
            subItem.id.toLowerCase() === subPageId.toLowerCase()
          );
        }
        return {
          pageData: item,
          subPageData
        };
      }
    }
  }
  return { pageData: null, subPageData: null };
};

// Component mapping for pages
const pageComponentMap = {
  'home': HomePage,
  'dashboard': Dashboard,
  'analytics': Analytics,
  'mybiolink': MyBioLink,
  'mediaLibrary': MediaLibrary,
  'documents': Documents,
  'videoStudio': VideoStudio,
  'chatbots': ChatbotsCRM,
  'campaigns': Campaigns,
  'communityHub': CommunityHub,
  'events': Events,
  'rewards': Rewards,
  'storefront': Storefront,
  'nftWallet': NftWallet,
  'subscriptions': Subscriptions,
  'trendExplorer': TrendExplorer,
  'audienceInsights': AudienceInsights,
  'seoTools': SEOTools,
  'socialPerformance': SocialPerformance,
  'collaboration': Collaboration,
  'workspaces': Workspaces,
  'certification': Certification,
  'integrations': Integrations,
  'settings': SettingsPage,
  'security': Security,
  'help': HelpSupport
};

// Component mapping for subpages - CASE INSENSITIVE LOOKUP
const subPageComponentMap = {
  'welcome': Welcome,
  'overview': Overview,
  'realtime': RealTime,
  'themes': Themes, 
  'images': Images,
  'templates': Templates,
  'editor': Editor,
  'conversations': Conversations,
  'email': Email,
  'forums': Forums,
  'upcoming': Upcoming,
  'calendar': CalendarPage,
  'registrations': Registrations,
  'programs': Programs,
  'points': Points,
  'products': Products,
  'collections': Collections,
  'plans': Plans,
  'discover': Discover,
  'demographics': Demographics,
  'keywords': Keywords,
  'metrics': Metrics,
  'teams': Teams,
  'shared': Shared,
  'courses': Courses,
  'apps': Apps,
  'account': Account,
  'permissions': Permissions,
  'apikeys': ApiKey,
  'documentation': Documentation,
  'quickstart': QuickStart,
  'recentactivity': RecentActivity,
  'performance': Performance,
  'theme': Themes,
};

// Error page component
const NotFoundPage = () => {
  return (
    <div className="app-main-container">
      <h1 className="app-not-found-title">404 - Page Not Found</h1>
      <p className="app-paragraph">The page you are looking for does not exist.</p>
    </div>
  );
};

// Navigation component for sidebar with active state
const SideNavigation = () => {
  const navigate = useNavigate();
  const { pageId, subPageId } = useParams();
  
  const handleNavigation = (navPageId, navSubPageId) => {
    navigate(`/${navPageId}/${navSubPageId}`);
  };
  
  return (
    <div className="app-sidebar">
      {navItems.map((section) => (
        <div key={section.section} className="app-sidebar-section">
          <h3 className="app-sidebar-section-title">{section.section}</h3>
          <ul className="app-sidebar-list">
            {section.items.map((item) => (
              <li key={item.id} className="app-sidebar-item">
                <button
                  className={`app-sidebar-button ${
                    pageId === item.id ? 'app-sidebar-button-active' : ''
                  }`}
                  onClick={() => handleNavigation(item.id, item.subNavItems[0].id)}
                >
                  <span className="app-sidebar-icon">{item.icon}</span>
                  {item.label}
                </button>
                
                {pageId === item.id && (
                  <ul className="app-sidebar-sublist">
                    {item.subNavItems.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          className={`app-sidebar-subbutton ${
                            subPageId === subItem.id ? 'app-sidebar-subbutton-active' : ''
                          }`}
                          onClick={() => handleNavigation(item.id, subItem.id)}
                        >
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Main content router component
function ContentRouter() {
  const { pageId = 'dashboard', subPageId = 'overview' } = useParams();
  const { pageData, subPageData } = findPageData(pageId, subPageId);
  
  if (!pageData) {
    return <NotFoundPage />;
  }

  // Get the appropriate page component
  const PageComponent = pageComponentMap[pageId];
  
  // Get subpage component - CASE INSENSITIVE LOOKUP
  const SubPageComponent = subPageComponentMap[subPageId.toLowerCase()];

  // If both components exist, render the page with subpage content
  if (PageComponent && SubPageComponent) {
    return (
      <PageComponent>
        <SubPageComponent />
      </PageComponent>
    );
  }
  
  // If only the page component exists
  if (PageComponent) {
    return <PageComponent />;
  }
  
  // Fallback for pages that don't have a specific component
  return (
    <div className="app-main-container">
      <h1 className="app-page-title">{pageData.label} - {subPageData?.label || 'Overview'}</h1>
      <p className="app-paragraph">Content for {pageData.label} / {subPageData?.label || 'Overview'} section.</p>
    </div>
  );
}

// Main PageContent component that's exported and used in App.jsx
function PageContent() {
  const navigate = useNavigate();
  const { pageId, subPageId } = useParams();

  // Redirect to default routes if needed
  React.useEffect(() => {
    if (!pageId && !subPageId) {
      navigate('/home/welcome');
    } else if (pageId && !subPageId) {
      const section = navItems.find(section => 
        section.items.some(item => item.id === pageId)
      );
      
      if (section) {
        const item = section.items.find(item => item.id === pageId);
        if (item && item.subNavItems.length > 0) {
          navigate(`/${pageId}/${item.subNavItems[0].id}`);
        }
      }
    }
  }, [pageId, subPageId, navigate]);

  return (
    <div className="app-render-content">
      <div className="app-main-container">
        <ContentRouter />
      </div>
    </div>
  );
}

export default PageContent;