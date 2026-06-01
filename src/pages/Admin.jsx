import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import AdminLogin from '../components/AdminLogin';
import AdminFeedback from './AdminFeedback';
import logo from '../assets/BitForgeIT.png';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    
    // Check if token exists and is valid (starts with BF-SESSION-)
    if (token && token.startsWith('BF-SESSION-')) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Handle login
  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    navigate('/');
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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-surface border-r border-border-color p-6 hidden lg:block flex flex-col">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <img src={logo} alt="BitForge" className="h-10 w-auto" />
          </div>
          <p className="text-text-muted text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.name
                  ? 'bg-accent-blue text-white'
                  : 'text-text-muted hover:bg-bg-card hover:text-text-primary'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6 border-t border-border-color">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Conditional Rendering Based on Active Menu */}
        {activeMenu === 'Feedback' ? (
          <AdminFeedback />
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default Admin;
