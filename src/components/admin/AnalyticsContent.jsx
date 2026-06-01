import { useState } from 'react';
import Card from '../Card';

const AnalyticsContent = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartView, setChartView] = useState('monthly');
  const [selectedService, setSelectedService] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to generate data based on time range
  const getDataForTimeRange = (baseData, range) => {
    const multipliers = {
      'today': 0.1,
      'week': 0.5,
      'month': 1,
      'quarter': 3,
      'year': 12
    };
    
    const multiplier = multipliers[range] || 1;
    return baseData.map(item => ({
      ...item,
      value: Math.round(item.value * multiplier),
      growth: item.growth ? Math.round(item.growth * (0.8 + Math.random() * 0.4)) : undefined
    }));
  };

  // Handle data refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Handle export
  const handleExport = (format) => {
    console.log(`Exporting data as ${format}...`);
    // Simulate export
    const data = {
      timeRange,
      metrics: keyMetrics,
      revenue: revenueData,
      services: servicePerformance,
      exportedAt: new Date().toISOString()
    };
    
    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-${timeRange}-${Date.now()}.json`;
      link.click();
    } else if (format === 'csv') {
      // Simple CSV export
      let csv = 'Metric,Value,Change\n';
      keyMetrics.forEach(m => {
        csv += `${m.label},${m.value},${m.change}\n`;
      });
      const csvBlob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-${timeRange}-${Date.now()}.csv`;
      link.click();
    }
    
    setShowExportModal(false);
  };

  // Sample data for charts (now dynamic based on time range)
  const baseRevenueData = [
    { month: 'Jan', value: 45000, growth: 12 },
    { month: 'Feb', value: 52000, growth: 15 },
    { month: 'Mar', value: 48000, growth: -8 },
    { month: 'Apr', value: 61000, growth: 27 },
    { month: 'May', value: 58000, growth: -5 },
    { month: 'Jun', value: 72000, growth: 24 }
  ];

  const revenueData = getDataForTimeRange(baseRevenueData, timeRange);

  const forgeActivityData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 92 }
  ];

  const servicePerformance = [
    { service: 'AI Infrastructure', value: 35, color: 'from-blue-500 to-blue-600' },
    { service: 'Web3 Integration', value: 25, color: 'from-purple-500 to-purple-600' },
    { service: 'Custom SaaS', value: 20, color: 'from-green-500 to-green-600' },
    { service: 'Cybersecurity', value: 15, color: 'from-red-500 to-red-600' },
    { service: 'Mobile Apps', value: 5, color: 'from-yellow-500 to-yellow-600' }
  ];

  const userEngagementData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 52 },
    { day: 'Wed', value: 48 },
    { day: 'Thu', value: 65 },
    { day: 'Fri', value: 58 },
    { day: 'Sat', value: 35 },
    { day: 'Sun', value: 28 }
  ];

  const keyMetrics = [
    { label: 'Total Revenue', value: '$336K', change: '+24%', trend: 'up' },
    { label: 'Active Clients', value: '48', change: '+12%', trend: 'up' },
    { label: 'Conversion Rate', value: '68%', change: '+5%', trend: 'up' },
    { label: 'Avg. Project Value', value: '$18.5K', change: '-3%', trend: 'down' },
    { label: 'Client Retention', value: '94%', change: '+2%', trend: 'up' },
    { label: 'Response Time', value: '2.4h', change: '-15%', trend: 'up' }
  ];

  const geographicData = [
    { region: 'North America', clients: 28, revenue: '$168K', percentage: 50 },
    { region: 'Europe', clients: 12, revenue: '$84K', percentage: 25 },
    { region: 'Asia Pacific', clients: 6, revenue: '$50K', percentage: 15 },
    { region: 'Other', clients: 2, revenue: '$34K', percentage: 10 }
  ];

  const timeBasedAnalytics = [
    { hour: '00:00', bookings: 2 },
    { hour: '04:00', bookings: 1 },
    { hour: '08:00', bookings: 8 },
    { hour: '12:00', bookings: 15 },
    { hour: '16:00', bookings: 12 },
    { hour: '20:00', bookings: 6 }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const maxEngagement = Math.max(...userEngagementData.map(d => d.value));
  const maxBookings = Math.max(...timeBasedAnalytics.map(d => d.bookings));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-syne font-bold text-4xl mb-2">ANALYTICS & INSIGHTS</h1>
            <p className="text-text-muted">Comprehensive performance metrics and business intelligence</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex gap-2 flex-wrap">
            {['today', 'week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-jetbrains uppercase transition-all ${
                  timeRange === range 
                    ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' 
                    : 'bg-bg-card text-text-muted hover:text-white hover:bg-bg-surface'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-bg-card text-text-muted hover:text-white hover:bg-bg-surface rounded-lg text-sm font-jetbrains transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? 'REFRESHING...' : 'REFRESH DATA'}
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-accent-blue text-white hover:bg-accent-blue-deep rounded-lg text-sm font-jetbrains transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            EXPORT DATA
          </button>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-2 bg-bg-card text-text-muted hover:text-white rounded-lg text-sm font-jetbrains transition-all border border-border-color focus:border-accent-blue focus:outline-none"
          >
            <option value="all">All Services</option>
            <option value="ai">AI Infrastructure</option>
            <option value="web3">Web3 Integration</option>
            <option value="saas">Custom SaaS</option>
            <option value="security">Cybersecurity</option>
            <option value="mobile">Mobile Apps</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <p className="text-text-muted text-xs mb-2 font-jetbrains uppercase tracking-wider">{metric.label}</p>
            <p className="font-syne font-bold text-2xl text-white mb-2">{metric.value}</p>
            <div className="flex items-center gap-2">
              {metric.trend === 'up' ? (
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span className={`text-xs font-jetbrains ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Trends Chart */}
      <Card className="p-6 mb-8">
        <div className="mb-6">
          <h2 className="font-syne font-bold text-xl mb-1">Revenue Growth Trends</h2>
          <p className="text-text-muted text-sm">Monthly revenue performance with growth indicators</p>
        </div>
        
        {/* Line Chart */}
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between gap-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 relative group">
                {/* Bar */}
                <div className="w-full relative" style={{ height: '100%' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-accent-blue/30 to-transparent rounded-t transition-all duration-500"
                    style={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  ></div>
                  {/* Line point */}
                  <div 
                    className="absolute w-3 h-3 bg-accent-blue rounded-full border-2 border-white left-1/2 transform -translate-x-1/2 transition-all duration-500"
                    style={{ bottom: `${(data.value / maxRevenue) * 100}%` }}
                  ></div>
                  {/* Tooltip */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded-lg p-2 whitespace-nowrap z-10">
                    <p className="text-xs font-jetbrains text-white">${(data.value / 1000).toFixed(1)}K</p>
                    <p className={`text-xs font-jetbrains ${data.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {data.growth >= 0 ? '+' : ''}{data.growth}%
                    </p>
                  </div>
                </div>
                {/* Label */}
                <span className="text-xs text-text-muted font-jetbrains">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Forge Activity Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-syne font-bold text-xl mb-1">Forge Activity</h2>
              <p className="text-text-muted text-sm">Project Milestone Velocity</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChartView('monthly')}
                className={`px-3 py-1 rounded text-sm font-jetbrains transition-all ${
                  chartView === 'monthly' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'
                }`}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setChartView('quarterly')}
                className={`px-3 py-1 rounded text-sm font-jetbrains transition-all ${
                  chartView === 'quarterly' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'
                }`}
              >
                QUARTERLY
              </button>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-4">
            {forgeActivityData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-bg-card rounded-t relative" style={{ height: '100%' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-accent-blue to-accent-blue-glow rounded-t transition-all duration-500 group-hover:from-accent-blue-glow group-hover:to-accent-blue"
                    style={{ height: `${data.value}%` }}
                  ></div>
                  {/* Value label on hover */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded px-2 py-1">
                    <span className="text-xs font-jetbrains text-white">{data.value}%</span>
                  </div>
                </div>
                <span className="text-xs text-text-muted font-jetbrains">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* User Engagement */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">User Engagement</h2>
            <p className="text-text-muted text-sm">Weekly activity patterns</p>
          </div>
          
          {/* Area Chart */}
          <div className="relative h-48 mb-4">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {userEngagementData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative" style={{ height: '100%' }}>
                    {/* Area fill */}
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500/30 to-transparent transition-all duration-500"
                      style={{ height: `${(data.value / maxEngagement) * 100}%` }}
                    ></div>
                    {/* Point */}
                    <div 
                      className="absolute w-2 h-2 bg-purple-500 rounded-full left-1/2 transform -translate-x-1/2 transition-all duration-500 group-hover:w-3 group-hover:h-3"
                      style={{ bottom: `${(data.value / maxEngagement) * 100}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded px-2 py-1 whitespace-nowrap z-10">
                      <p className="text-xs font-jetbrains text-white">{data.value} users</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted font-jetbrains">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Engagement Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-color">
            <div className="text-center">
              <p className="text-2xl font-syne font-bold text-white">342</p>
              <p className="text-xs text-text-muted font-jetbrains mt-1">TOTAL USERS</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-syne font-bold text-green-400">+18%</p>
              <p className="text-xs text-text-muted font-jetbrains mt-1">GROWTH</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-syne font-bold text-purple-400">4.2h</p>
              <p className="text-xs text-text-muted font-jetbrains mt-1">AVG SESSION</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Geographic Distribution & Time-Based Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Geographic Distribution */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Geographic Distribution</h2>
            <p className="text-text-muted text-sm">Client and revenue breakdown by region</p>
          </div>
          
          <div className="space-y-4">
            {geographicData.map((region, index) => (
              <div key={index} className="p-4 bg-bg-card rounded-lg hover:bg-bg-primary transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center">
                      <span className="text-xs font-bold">{region.clients}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{region.region}</p>
                      <p className="text-xs text-text-muted font-jetbrains">{region.clients} clients</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-syne font-bold text-lg text-white">{region.revenue}</p>
                    <p className="text-xs text-text-muted font-jetbrains">{region.percentage}%</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-blue to-purple-600 transition-all duration-500"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Time-Based Analytics */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Time-Based Analytics</h2>
            <p className="text-text-muted text-sm">Booking patterns throughout the day</p>
          </div>
          
          {/* Hourly Chart */}
          <div className="flex items-end justify-between h-48 gap-3 mb-4">
            {timeBasedAnalytics.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-bg-card rounded-t relative" style={{ height: '100%' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-500 group-hover:from-green-400 group-hover:to-green-300"
                    style={{ height: `${(data.bookings / maxBookings) * 100}%` }}
                  ></div>
                  {/* Value on hover */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded px-2 py-1">
                    <span className="text-xs font-jetbrains text-white">{data.bookings}</span>
                  </div>
                </div>
                <span className="text-xs text-text-muted font-jetbrains">{data.hour}</span>
              </div>
            ))}
          </div>
          
          {/* Peak Hours Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-color">
            <div className="p-3 bg-bg-card rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs text-text-muted font-jetbrains uppercase">Peak Hour</span>
              </div>
              <p className="font-syne font-bold text-xl text-white">12:00 PM</p>
              <p className="text-xs text-green-400 font-jetbrains mt-1">15 bookings</p>
            </div>
            <div className="p-3 bg-bg-card rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-text-muted font-jetbrains uppercase">Avg Response</span>
              </div>
              <p className="font-syne font-bold text-xl text-white">2.4h</p>
              <p className="text-xs text-blue-400 font-jetbrains mt-1">-15% faster</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Conversion & Retention Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Conversion Funnel</h2>
            <p className="text-text-muted text-sm">Lead to client conversion stages</p>
          </div>
          
          <div className="space-y-3">
            {[
              { stage: 'Website Visitors', count: 1250, percentage: 100, color: 'from-blue-500 to-blue-600' },
              { stage: 'Inquiry Submitted', count: 425, percentage: 34, color: 'from-purple-500 to-purple-600' },
              { stage: 'Consultation Booked', count: 298, percentage: 24, color: 'from-green-500 to-green-600' },
              { stage: 'Proposal Sent', count: 186, percentage: 15, color: 'from-yellow-500 to-yellow-600' },
              { stage: 'Contract Signed', count: 124, percentage: 10, color: 'from-red-500 to-red-600' }
            ].map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-jetbrains text-text-muted">{stage.count}</span>
                    <span className="text-xs font-jetbrains text-accent-blue">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-8 bg-bg-card rounded-lg overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stage.color} flex items-center justify-end pr-3 transition-all duration-500`}
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.percentage > 15 && (
                      <span className="text-xs font-jetbrains text-white font-bold">{stage.percentage}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-bg-card rounded-lg border border-accent-blue/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted font-jetbrains uppercase mb-1">Overall Conversion Rate</p>
                <p className="font-syne font-bold text-2xl text-white">9.92%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted font-jetbrains uppercase mb-1">vs Last Period</p>
                <p className="text-lg font-bold text-green-400">+2.3%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Client Retention */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Client Retention Metrics</h2>
            <p className="text-text-muted text-sm">Long-term client relationship analysis</p>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { label: 'New Clients', value: 18, total: 48, color: 'bg-blue-500' },
              { label: 'Returning Clients', value: 24, total: 48, color: 'bg-green-500' },
              { label: 'At Risk', value: 4, total: 48, color: 'bg-yellow-500' },
              { label: 'Churned', value: 2, total: 48, color: 'bg-red-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <span className="text-sm font-jetbrains text-text-muted">{item.value} / {item.total}</span>
                </div>
                <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Retention Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-bg-card rounded-lg">
              <p className="text-xs text-text-muted font-jetbrains uppercase mb-2">Retention Rate</p>
              <p className="font-syne font-bold text-3xl text-green-400">94%</p>
              <p className="text-xs text-green-400 font-jetbrains mt-1">+2% from last quarter</p>
            </div>
            <div className="p-4 bg-bg-card rounded-lg">
              <p className="text-xs text-text-muted font-jetbrains uppercase mb-2">Churn Rate</p>
              <p className="font-syne font-bold text-3xl text-red-400">4.2%</p>
              <p className="text-xs text-red-400 font-jetbrains mt-1">-1.2% improvement</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-white">Excellent Retention</p>
                <p className="text-xs text-text-muted">Above industry average of 85%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-text-muted font-jetbrains py-4">
        <p>&copy; 2024 BitForge IT Suite. All rights reserved.</p>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-syne font-bold text-xl text-white">Export Analytics Data</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-text-muted hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-text-muted text-sm mb-6">
              Choose a format to export your analytics data for the selected time range: <span className="text-accent-blue font-jetbrains uppercase">{timeRange}</span>
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleExport('json')}
                className="w-full p-4 bg-bg-card hover:bg-bg-primary border border-border-color hover:border-accent-blue rounded-lg transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-blue/20 rounded-lg flex items-center justify-center group-hover:bg-accent-blue/30 transition-colors">
                      <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">JSON Format</p>
                      <p className="text-xs text-text-muted">Structured data for developers</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-text-muted group-hover:text-accent-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => handleExport('csv')}
                className="w-full p-4 bg-bg-card hover:bg-bg-primary border border-border-color hover:border-accent-blue rounded-lg transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">CSV Format</p>
                      <p className="text-xs text-text-muted">Compatible with Excel & Sheets</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-text-muted group-hover:text-accent-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowExportModal(false)}
              className="w-full px-4 py-2 bg-bg-card text-text-muted hover:text-white rounded-lg text-sm font-jetbrains transition-all"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsContent;
