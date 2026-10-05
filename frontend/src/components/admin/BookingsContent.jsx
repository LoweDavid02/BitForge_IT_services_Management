import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import { bookingsAPI, analyticsAPI } from '../../api/client';

const BookingsContent = () => {
  const [bookings, setBookings] = useState([]);
  const [meta, setMeta] = useState({ total: 0, last_page: 1 });
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editForm, setEditForm] = useState({ client_name: '', service_name: '', scheduled_date: '', status: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(() => {
    setLoading(true);
    bookingsAPI.list({
      page: currentPage,
      search: searchQuery || undefined,
      status: filterStatus !== 'all' ? filterStatus : undefined,
      service: filterService !== 'all' ? filterService : undefined,
      per_page: 15,
    })
      .then(({ data }) => {
        setBookings(data.data || []);
        setMeta(data.meta || { total: 0, last_page: 1 });
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [currentPage, searchQuery, filterStatus, filterService]);

  // Load bookings + analytics stats
  useEffect(() => {
    fetchBookings();
    analyticsAPI.dashboard()
      .then(({ data }) => {
        const b = data.data?.bookings || {};
        setStats({
          total: b.total || 0,
          pending: b.pending || 0,
          completed: b.completed || 0,
          cancelled: b.cancelled || 0,
        });
      })
      .catch(() => { });
  }, [fetchBookings]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setCurrentPage(1); fetchBookings(); }, 400);
    return () => clearTimeout(t);
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditForm({
      client_name: booking.client_name,
      service_name: booking.service_name,
      scheduled_date: booking.scheduled_date,
      status: booking.status,
    });
    setShowEditModal(true);
    setError('');
  };

  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const saveEdit = async () => {
    setSaving(true);
    setError('');
    try {
      await bookingsAPI.update(selectedBooking.id, editForm);
      setShowEditModal(false);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await bookingsAPI.destroy(selectedBooking.id);
      setShowDeleteModal(false);
      fetchBookings();
    } catch {
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await bookingsAPI.export({
        search: searchQuery || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        service: filterService !== 'all' ? filterService : undefined,
      });
      const url = URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `bookings-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch { /* ignore */ }
    setShowExportModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'RESCHEDULED': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'COMPLETED': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const statCards = [
    { label: 'Total Bookings', value: stats.total, color: 'text-blue-400' },
    { label: 'Pending Confirmation', value: stats.pending, color: 'text-yellow-400' },
    { label: 'Completed', value: stats.completed, color: 'text-green-400' },
    { label: 'Cancelled', value: stats.cancelled, color: 'text-red-400' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-syne font-bold text-4xl mb-2">Bookings Management</h1>
            <p className="text-text-muted">Manage and track all client bookings</p>
          </div>
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((s, i) => (
          <Card key={i} className="p-6">
            <p className="text-text-muted text-sm mb-1 font-jetbrains uppercase tracking-wider">{s.label}</p>
            <p className={`font-syne font-bold text-3xl ${s.color}`}>{s.value.toLocaleString()}</p>
          </Card>
        ))}
      </div>

      {/* Filter / Export */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setShowFilterPanel(!showFilterPanel)} className="btn-secondary text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
        <button onClick={() => setShowExportModal(true)} className="btn-secondary text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <Card className="p-6 mb-6 bg-bg-surface border-accent-blue/30">
          <h3 className="font-syne font-bold text-lg mb-4">Filter Bookings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-2">Status</label>
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="input-field">
                <option value="all">All Statuses</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PENDING">Pending</option>
                <option value="RESCHEDULED">Rescheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-2">Service (keyword)</label>
              <input
                type="text"
                value={filterService === 'all' ? '' : filterService}
                onChange={(e) => { setFilterService(e.target.value || 'all'); setCurrentPage(1); }}
                placeholder="e.g. Web, AI, SaaS"
                className="input-field"
              />
            </div>
            <div className="flex items-end">
              <button onClick={() => { setFilterStatus('all'); setFilterService('all'); setCurrentPage(1); }} className="btn-secondary w-full">
                Clear Filters
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Table */}
      <Card className="p-6 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left py-3 px-4 font-jetbrains text-xs text-text-muted uppercase tracking-wider">Client Name</th>
                <th className="text-left py-3 px-4 font-jetbrains text-xs text-text-muted uppercase tracking-wider">Service</th>
                <th className="text-left py-3 px-4 font-jetbrains text-xs text-text-muted uppercase tracking-wider">Scheduled Date</th>
                <th className="text-left py-3 px-4 font-jetbrains text-xs text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 font-jetbrains text-xs text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center">
                  <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
                </td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-text-muted">No bookings found.</td></tr>
              ) : bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border-color hover:bg-bg-card transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">{booking.avatar_initials || '??'}</span>
                      </div>
                      <div>
                        <p className="font-medium">{booking.client_name}</p>
                        <p className="text-xs text-text-muted">{booking.client_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-muted">{booking.service_name}</td>
                  <td className="py-4 px-4 text-text-muted font-jetbrains text-sm">{booking.scheduled_date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-jetbrains border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(booking)} className="text-accent-blue hover:text-accent-blue-glow transition-colors" title="Edit">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(booking)} className="text-red-400 hover:text-red-300 transition-colors" title="Delete">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Edit Booking</h2>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-muted mb-2">Client Name</label>
                <input type="text" value={editForm.client_name} onChange={(e) => setEditForm({ ...editForm, client_name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">Service</label>
                <input type="text" value={editForm.service_name} onChange={(e) => setEditForm({ ...editForm, service_name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">Date</label>
                <input type="date" value={editForm.scheduled_date} onChange={(e) => setEditForm({ ...editForm, scheduled_date: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">Status</label>
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="input-field">
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="RESCHEDULED">Rescheduled</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="flex-1 btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={saveEdit} className="flex-1 btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-syne font-bold text-xl">Delete Booking</h2>
                <p className="text-text-muted text-sm">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-text-muted mb-6">
              Are you sure you want to delete the booking for <span className="text-white font-medium">{selectedBooking?.client_name}</span>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 btn-secondary" disabled={deleting}>Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium py-3" disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Export Bookings</h2>
            <p className="text-text-muted mb-6">Download all {meta.total} matching bookings as CSV.</p>
            <div className="space-y-3">
              <button onClick={handleExportCSV} className="w-full btn-primary flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export as CSV
              </button>
              <button onClick={() => setShowExportModal(false)} className="w-full btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsContent;
