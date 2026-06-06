import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import AdminLogin from '../components/AdminLogin';
import AdminFeedback from './AdminFeedback';
import AdminProfile from './AdminProfile';
import DashboardContent from '../components/admin/DashboardContent';
import AnalyticsContent from '../components/admin/AnalyticsContent';
import BookingsContent from '../components/admin/BookingsContent';
import CalendarContent from '../components/admin/CalendarContent';
import SettingsContent from '../components/admin/SettingsContent';
import logo from '../assets/BitForgeIT.png';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    
    // Check if token exists and is valid (starts with BF-SESSION-)
    if (token && token.startsWith('BF-SESSION-')) {
      setIsAuthenticated(true);
      
      // Load admin profile from localStorage
      const savedProfile = localStorage.getItem('adminProfile');
      if (savedProfile) {
        setAdminProfile(JSON.parse(savedProfile));
      } else {
        // Set default profile
        setAdminProfile({
          name: 'Admin User',
          email: 'admin@bitforge.com',
          role: 'System Administrator',
          initials: 'AU',
          avatar: ''
        });
      }
    }
    setIsLoading(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Handle login
  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setShowLogoutModal(true);
    setShowProfileDropdown(false);
    setMobileMenuOpen(false); // Close mobile menu
  };

  // Confirm logout
  const confirmLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    navigate('/');
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    setActiveMenu('Profile');
    setShowProfileDropdown(false);
    setMobileMenuOpen(false); // Close mobile menu
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'Analytics', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      name: 'Bookings', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Team Access', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      name: 'Calendar', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Feedback', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      name: 'Settings', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  const metrics = [
    { 
      label: 'Total Employees', 
      value: '10', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ), 
      color: 'text-blue-400' 
    },
    { 
      label: 'Admins', 
      value: '1', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ), 
      color: 'text-green-400' 
    },
    { 
      label: 'Developers', 
      value: '3', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ), 
      color: 'text-purple-400' 
    },
    { 
      label: 'QA', 
      value: '2', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'text-orange-400' 
    },
  ];

  const employees = [
    {
      name: 'Isacaar Manlulu',
      role: 'Project Manager',
      accessLevel: 'ADMIN',
      lastModified: '2026-05-28',
    },
    {
      name: 'Ceejay Santos',
      role: 'Lead Developer',
      accessLevel: 'DEVELOPER',
      lastModified: '2026-05-27',
    },
    {
      name: 'Lei Ann Judea Dico',
      role: 'QA Lead',
      accessLevel: 'QA',
      lastModified: '2026-05-26',
    },
    {
      name: 'Vincent Duriga',
      role: 'Full Stack Developer',
      accessLevel: 'DEVELOPER',
      lastModified: '2026-05-25',
    },
  ];

  const auditLogs = [
    {
      action: 'Access Level Changed',
      user: 'Isacaar Manlulu',
      details: 'Changed Ceejay Santos to DEVELOPER',
      timestamp: '2026-05-28 14:32',
    },
    {
      action: 'New User Added',
      user: 'System',
      details: 'Added Vincent Duriga as DEVELOPER',
      timestamp: '2026-05-27 10:15',
    },
    {
      action: 'Access Level Changed',
      user: 'Isacaar Manlulu',
      details: 'Changed Lei Ann Dico to QA LEAD',
      timestamp: '2026-05-26 16:45',
    },
    {
      action: 'Permission Updated',
      user: 'Isacaar Manlulu',
      details: 'Updated booking permissions for QA team',
      timestamp: '2026-05-25 09:20',
    },
  ];

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'ADMIN':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'DEVELOPER':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'QA':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen flex bg-bg-primary">
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-bg-surface border-b border-border-color z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="BitForge" className="h-8 w-auto" />
          <span className="font-syne font-bold text-lg">Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-text-primary focus:outline-none p-2 hover:bg-bg-card rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside 
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`bg-bg-surface border-r border-border-color fixed left-0 h-screen flex flex-col z-50 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          // Mobile: slide in when open
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } cursor-pointer`}
        title={sidebarCollapsed ? 'Click to expand' : 'Click to collapse'}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-border-color">
          <div className={`flex items-center space-x-2 mb-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {!sidebarCollapsed && <img src={logo} alt="BitForge" className="h-10 w-auto" />}
            {sidebarCollapsed && (
              <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-purple-600 rounded-lg flex items-center justify-center">
                <span className="font-syne font-bold text-white text-lg">B</span>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <p className="text-text-muted text-xs font-jetbrains uppercase tracking-wider">Admin Panel</p>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(item.name);
                setMobileMenuOpen(false); // Close mobile menu
              }}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'
              } py-3 rounded-lg transition-all font-medium text-sm ${
                activeMenu === item.name
                  ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                  : 'text-text-muted hover:bg-bg-card hover:text-text-primary'
              }`}
              title={sidebarCollapsed ? item.name : ''}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* Profile Section with Dropdown */}
        <div className="p-4 border-t border-border-color" ref={dropdownRef}>
          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleProfileDropdown();
              }}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'
              } py-3 rounded-lg text-text-primary hover:bg-bg-card transition-all`}
              title={sidebarCollapsed ? (adminProfile?.name || 'Admin User') : ''}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {adminProfile?.avatar ? (
                  <img 
                    src={adminProfile.avatar} 
                    alt={adminProfile.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-accent-blue"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center border-2 border-accent-blue">
                    <span className="font-syne font-bold text-sm text-white">
                      {adminProfile?.initials || 'AU'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Name and Role - Hidden when collapsed */}
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium text-sm truncate">{adminProfile?.name || 'Admin User'}</p>
                    <p className="text-xs text-text-muted truncate">{adminProfile?.role || 'Administrator'}</p>
                  </div>
                  
                  {/* Dropdown Arrow */}
                  <svg 
                    className={`w-4 h-4 text-text-muted transition-transform flex-shrink-0 ${showProfileDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && !sidebarCollapsed && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full left-0 right-0 mb-2 bg-bg-surface border border-border-color rounded-lg shadow-2xl overflow-hidden"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-bg-card transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium text-sm">Profile</span>
                </button>
                
                <div className="border-t border-border-color"></div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            )}
            
            {/* Collapsed state - show menu on click */}
            {showProfileDropdown && sidebarCollapsed && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-full ml-2 bg-bg-surface border border-border-color rounded-lg shadow-2xl overflow-hidden w-48"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-bg-card transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium text-sm">Profile</span>
                </button>
                
                <div className="border-t border-border-color"></div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content - with dynamic left margin based on sidebar state */}
      <main className={`flex-1 overflow-y-auto min-h-screen bg-bg-primary transition-all duration-300 pt-16 lg:pt-0 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Conditional Rendering Based on Active Menu */}
        {activeMenu === 'Dashboard' ? (
          <DashboardContent />
        ) : activeMenu === 'Analytics' ? (
          <AnalyticsContent />
        ) : activeMenu === 'Bookings' ? (
          <BookingsContent />
        ) : activeMenu === 'Calendar' ? (
          <CalendarContent />
        ) : activeMenu === 'Settings' ? (
          <SettingsContent />
        ) : activeMenu === 'Feedback' ? (
          <AdminFeedback />
        ) : activeMenu === 'Profile' ? (
          <AdminProfile />
        ) : activeMenu === 'Team Access' ? (
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="font-syne font-bold text-4xl mb-2">
                    Role-Based Access Control
                  </h1>
                  <p className="text-text-muted">
                    Manage team member permissions and access levels
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge active>ADMIN ONLY</Badge>
                  <button
                    onClick={handleLogout}
                    className="lg:hidden text-red-400 hover:text-red-300 transition-colors text-sm flex items-center gap-2"
                  >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm mb-1">{metric.label}</p>
                  <p className={`font-syne font-bold text-3xl ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <div className={metric.color}>{metric.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Employee Access Table */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-2xl">Employee Access</h2>
            <button className="btn-primary text-sm">
              + Add Employee
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color">
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Access Level</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Last Modified</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="border-b border-border-color hover:bg-bg-card transition-colors">
                    <td className="py-4 px-4 font-medium">{employee.name}</td>
                    <td className="py-4 px-4 text-text-muted">{employee.role}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getAccessLevelColor(employee.accessLevel)}`}>
                        {employee.accessLevel}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-text-muted">{employee.lastModified}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="text-accent-blue hover:text-accent-blue-glow transition-colors">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Audit Log */}
        <Card className="p-6">
          <h2 className="font-syne font-bold text-2xl mb-6">Audit Log</h2>
          
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-bg-card rounded-lg hover:bg-bg-surface transition-colors"
              >
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{log.action}</h3>
                    <span className="text-text-muted text-sm">{log.timestamp}</span>
                  </div>
                  <p className="text-text-muted text-sm">
                    <span className="text-accent-blue">{log.user}</span> - {log.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
          </div>
        ) : null}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-syne font-bold text-xl text-white mb-1">Confirm Logout</h2>
                <p className="text-text-muted text-sm">Are you sure you want to logout?</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mb-6 p-4 bg-bg-card rounded-lg border border-border-color">
              <p className="text-text-muted text-sm">
                You will be redirected to the home page and will need to login again to access the admin panel.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-3 bg-bg-card border border-border-color text-text-primary rounded-lg hover:bg-bg-surface transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
