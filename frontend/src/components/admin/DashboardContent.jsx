import React, { useState } from 'react';
import Card from '../Card';
import Badge from '../Badge';

const DashboardContent = () => {
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  
  // Get admin name from localStorage or use default
  const adminProfile = JSON.parse(localStorage.getItem('adminProfile') || '{"name":"Admin User"}');
  const firstName = adminProfile.name.split(' ')[0];

  // Handle quick link clicks
  const handleQuickLinkClick = (label) => {
    alert(`Opening ${label}...\\nThis would navigate to the ${label.toLowerCase()} page.`);
  };

  // Handle footer link clicks
  const handleFooterClick = (section) => {
    alert(`Opening ${section}...\\nThis would show the ${section.toLowerCase()} information.`);
  };

  // Key metrics for overview
  const keyMetrics = [
    {
      label: 'Active Projects',
      value: '12',
      change: '+2 this week',
      trend: 'up',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      label: 'Total Revenue',
      value: '$336K',
      change: '+24% growth',
      trend: 'up',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Active Clients',
      value: '48',
      change: '+12 new',
      trend: 'up',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'System Health',
      value: '99.8%',
      change: 'All systems operational',
      trend: 'up',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Pending Tasks',
      value: '8',
      change: '4 due today',
      trend: 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      label: 'Team Members',
      value: '10',
      change: '3 online now',
      trend: 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];



  // Recent activity feed
  const recentActivity = [
    { action: 'New booking created', user: 'TechNexus Corp', time: '5 min ago', icon: 'calendar', color: 'text-blue-400' },
    { action: 'Project milestone completed', user: 'Matrix Logistics', time: '23 min ago', icon: 'check', color: 'text-green-400' },
    { action: 'Team member added', user: 'Vincent Duriga', time: '1 hour ago', icon: 'user', color: 'text-purple-400' },
    { action: 'Feedback received', user: 'Aether Ventures', time: '2 hours ago', icon: 'message', color: 'text-yellow-400' },
    { action: 'Invoice generated', user: 'DataSphere Corp', time: '3 hours ago', icon: 'document', color: 'text-green-400' }
  ];

  // System status indicators
  const systemStatus = [
    { service: 'API Gateway', status: 'online', uptime: '99.9%' },
    { service: 'Database', status: 'online', uptime: '99.8%' },
    { service: 'Cloud Storage', status: 'online', uptime: '100%' },
    { service: 'Email Service', status: 'online', uptime: '99.7%' }
  ];

  // Quick links
  const quickLinks = [
    { label: 'Documentation', url: '#' },
    { label: 'API Reference', url: '#' },
    { label: 'Support Center', url: '#' },
    { label: 'System Status', url: '#' }
  ];

  const getActivityIcon = (iconType) => {
    switch (iconType) {
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'message':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-syne font-bold text-4xl mb-2">
              Welcome back, <span className="text-accent-blue">{firstName}</span>
            </h1>
            <p className="text-text-muted">Here's what's happening with your projects today</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-surface border border-border-color rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-jetbrains text-white">ALL SYSTEMS OPERATIONAL</p>
              <p className="text-xs text-text-muted font-jetbrains">Last checked: Just now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="p-6 hover:shadow-blue-glow transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="text-accent-blue">{metric.icon}</div>
            </div>
            <p className="text-text-muted text-xs mb-2 font-jetbrains uppercase tracking-wider">{metric.label}</p>
            <p className="font-syne font-bold text-3xl text-white mb-1">{metric.value}</p>
            <p className="text-xs text-text-muted">{metric.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* System Status */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-syne font-bold text-xl mb-6">System Status</h2>
          <div className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-bg-card rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium text-white">{system.service}</p>
                    <p className="text-xs text-text-muted font-jetbrains">{system.uptime} uptime</p>
                  </div>
                </div>
                <Badge active>{system.status.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Overview */}
        <Card className="p-6">
          <h2 className="font-syne font-bold text-xl mb-6">Performance</h2>
          <div className="space-y-6">
            {/* Response Time */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Response Time</span>
                <span className="text-sm font-bold text-green-400">2.4h</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-green-400 font-jetbrains mt-1">-15% faster</p>
            </div>

            {/* Server Load */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Server Load</span>
                <span className="text-sm font-bold text-blue-400">42%</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <p className="text-xs text-text-muted font-jetbrains mt-1">Optimal range</p>
            </div>

            {/* Memory Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Memory Usage</span>
                <span className="text-sm font-bold text-yellow-400">68%</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-text-muted font-jetbrains mt-1">4.2GB / 16GB</p>
            </div>

            {/* Active Connections */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Active Connections</span>
                <span className="text-sm font-bold text-purple-400">1,284</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <p className="text-xs text-purple-400 font-jetbrains mt-1">+12% from yesterday</p>
            </div>
          </div>

          {/* View Details Button */}
          <button 
            onClick={() => setShowMetricsModal(true)}
            className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-accent-blue/10 to-purple-600/10 border border-accent-blue/30 rounded-lg hover:from-accent-blue/20 hover:to-purple-600/20 transition-all group"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-accent-blue">View Detailed Metrics</span>
              <svg className="w-4 h-4 text-accent-blue group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </Card>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-xl">Recent Activity</h2>
            <button 
              onClick={() => setShowActivityModal(true)}
              className="text-accent-blue hover:text-accent-blue-glow text-sm font-jetbrains transition-colors"
            >
              VIEW ALL
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-bg-card rounded-lg hover:bg-bg-primary transition-all">
                <div className={`${activity.color} mt-1`}>
                  {getActivityIcon(activity.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-sm text-text-muted">{activity.user}</p>
                </div>
                <span className="text-xs text-text-muted font-jetbrains whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="p-6">
          <h2 className="font-syne font-bold text-xl mb-6">Quick Links</h2>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleQuickLinkClick(link.label)}
                className="flex items-center justify-between p-3 bg-bg-card rounded-lg hover:bg-bg-primary hover:border-accent-blue border border-transparent transition-all group w-full"
              >
                <span className="text-sm font-medium text-white">{link.label}</span>
                <svg className="w-5 h-5 text-text-muted group-hover:text-accent-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-accent-blue/10 to-purple-600/10 border border-accent-blue/30 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-white mb-1">Need Help?</p>
                <p className="text-xs text-text-muted">Contact support for assistance</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted font-jetbrains">
        <p>&copy; 2024 BitForge IT Suite. All rights reserved.</p>
        <div className="flex gap-4 flex-wrap">
          <button 
            onClick={() => handleFooterClick('DOCUMENTATION')}
            className="hover:text-accent-blue transition-colors"
          >
            DOCUMENTATION
          </button>
          <button 
            onClick={() => handleFooterClick('SUPPORT')}
            className="hover:text-accent-blue transition-colors"
          >
            SUPPORT
          </button>
          <button 
            onClick={() => handleFooterClick('PRIVACY')}
            className="hover:text-accent-blue transition-colors"
          >
            PRIVACY
          </button>
        </div>
      </div>

      {/* Metrics Modal */}
      {showMetricsModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-2xl w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Detailed Performance Metrics</h2>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg-card rounded-lg">
                  <p className="text-text-muted text-sm mb-2">CPU Usage</p>
                  <p className="font-syne font-bold text-2xl text-accent-blue">42%</p>
                </div>
                <div className="p-4 bg-bg-card rounded-lg">
                  <p className="text-text-muted text-sm mb-2">RAM Usage</p>
                  <p className="font-syne font-bold text-2xl text-yellow-400">4.2GB</p>
                </div>
                <div className="p-4 bg-bg-card rounded-lg">
                  <p className="text-text-muted text-sm mb-2">Network I/O</p>
                  <p className="font-syne font-bold text-2xl text-green-400">127MB/s</p>
                </div>
                <div className="p-4 bg-bg-card rounded-lg">
                  <p className="text-text-muted text-sm mb-2">Disk Usage</p>
                  <p className="font-syne font-bold text-2xl text-purple-400">68%</p>
                </div>
              </div>
              <p className="text-text-muted text-sm">
                All systems are operating within normal parameters. Last updated: Just now
              </p>
            </div>
            <button 
              onClick={() => setShowMetricsModal(false)}
              className="w-full mt-6 btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-2xl w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">All Recent Activity</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivity.concat(recentActivity).map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-bg-card rounded-lg">
                  <div className={`${activity.color} mt-1`}>
                    {getActivityIcon(activity.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-sm text-text-muted">{activity.user}</p>
                  </div>
                  <span className="text-xs text-text-muted font-jetbrains">{activity.time}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowActivityModal(false)}
              className="w-full mt-6 btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
