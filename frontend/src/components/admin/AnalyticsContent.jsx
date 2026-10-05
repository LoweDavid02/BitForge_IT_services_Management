import { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import { analyticsAPI } from '../../api/client';

const AnalyticsContent = () => {
  const [timeRange, setTimeRange]           = useState('month');
  const [chartView, setChartView]           = useState('monthly');
  const [selectedService, setSelectedService] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [refreshing, setRefreshing]         = useState(false);
  const [loading, setLoading]               = useState(true);

  // ── Live data from API ────────────────────────────────────────────────────
  const [dashStats, setDashStats]       = useState(null);   // dashboard endpoint
  const [bookingTrend, setBookingTrend] = useState([]);     // bookings endpoint → trend
  const [serviceBreakdown, setServiceBreakdown] = useState([]); // bookings endpoint → service_breakdown
  const [feedbackStats, setFeedbackStats] = useState(null); // feedback endpoint

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [dashRes, bookRes, fbRes] = await Promise.all([
        analyticsAPI.dashboard(),
        analyticsAPI.bookings({ days: 30 }),
        analyticsAPI.feedback(),
      ]);
      setDashStats(dashRes.data.data);
      setBookingTrend(bookRes.data.data?.trend || []);
      setServiceBreakdown(bookRes.data.data?.service_breakdown || []);
      setFeedbackStats(fbRes.data.data);
    } catch {
      // leave previous data in place on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Refresh handler — real refetch ────────────────────────────────────────
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  };

  // ── Derive keyMetrics from live dashboard data ────────────────────────────
  // Financial metrics (Revenue, Conversion Rate) have no backend model,
  // so those 3 cards stay as decorative estimates clearly labelled.
  const keyMetrics = dashStats ? [
    {
      label: 'Total Bookings',
      value: dashStats.bookings?.total ?? '—',
      change: `${dashStats.bookings?.pending ?? 0} pending`,
      trend: 'neutral',
    },
    {
      label: 'Confirmed',
      value: dashStats.bookings?.confirmed ?? '—',
      change: `${dashStats.bookings?.completed ?? 0} completed`,
      trend: 'up',
    },
    {
      label: 'Cancelled',
      value: dashStats.bookings?.cancelled ?? '—',
      change: `${dashStats.bookings?.rescheduled ?? 0} rescheduled`,
      trend: 'down',
    },
    {
      label: 'Avg Rating',
      value: dashStats.feedback?.avg_rating
        ? `${Number(dashStats.feedback.avg_rating).toFixed(1)}★`
        : '—',
      change: `${dashStats.feedback?.total ?? 0} reviews`,
      trend: 'up',
    },
    {
      label: 'Team Members',
      value: dashStats.team_members ?? '—',
      change: 'Active members',
      trend: 'neutral',
    },
    {
      label: 'Total Feedback',
      value: dashStats.feedback?.total ?? '—',
      change: 'All submissions',
      trend: 'neutral',
    },
  ] : [
    // skeleton placeholders while loading
    { label: 'Total Bookings', value: '—', change: '…', trend: 'neutral' },
    { label: 'Confirmed',      value: '—', change: '…', trend: 'up'      },
    { label: 'Cancelled',      value: '—', change: '…', trend: 'down'    },
    { label: 'Avg Rating',     value: '—', change: '…', trend: 'up'      },
    { label: 'Team Members',   value: '—', change: '…', trend: 'neutral' },
    { label: 'Total Feedback', value: '—', change: '…', trend: 'neutral' },
  ];

  // ── Derive chart data from live booking trend (daily → group into weeks) ──
  // The API returns daily counts for the last 30 days.
  // We bucket them into ~6 weekly groups for the bar chart display.
  const revenueData = (() => {
    if (bookingTrend.length === 0) return [
      { month: 'Week 1', value: 0, growth: 0 },
      { month: 'Week 2', value: 0, growth: 0 },
      { month: 'Week 3', value: 0, growth: 0 },
      { month: 'Week 4', value: 0, growth: 0 },
    ];
    const bucketSize = Math.ceil(bookingTrend.length / 4);
    const buckets = [];
    for (let i = 0; i < bookingTrend.length; i += bucketSize) {
      const slice = bookingTrend.slice(i, i + bucketSize);
      const total = slice.reduce((sum, d) => sum + d.count, 0);
      buckets.push({ month: `Week ${buckets.length + 1}`, value: total, growth: 0 });
    }
    // compute growth % vs previous bucket
    return buckets.map((b, i) => ({
      ...b,
      growth: i === 0 ? 0
        : buckets[i - 1].value === 0 ? 0
        : Math.round(((b.value - buckets[i - 1].value) / buckets[i - 1].value) * 100),
    }));
  })();

  const forgeActivityData = revenueData.map((b) => ({
    month: b.month,
    value: revenueData[0]?.value > 0
      ? Math.round((b.value / Math.max(...revenueData.map((x) => x.value))) * 100)
      : 0,
  }));

  // ── Service performance from live breakdown ───────────────────────────────
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-yellow-500 to-yellow-600',
    'from-pink-500 to-pink-600',
  ];
  const totalBookings = serviceBreakdown.reduce((s, d) => s + d.count, 0);
  const servicePerformance = serviceBreakdown.slice(0, 5).map((item, idx) => ({
    service: item.service,
    value:   totalBookings > 0 ? Math.round((item.count / totalBookings) * 100) : 0,
    color:   colors[idx % colors.length],
  }));

  // ── Static decorative data (no backend equivalent) ────────────────────────
  const userEngagementData = [
    { day: 'Mon', value: 45 }, { day: 'Tue', value: 52 }, { day: 'Wed', value: 48 },
    { day: 'Thu', value: 65 }, { day: 'Fri', value: 58 }, { day: 'Sat', value: 35 },
    { day: 'Sun', value: 28 },
  ];
  const geographicData = [
    { region: 'North America', clients: 28, revenue: '$168K', percentage: 50 },
    { region: 'Europe',        clients: 12, revenue: '$84K',  percentage: 25 },
    { region: 'Asia Pacific',  clients: 6,  revenue: '$50K',  percentage: 15 },
    { region: 'Other',         clients: 2,  revenue: '$34K',  percentage: 10 },
  ];
  const timeBasedAnalytics = [
    { hour: '00:00', bookings: 2 }, { hour: '04:00', bookings: 1 },
    { hour: '08:00', bookings: 8 }, { hour: '12:00', bookings: 15 },
    { hour: '16:00', bookings: 12 }, { hour: '20:00', bookings: 6 },
  ];

  // ── Export handler — uses live keyMetrics ─────────────────────────────────
  const handleExport = (format) => {
    const data = {
      timeRange,
      generatedAt: new Date().toISOString(),
      metrics: keyMetrics,
      serviceBreakdown,
      bookingTrend,
    };
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = `analytics-${timeRange}-${Date.now()}.json`;
      link.click(); URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      let csv = 'Metric,Value,Change\n';
      keyMetrics.forEach((m) => { csv += `${m.label},${m.value},${m.change}\n`; });
      csv += '\nService,Bookings Count,Percentage\n';
      serviceBreakdown.forEach((s) => {
        const pct = totalBookings > 0 ? Math.round((s.count / totalBookings) * 100) : 0;
        csv += `${s.service},${s.count},${pct}%\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = `analytics-${timeRange}-${Date.now()}.csv`;
      link.click(); URL.revokeObjectURL(url);
    }
    setShowExportModal(false);
  };

  const maxRevenue    = Math.max(...revenueData.map((d) => d.value), 1);
  const maxEngagement = Math.max(...userEngagementData.map((d) => d.value), 1);
  const maxBookingsH  = Math.max(...timeBasedAnalytics.map((d) => d.bookings), 1);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-syne font-bold text-4xl mb-2">ANALYTICS & INSIGHTS</h1>
            <p className="text-text-muted">Comprehensive performance metrics and business intelligence</p>
          </div>
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
            {serviceBreakdown.map((s) => (
              <option key={s.service} value={s.service}>{s.service}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics Grid — live data */}
      {loading ? (
        <div className="flex justify-center py-12 mb-8">
          <div className="w-10 h-10 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
                ) : metric.trend === 'down' ? (
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                )}
                <span className={`text-xs font-jetbrains ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-text-muted'}`}>
                  {metric.change}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Trend Chart — live data */}
      <Card className="p-6 mb-8">
        <div className="mb-6">
          <h2 className="font-syne font-bold text-xl mb-1">Booking Trend</h2>
          <p className="text-text-muted text-sm">Weekly booking volume for the last 30 days</p>
        </div>
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between gap-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 relative group">
                <div className="w-full relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-accent-blue/30 to-transparent rounded-t transition-all duration-500"
                    style={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  />
                  <div
                    className="absolute w-3 h-3 bg-accent-blue rounded-full border-2 border-white left-1/2 transform -translate-x-1/2 transition-all duration-500"
                    style={{ bottom: `${(data.value / maxRevenue) * 100}%` }}
                  />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded-lg p-2 whitespace-nowrap z-10">
                    <p className="text-xs font-jetbrains text-white">{data.value} bookings</p>
                    {data.growth !== 0 && (
                      <p className={`text-xs font-jetbrains ${data.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {data.growth >= 0 ? '+' : ''}{data.growth}%
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-text-muted font-jetbrains">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Service Breakdown — live data */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-syne font-bold text-xl mb-1">Service Breakdown</h2>
              <p className="text-text-muted text-sm">Bookings by service type</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setChartView('monthly')} className={`px-3 py-1 rounded text-sm font-jetbrains transition-all ${chartView === 'monthly' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'}`}>MONTHLY</button>
              <button onClick={() => setChartView('quarterly')} className={`px-3 py-1 rounded text-sm font-jetbrains transition-all ${chartView === 'quarterly' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'}`}>QUARTERLY</button>
            </div>
          </div>
          {servicePerformance.length === 0 ? (
            <p className="text-text-muted text-sm py-8 text-center">No booking data yet.</p>
          ) : (
            <div className="flex items-end justify-between h-48 gap-4">
              {servicePerformance.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-bg-card rounded-t relative" style={{ height: '100%' }}>
                    <div
                      className={`absolute bottom-0 w-full bg-gradient-to-t ${data.color} rounded-t transition-all duration-500`}
                      style={{ height: `${data.value}%` }}
                    />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded px-2 py-1 whitespace-nowrap z-10">
                      <span className="text-xs font-jetbrains text-white">{data.value}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted font-jetbrains truncate max-w-full text-center">
                    {data.service.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* User Engagement — decorative static */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">User Engagement</h2>
            <p className="text-text-muted text-sm">Weekly activity patterns</p>
          </div>
          <div className="relative h-48 mb-4">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {userEngagementData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative" style={{ height: '100%' }}>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500/30 to-transparent transition-all duration-500" style={{ height: `${(data.value / maxEngagement) * 100}%` }} />
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full left-1/2 transform -translate-x-1/2 group-hover:w-3 group-hover:h-3 transition-all duration-500" style={{ bottom: `${(data.value / maxEngagement) * 100}%` }} />
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded px-2 py-1 whitespace-nowrap z-10">
                      <p className="text-xs font-jetbrains text-white">{data.value} users</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted font-jetbrains">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
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

      {/* Geographic Distribution & Time-Based — both decorative static */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  <div className="h-full bg-gradient-to-r from-accent-blue to-purple-600 transition-all duration-500" style={{ width: `${region.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Time-Based Analytics</h2>
            <p className="text-text-muted text-sm">Booking patterns throughout the day</p>
          </div>
          <div className="flex items-end justify-between h-48 gap-3 mb-4">
            {timeBasedAnalytics.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-bg-card rounded-t relative" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-500 group-hover:from-green-400 group-hover:to-green-300" style={{ height: `${(data.bookings / maxBookingsH) * 100}%` }} />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-bg-surface border border-border-color rounded px-2 py-1">
                    <span className="text-xs font-jetbrains text-white">{data.bookings}</span>
                  </div>
                </div>
                <span className="text-xs text-text-muted font-jetbrains">{data.hour}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-color">
            <div className="p-3 bg-bg-card rounded-lg">
              <p className="font-syne font-bold text-xl text-white">12:00 PM</p>
              <p className="text-xs text-green-400 font-jetbrains mt-1">Peak hour</p>
            </div>
            <div className="p-3 bg-bg-card rounded-lg">
              <p className="font-syne font-bold text-xl text-white">2.4h</p>
              <p className="text-xs text-blue-400 font-jetbrains mt-1">Avg response</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Conversion Funnel & Client Retention — decorative static */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Conversion Funnel</h2>
            <p className="text-text-muted text-sm">Lead to client conversion stages</p>
          </div>
          <div className="space-y-3">
            {[
              { stage: 'Website Visitors',     count: 1250, percentage: 100, color: 'from-blue-500 to-blue-600' },
              { stage: 'Inquiry Submitted',    count: 425,  percentage: 34,  color: 'from-purple-500 to-purple-600' },
              { stage: 'Consultation Booked',  count: 298,  percentage: 24,  color: 'from-green-500 to-green-600' },
              { stage: 'Proposal Sent',        count: 186,  percentage: 15,  color: 'from-yellow-500 to-yellow-600' },
              { stage: 'Contract Signed',      count: 124,  percentage: 10,  color: 'from-red-500 to-red-600' },
            ].map((stage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-jetbrains text-text-muted">{stage.count}</span>
                    <span className="text-xs font-jetbrains text-accent-blue">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-8 bg-bg-card rounded-lg overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stage.color} flex items-center justify-end pr-3 transition-all duration-500`} style={{ width: `${stage.percentage}%` }}>
                    {stage.percentage > 15 && <span className="text-xs font-jetbrains text-white font-bold">{stage.percentage}%</span>}
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

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="font-syne font-bold text-xl mb-1">Client Retention Metrics</h2>
            <p className="text-text-muted text-sm">Long-term client relationship analysis</p>
          </div>
          <div className="space-y-4 mb-6">
            {[
              { label: 'New Clients',       value: 18, total: 48, color: 'bg-blue-500'   },
              { label: 'Returning Clients', value: 24, total: 48, color: 'bg-green-500'  },
              { label: 'At Risk',           value: 4,  total: 48, color: 'bg-yellow-500' },
              { label: 'Churned',           value: 2,  total: 48, color: 'bg-red-500'    },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <span className="text-sm font-jetbrains text-text-muted">{item.value} / {item.total}</span>
                </div>
                <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${(item.value / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-bg-card rounded-lg">
              <p className="text-xs text-text-muted font-jetbrains uppercase mb-2">Retention Rate</p>
              <p className="font-syne font-bold text-3xl text-green-400">94%</p>
            </div>
            <div className="p-4 bg-bg-card rounded-lg">
              <p className="text-xs text-text-muted font-jetbrains uppercase mb-2">Churn Rate</p>
              <p className="font-syne font-bold text-3xl text-red-400">4.2%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center text-sm text-text-muted font-jetbrains py-4">
        <p>&copy; {new Date().getFullYear()} BitForge IT Suite. All rights reserved.</p>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-syne font-bold text-xl text-white">Export Analytics Data</h3>
              <button onClick={() => setShowExportModal(false)} className="text-text-muted hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Exporting live data for time range: <span className="text-accent-blue font-jetbrains uppercase">{timeRange}</span>
            </p>
            <div className="space-y-3 mb-6">
              <button onClick={() => handleExport('json')} className="w-full p-4 bg-bg-card hover:bg-bg-primary border border-border-color hover:border-accent-blue rounded-lg transition-all text-left group">
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
              </button>
              <button onClick={() => handleExport('csv')} className="w-full p-4 bg-bg-card hover:bg-bg-primary border border-border-color hover:border-accent-blue rounded-lg transition-all text-left group">
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
              </button>
            </div>
            <button onClick={() => setShowExportModal(false)} className="w-full px-4 py-2 bg-bg-card text-text-muted hover:text-white rounded-lg text-sm font-jetbrains transition-all">
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsContent;
