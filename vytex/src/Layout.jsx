import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, Moon, Sun, User, LogOut, DollarSign, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from './PageContent';

import defaultAvatar from './images/avatar.png'; 

import './Layout.css'
import './Sidebar.css'
import './Base.css'

function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  
  // User data state (dynamic)
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: 'loading...',
    username: 'loading',
    profileImage: defaultAvatar
  });
  
  // Loading state for profile data
  const [isLoading, setIsLoading] = useState(true);

  // Static user earnings data (kept static as per the original)
  const userEarnings = {
    amount: 1247.50,
    currency: 'USD',
    trend: 'up',
    percentage: 12.3
  };

  const getActiveFromPath = () => {
    const path = location.pathname.substring(1) || 'home';
    const parts = path.split('/');
    return {
      activePage: parts[0] || 'home',
      activeSubPage: parts[1] || 'welcome'
    };
  };

  const { activePage, activeSubPage } = getActiveFromPath();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Fetch user profile
        const response = await fetch('http://localhost:5000/api/profile/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();
        
        // Update user data state with profile data
        setUserData({
          name: profileData.name || 'User',
          email: JSON.parse(localStorage.getItem('user'))?.email || 'No email',
          username: profileData.username,
          // Use the profileImage URL from the server, or fallback to default
          profileImage: profileData.profileImage ? 
            `http://localhost:5000${profileData.profileImage}` : 
            defaultAvatar
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        
        // If there's an error, try to get basic info from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUserData({
            name: storedUser.username || 'User',
            email: storedUser.email || 'No email',
            username: storedUser.username || 'user',
            profileImage: defaultAvatar
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Check for user preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    setDarkMode(savedMode === 'true' || (savedMode === null && prefersDark));
    
    // Check if mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Close profile drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDrawerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleProfileDrawer = () => {
    setProfileDrawerOpen(!profileDrawerOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page (window.location to force full reload)
    window.location.href = '/login';
  };
  
  // Find active page data
  const findActivePage = () => {
    for (const section of navItems) {
      for (const item of section.items) {
        if (item.id === activePage) {
          return item;
        }
      }
    }
    return null;
  };
  
  const activePageData = findActivePage();

  // Focus the search input when entering search mode
  useEffect(() => {
    if (searchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchFocused]);

  // Handle search focus
  const handleSearchFocus = (e) => {
    if (window.innerWidth <= 768) {
      const searchContainer = e.target.closest('.search-container');
      searchContainer.classList.add('expanded');
      document.body.style.overflow = 'hidden';
    }
    setSearchFocused(true);
  };

  // Handle search blur
  const handleSearchBlur = (e) => {
    if (window.innerWidth <= 768) {
      const searchContainer = e.target.closest('.search-container');
      searchContainer.classList.remove('expanded');
      document.body.style.overflow = '';
    }
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (searchQuery.trim() === '') {
        setSearchFocused(false);
      }
    }
  };

  // Handle search close
  const handleSearchClose = () => {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
      searchContainer.classList.remove('expanded');
      document.body.style.overflow = '';
      setSearchFocused(false);
      setSearchQuery('');
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'} ${searchFocused && isMobile ? 'search-active-mobile' : ''}`}>
      {/* Mobile menu toggle button - Hide when search is active on mobile */}
      {!(searchFocused && isMobile) && (
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      )}

      {/* Sidebar - Hide when search is active on mobile */}
      {!(searchFocused && isMobile) && (
        <aside 
          className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
        >
          <div className="sidebar-header">
            <button 
              className="menu-toggle"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            {/* Only show logo in sidebar when it's expanded */}
            {!sidebarCollapsed && (
              <div className="logo sidebar-logo">Creator</div>
            )}
          </div>

          <nav className="nav-menu">
            {navItems.map((section, index) => (
              <div key={index} className="nav-section">
                {!sidebarCollapsed && <div className="section-title">{section.section}</div>}
                {section.items.map(item => (
                  <Link
                    key={item.id}
                    to={`/${item.id}/${item.subNavItems[0].id}`}
                    className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* Main wrapper for top navbar and content */}
      <div className="main-wrapper">
        {/* Top Bar - Fixed position */}
        <header className="top-bar">
          {/* Show logo in top bar only when sidebar is collapsed */}
          {sidebarCollapsed && !(searchFocused && isMobile) && (
            <div className="logo topbar-logo">Creator</div>
          )}
          
          <div 
            className={`search-container ${sidebarCollapsed ? 'search-shifted' : ''}`}
            onClick={(e) => {
              if (e.target.classList.contains('search-container')) {
                handleSearchClose();
              }
            }}
          >
            <Search size={18} />
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder={isMobile ? "Search for anything..." : "Search..."}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Top bar actions - Hide when search is active on mobile */}
          {!(searchFocused && isMobile) && (
            <div className="top-bar-actions">
              {/* New Earnings Badge */}
              <div className="earnings-badge">
                <DollarSign size={17} />
                <div className="earnings-details">
                  <span className="earnings-amount">${userEarnings.amount.toLocaleString()}</span>
                  <div className="earnings-trend">
                    <TrendingUp size={14} />
                    <span>{userEarnings.percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="notifications">
                <button className="notification-btn">
                  <Bell size={25} />
                  <span className="notification-badge">3</span>
                </button>
              </div>
              
              <div className="user-profile" ref={profileRef}>
                <button className="avatar" onClick={toggleProfileDrawer}>
                  {isLoading ? (
                    <div className="avatar-loading"></div>
                  ) : (
                    <img 
                      src={userData.profileImage} 
                      alt="User Avatar"
                      onError={(e) => {
                        // Fallback to default avatar if image fails to load
                        e.target.src = defaultAvatar;
                      }}
                    />
                  )}
                </button>
                
                {/* Profile Drawer */}
                {profileDrawerOpen && (
                  <div className="profile-drawer">
                    <div className="profile-drawer-header">
                      <div className="profile-info">
                        <img 
                          src={userData.profileImage} 
                          alt="User Avatar" 
                          className="profile-avatar"
                          onError={(e) => {
                            // Fallback to default avatar if image fails to load
                            e.target.src = defaultAvatar;
                          }}
                        />
                        <div className="profile-details">
                          <h4>{userData.name}</h4>
                          <p>{userData.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="earnings-summary">
                      <h4>Your Earnings</h4>
                      <div className="earnings-data">
                        <div className="earnings-value">
                          <DollarSign size={18} />
                          <span>${userEarnings.amount.toLocaleString()}</span>
                        </div>
                        <div className="earnings-trend-info">
                          <TrendingUp size={14} />
                          <span>{userEarnings.percentage}% this month</span>
                        </div>
                      </div>
                    </div>

                    <div className="profile-drawer-content">
                      <Link to="/profile" className="profile-option">
                        <User size={18} />
                        <span>View Profile</span>
                      </Link>

                      <button className="profile-option" onClick={toggleTheme}>
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </button>

                      <div className="profile-divider"></div>
                      <button className="profile-option logout" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>
        
        {/* Content container which will move when sidebar is toggled */}
        <div className={`content-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${(searchFocused && isMobile) ? 'full-width' : ''}`}>
          {/* Sub Navigation Bar - Hide when search is focused on mobile */}
          {!(searchFocused && isMobile) && activePageData && activePageData.subNavItems && (
            <div className="sub-nav-bar">
              <div className="sub-nav-title">
                <span className="sub-nav-icon">{activePageData.icon}</span>
                {activePageData.label}
              </div>

              <div className="sub-nav-items">
                {activePageData.subNavItems.map(subItem => (
                  <Link
                    key={subItem.id}
                    to={`/${activePage}/${subItem.id}`}
                    className={`sub-nav-item ${activeSubPage === subItem.id ? 'active' : ''}`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Page content */}
          <main className={`page-content ${(searchFocused && isMobile) ? 'full-search' : ''}`}>
            {searchFocused ? (
              <div className="search-results">
                <h2>Search Results for "{searchQuery || 'All'}"</h2>
                <div className="search-content">
                  {searchQuery.length > 0 ? (
                    <p>Showing filtered results for "{searchQuery}"</p>
                  ) : (
                    <p>Start typing to search across your workspace</p>
                  )}
                </div>
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>

      {/* Mobile overlay - Hide when search is active */}
      {mobileMenuOpen && !(searchFocused && isMobile) && (
        <div 
          className="mobile-overlay" 
          onClick={toggleMobileMenu}
        ></div>
      )}
      
      {/* Profile drawer overlay */}
      {profileDrawerOpen && (
        <div 
          className="profile-drawer-overlay"
          onClick={() => setProfileDrawerOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Layout;