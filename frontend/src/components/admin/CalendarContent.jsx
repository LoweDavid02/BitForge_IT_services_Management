import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import Badge from '../Badge';
import { calendarAPI } from '../../api/client';

const CalendarContent = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-indexed

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('month');
  const [showKickoff, setShowKickoff] = useState(true);
  const [showConsultation, setShowConsultation] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Create / Edit modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: '', type: 'consultation', event_date: '', start_time: '', priority: 'MEDIUM', client_name: '',
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchEvents = useCallback(() => {
    setLoading(true);
    calendarAPI.list({ year, month })
      .then(({ data }) => setEvents(data.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [year, month]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const monthLabel = new Date(year, month - 1, 1)
    .toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month, 0).getDate();
  const startDayOfWeek = new Date(year, month - 1, 1).getDay();

  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = (day) => `${year}-${pad(month)}-${pad(day)}`;

  const eventsForDay = (day) => {
    const ds = dateStr(day);
    return events.filter((e) => {
      const d = e.event_date?.slice(0, 10);
      if (d !== ds) return false;
      if (!showKickoff && e.type === 'kickoff') return false;
      if (!showConsultation && e.type === 'consultation') return false;
      if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  const todayAgenda = events.filter((e) => e.event_date?.slice(0, 10) === today.toISOString().slice(0, 10));

  const handleCreateEvent = async () => {
    if (!createForm.title || !createForm.event_date) return;
    setSaving(true);
    try {
      await calendarAPI.create(createForm);
      setShowCreateModal(false);
      setCreateForm({ title: '', type: 'consultation', event_date: '', start_time: '', priority: 'MEDIUM', client_name: '' });
      fetchEvents();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    setDeleting(true);
    try {
      await calendarAPI.destroy(id);
      setShowEventModal(false);
      fetchEvents();
    } catch { /* ignore */ }
    finally { setDeleting(false); }
  };

  const typeColor = (type) => {
    switch (type) {
      case 'kickoff': return 'bg-blue-500 text-white';
      case 'consultation': return 'bg-purple-500 text-white';
      case 'deadline': return 'bg-red-500 text-white';
      default: return 'bg-accent-blue text-white';
    }
  };

  const priorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500/20 text-red-400';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400';
      case 'LOW': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-syne font-bold text-4xl mb-2">Calendar Overview</h1>
          <p className="text-text-muted">Master schedule for consultations and project kickoffs</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search calendar events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 w-full"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex gap-2">
          {['month', 'week', 'day'].map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              className={`px-4 py-2 rounded font-jetbrains text-sm transition-all ${viewMode === v ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'}`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showKickoff} onChange={(e) => setShowKickoff(e.target.checked)} className="w-4 h-4 rounded border-border-color bg-bg-card text-accent-blue" />
            <span className="text-sm text-text-muted font-jetbrains">Kickoff</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showConsultation} onChange={(e) => setShowConsultation(e.target.checked)} className="w-4 h-4 rounded border-border-color bg-bg-card text-accent-blue" />
            <span className="text-sm text-text-muted font-jetbrains">Consultation</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-2xl">{monthLabel}</h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-bg-card rounded transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-bg-card rounded transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-center text-xs font-jetbrains text-text-muted py-2">{d}</div>
            ))}
          </div>

          {/* Calendar days */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startDayOfWeek }).map((_, i) => <div key={`e-${i}`} className="aspect-square" />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dayEvents = eventsForDay(day);
                const isToday = dateStr(day) === today.toISOString().slice(0, 10);
                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-1 hover:bg-bg-card transition-colors cursor-pointer relative ${isToday ? 'border-accent-blue' : 'border-border-color'
                      }`}
                  >
                    <span className={`text-xs font-medium ${isToday ? 'text-accent-blue font-bold' : ''}`}>{day}</span>
                    <div className="mt-0.5 space-y-0.5 overflow-hidden">
                      {dayEvents.slice(0, 2).map((ev, idx) => (
                        <div
                          key={idx}
                          onClick={() => { setSelectedEvent(ev); setShowEventModal(true); }}
                          className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer ${typeColor(ev.type)}`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-text-muted px-1">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Agenda */}
          <Card className="p-6">
            <h2 className="font-syne font-bold text-xl mb-4">Today's Agenda</h2>
            {todayAgenda.length === 0 ? (
              <p className="text-text-muted text-sm">No events scheduled today.</p>
            ) : (
              <div className="space-y-4">
                {todayAgenda.map((item, index) => (
                  <div key={index} className="border-l-4 border-accent-blue pl-4 py-2">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-jetbrains text-text-muted">{item.start_time}</span>
                      <Badge active={item.type === 'kickoff'} className="text-xs">{item.type?.toUpperCase()}</Badge>
                    </div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    {item.client_name && <p className="text-sm text-text-muted">{item.client_name}</p>}
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowCreateModal(true)} className="btn-primary w-full mt-6 text-sm">
              + ADD EVENT
            </button>
          </Card>

          {/* Upcoming / High Priority */}
          <Card className="p-6">
            <h2 className="font-syne font-bold text-xl mb-4">HIGH PRIORITY</h2>
            <div className="space-y-3">
              {events.filter((e) => e.priority === 'HIGH').slice(0, 4).map((ev, i) => (
                <div key={i} className="p-3 bg-bg-card rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-sm">{ev.title}</h3>
                    <span className={`text-xs font-jetbrains px-2 py-1 rounded ${priorityBadge(ev.priority)}`}>{ev.priority}</span>
                  </div>
                  {ev.client_name && <p className="text-xs text-text-muted">{ev.client_name}</p>}
                  <p className="text-xs text-accent-blue font-jetbrains mt-1">{ev.event_date?.slice(0, 10)}</p>
                </div>
              ))}
              {events.filter((e) => e.priority === 'HIGH').length === 0 && (
                <p className="text-text-muted text-sm">No high priority events this month.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Create Calendar Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-muted mb-2">Title *</label>
                <input type="text" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} className="input-field" placeholder="Event title" />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">Client Name</label>
                <input type="text" value={createForm.client_name} onChange={(e) => setCreateForm({ ...createForm, client_name: e.target.value })} className="input-field" placeholder="Optional" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-muted mb-2">Type *</label>
                  <select value={createForm.type} onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })} className="input-field">
                    <option value="kickoff">Kickoff</option>
                    <option value="consultation">Consultation</option>
                    <option value="deadline">Deadline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-2">Priority</label>
                  <select value={createForm.priority} onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })} className="input-field">
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-muted mb-2">Date *</label>
                  <input type="date" value={createForm.event_date} onChange={(e) => setCreateForm({ ...createForm, event_date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-2">Start Time</label>
                  <input type="text" value={createForm.start_time} onChange={(e) => setCreateForm({ ...createForm, start_time: e.target.value })} className="input-field" placeholder="09:00-10:30 AM" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleCreateEvent} className="flex-1 btn-primary" disabled={saving || !createForm.title || !createForm.event_date}>
                {saving ? 'Saving...' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-syne font-bold text-2xl">{selectedEvent.title}</h2>
              <button onClick={() => setShowEventModal(false)} className="text-text-muted hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColor(selectedEvent.type)}`}>{selectedEvent.type?.toUpperCase()}</span>
                {selectedEvent.priority && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityBadge(selectedEvent.priority)}`}>{selectedEvent.priority}</span>
                )}
              </div>
              <p className="text-text-muted text-sm"><span className="text-white font-medium">Date:</span> {selectedEvent.event_date?.slice(0, 10)}</p>
              {selectedEvent.start_time && <p className="text-text-muted text-sm"><span className="text-white font-medium">Time:</span> {selectedEvent.start_time}</p>}
              {selectedEvent.client_name && <p className="text-text-muted text-sm"><span className="text-white font-medium">Client:</span> {selectedEvent.client_name}</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowEventModal(false)} className="flex-1 btn-secondary">Close</button>
              <button
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="flex-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium py-3"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarContent;
