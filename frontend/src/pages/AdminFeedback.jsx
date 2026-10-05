import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { feedbackAPI, analyticsAPI } from '../api/client';

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [meta, setMeta] = useState({ total: 0, last_page: 1 });
  const [stats, setStats] = useState({ total: 0, avg_rating: 0 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchFeedback = useCallback(() => {
    setLoading(true);
    feedbackAPI.list({
      page: currentPage,
      search: searchQuery || undefined,
      status: filterStatus || undefined,
      per_page: 15,
    })
      .then(({ data }) => {
        setFeedbackList(data.data || []);
        setMeta(data.meta || { total: 0, last_page: 1 });
      })
      .catch(() => setFeedbackList([]))
      .finally(() => setLoading(false));
  }, [currentPage, searchQuery, filterStatus]);

  useEffect(() => {
    fetchFeedback();
    analyticsAPI.dashboard()
      .then(({ data }) => setStats(data.data?.feedback || { total: 0, avg_rating: 0 }))
      .catch(() => { });
  }, [fetchFeedback]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await feedbackAPI.updateStatus(id, newStatus);
      fetchFeedback();
    } catch { /* ignore */ }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this feedback entry?')) return;
    try {
      await feedbackAPI.destroy(id);
      fetchFeedback();
    } catch { /* ignore */ }
  };

  const handleExportCSV = async () => {
    try {
      const response = await feedbackAPI.list({ per_page: 9999 });
      const rows = response.data.data || [];
      const csv = [
        ['Name', 'Email', 'Service', 'Rating', 'Status', 'Message', 'Date'],
        ...rows.map((f) => [
          f.full_name, f.email, f.service_name, f.rating,
          f.status, `"${(f.message || '').replace(/"/g, '""')}"`,
          f.created_at?.slice(0, 10),
        ]),
      ].map((r) => r.join(',')).join('\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `feedback-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch { /* ignore */ }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new': return 'bg-accent-blue text-white';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50';
      case 'resolved': return 'bg-green-500/20 text-green-400 border border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${star <= rating ? 'text-accent-blue fill-current' : 'text-border-color'}`}
          fill={star <= rating ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-text-muted">MANAGEMENT CONSOLE</span>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-4">
          <h1 className="font-syne font-bold text-4xl">User Feedback & Reviews</h1>
          <div className="flex gap-3">
            <button onClick={handleExportCSV} className="px-4 py-2 border border-border-color text-text-primary rounded-lg hover:bg-bg-card transition-all text-sm font-medium">
              EXPORT CSV
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-deep transition-all text-sm font-medium">
              FILTER
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-bg-card border border-border-color">
          <div className="text-text-muted text-xs uppercase tracking-wider mb-2 font-jetbrains">AVERAGE RATING</div>
          <div className="text-5xl font-bold text-white font-syne">
            {(stats.avg_rating || 0).toFixed(1)} <span className="text-2xl text-text-muted">/5.0</span>
          </div>
        </Card>
        <Card className="p-6 bg-bg-card border border-border-color">
          <div className="text-text-muted text-xs uppercase tracking-wider mb-2 font-jetbrains">TOTAL REVIEWS</div>
          <div className="text-5xl font-bold text-white font-syne">
            {stats.total} <span className="text-2xl text-text-muted">Submissions</span>
          </div>
        </Card>
        <Card className="p-6 bg-bg-card border border-border-color">
          <div className="text-text-muted text-xs uppercase tracking-wider mb-2 font-jetbrains">SHOWING</div>
          <div className="text-5xl font-bold text-white font-syne">
            {meta.total} <span className="text-2xl text-text-muted">Records</span>
          </div>
        </Card>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-6 mb-6 bg-bg-surface border-accent-blue/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Name, email, service..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-2">Status</label>
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="input-field">
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setSearchQuery(''); setFilterStatus(''); setCurrentPage(1); }} className="btn-secondary w-full">
                Clear
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Feedback Table */}
      <Card className="p-6 bg-bg-card border border-border-color">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne font-bold text-2xl">Feedback Inbox</h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-border-color text-text-muted text-xs uppercase tracking-wider font-jetbrains">
          <div className="col-span-3">USER</div>
          <div className="col-span-2">SERVICE</div>
          <div className="col-span-2">RATING</div>
          <div className="col-span-2">DATE</div>
          <div className="col-span-3">ACTIONS</div>
        </div>

        <div className="space-y-4 mt-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : feedbackList.length === 0 ? (
            <p className="text-center text-text-muted py-12">No feedback found.</p>
          ) : feedbackList.map((fb) => (
            <div key={fb.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-border-color hover:bg-bg-surface transition-colors rounded-lg px-2">
              {/* User */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-semibold text-sm flex-shrink-0">
                  {fb.avatar_initials || fb.full_name?.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{fb.full_name}</div>
                  <div className="text-xs text-text-muted truncate">{fb.email}</div>
                </div>
              </div>

              {/* Service */}
              <div className="col-span-2">
                <span className="text-xs font-jetbrains uppercase tracking-wider text-accent-blue truncate block">
                  {fb.service_name}
                </span>
              </div>

              {/* Rating */}
              <div className="col-span-2">{renderStars(fb.rating)}</div>

              {/* Date */}
              <div className="col-span-2">
                <span className="text-xs text-text-muted font-jetbrains">
                  {fb.created_at?.slice(0, 10)}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-3 flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getStatusBadge(fb.status)}`}>
                  {fb.status === 'in-progress' ? 'IN PROGRESS' : fb.status?.toUpperCase()}
                </span>

                {/* Cycle status */}
                {fb.status === 'new' && (
                  <button
                    onClick={() => handleStatusChange(fb.id, 'in-progress')}
                    className="p-1 hover:bg-bg-card rounded transition-colors text-yellow-400"
                    title="Mark In Progress"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                )}
                {fb.status === 'in-progress' && (
                  <button
                    onClick={() => handleStatusChange(fb.id, 'resolved')}
                    className="p-1 hover:bg-bg-card rounded transition-colors text-green-400"
                    title="Mark Resolved"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}

                {/* Delete */}
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="p-1 hover:bg-bg-card rounded transition-colors text-red-400"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded font-jetbrains text-sm ${currentPage === page ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:bg-bg-surface'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminFeedback;
