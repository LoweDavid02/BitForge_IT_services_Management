import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Badge from '../Badge';
import { analyticsAPI, auditAPI } from '../../api/client';

const DashboardContent = () => {
  const [stats, setStats] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const adminProfile = JSON.parse(localStorage.getItem('adminProfile') || '{"name":"Admin User"}');
  const firstName = adminProfile.name.split(' ')[0];

  useEffect(() => {
    // Fetch live dashboard KPIs
    analyticsAPI.dashboard()
      .then(({ data }) => setStats(data.data))
      .catch(() => setStats(null))
      .finally(() => setLoadingStats(false));

    // Fetch recent audit logs for activity feed
    auditAPI.list({ per_page: 5 })
      .then(({ data }) => setAuditLogs(data.data || []))
      .catch(() => setAuditLogs([]));
  }, []);

  // Build key metrics cards from live data + static system ones
  const keyMetrics = stats ? [
    { label: 'Total Bookings', value: stats.bookings?.total ?? '—', change: `${stats.bookings?.pending ?? 0} pending`, trend: 'neutral' },
    { label: 'Confirmed', value: stats.bookings?.confirmed ?? '—', change: 'Bookings confirmed', trend: 'up' },
    { label: 'Completed', value: stats.bookings?.completed ?? '—', change: 'Successfully delivered', trend: 'up' },
    {
      label: 'Avg Rating', value: stats.feedback?.avg_rating ? `${Number(stats.feedback.avg_rating).toFixed(1)}★` : '—',
      change: `${stats.feedback?.total ?? 0} reviews`, trend: 'up'
    },
    { label: 'Team Members', value: stats.team_members ?? '—', change: 'Active members', trend: 'neutral' },
    { label: 'Feedback Total', value: stats.feedback?.total ?? '—', change: 'All submissions', trend: 'neutral' },
  ] : [];

  const systemStatus = [
    { service: 'API Gateway', status: 'online', uptime: '99.9%' },
    { service: 'Database', status: 'online', uptime: '99.8%' },
    { service: 'Cloud Storage', status: 'online', uptime: '100%' },
    { service: 'Email Service', status: 'online', uptime: '99.7%' },
  ];

  const quickLinks = [
    { label: 'Documentation', url: '#' },
    { label: 'API Reference', url: '#' },
    { label: 'Support Center', url: '#' },
    { label: 'System Status', url: '#' },
  ];

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
      {loadingStats ? (
        <div className="flex justify-center py-12 mb-8">
          <div className="w-10 h-10 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="p-6 hover:shadow-blue-glow transition-all">
              <p className="text-text-muted text-xs mb-2 font-jetbrains uppercase tracking-wider">{metric.label}</p>
              <p className="font-syne font-bold text-3xl text-white mb-1">{metric.value}</p>
              <p className="text-xs text-text-muted">{metric.change}</p>
            </Card>
          ))}
        </div>
      )}

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
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Server Load</span>
                <span className="text-sm font-bold text-blue-400">42%</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Memory Usage</span>
                <span className="text-sm font-bold text-yellow-400">68%</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted font-jetbrains uppercase">Uptime</span>
                <span className="text-sm font-bold text-green-400">99.9%</span>
              </div>
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '99%' }}></div>
              </div>
            </div>
          </div>
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
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-xl">Recent Activity</h2>
            <button onClick={() => setShowActivityModal(true)} className="text-accent-blue hover:text-accent-blue-glow text-sm font-jetbrains transition-colors">
              VIEW ALL
            </button>
          </div>
          <div className="space-y-4">
            {auditLogs.length === 0 ? (
              <p className="text-text-muted text-sm py-4">No recent activity yet.</p>
            ) : auditLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-bg-card rounded-lg hover:bg-bg-primary transition-all">
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{log.action}</p>
                  <p className="text-sm text-text-muted">{log.performed_by} — {log.details}</p>
                </div>
                <span className="text-xs text-text-muted font-jetbrains whitespace-nowrap">
                  {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-syne font-bold text-xl mb-6">Quick Links</h2>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="flex items-center justify-between p-3 bg-bg-card rounded-lg hover:bg-bg-primary hover:border-accent-blue border border-transparent transition-all group"
              >
                <span className="text-sm font-medium text-white">{link.label}</span>
                <svg className="w-5 h-5 text-text-muted group-hover:text-accent-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-accent-blue/10 to-purple-600/10 border border-accent-blue/30 rounded-lg">
            <p className="text-sm font-medium text-white mb-1">Need Help?</p>
            <p className="text-xs text-text-muted">Contact support for assistance</p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted font-jetbrains">
        <p>&copy; {new Date().getFullYear()} BitForge IT Suite. All rights reserved.</p>
      </div>

      {/* Metrics Modal */}
      {showMetricsModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-2xl w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Detailed Performance Metrics</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
            <p className="text-text-muted text-sm mb-6">All systems are operating within normal parameters.</p>
            <button onClick={() => setShowMetricsModal(false)} className="w-full btn-secondary">Close</button>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-2xl w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">All Recent Activity</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {auditLogs.length === 0 ? (
                <p className="text-text-muted text-sm py-4">No activity records yet.</p>
              ) : auditLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-bg-card rounded-lg">
                  <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{log.action}</p>
                    <p className="text-sm text-text-muted">{log.performed_by} — {log.details}</p>
                  </div>
                  <span className="text-xs text-text-muted font-jetbrains whitespace-nowrap">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowActivityModal(false)} className="w-full mt-6 btn-secondary">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
