import React, { useState } from 'react';
import Card from '../Card';
import Badge from '../Badge';

const CalendarContent = () => {
  const [viewMode, setViewMode] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [showKickoff, setShowKickoff] = useState(true);
  const [showConsultation, setShowConsultation] = useState(true);

  const todayAgenda = [
    {
      time: '09:00-10:30 AM',
      title: 'Quantum Security Architecture',
      client: 'TechNexus Corp',
      type: 'KICKOFF',
      color: 'bg-blue-500'
    },
    {
      time: '01:00-02:00 PM',
      title: 'Internal Operations Audit',
      client: 'Internal Team',
      type: 'CONSULT',
      color: 'bg-purple-500'
    },
    {
      time: '04:30-05:30 PM',
      title: 'Global Infra Scaling',
      client: 'Lumina Dynamics',
      type: 'KICKOFF',
      color: 'bg-blue-500'
    }
  ];

  const deadlines = [
    { project: 'AI Infrastructure Audit', client: 'Nexus Tech', date: 'Jan 15', priority: 'HIGH' },
    { project: 'Web3 Integration', client: 'Matrix Logistics', date: 'Jan 16', priority: 'MEDIUM' },
    { project: 'Cybersecurity Audit', client: 'DataSphere', date: 'Jan 18', priority: 'HIGH' }
  ];

  // Generate calendar days for October 2023
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 0; // Sunday (October 1, 2023 was a Sunday)

  const events = {
    2: [{ title: 'Client Kickoff', type: 'kickoff' }],
    5: [{ title: 'Consultation', type: 'consultation' }],
    9: [{ title: 'Project Review', type: 'kickoff' }],
    12: [{ title: 'Team Sync', type: 'consultation' }],
    15: [{ title: 'Client Meeting', type: 'kickoff' }],
    18: [{ title: 'Strategy Session', type: 'consultation' }],
    22: [{ title: 'Demo Day', type: 'kickoff' }],
    25: [{ title: 'Q&A Session', type: 'consultation' }],
    28: [{ title: 'Sprint Planning', type: 'kickoff' }]
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-syne font-bold text-4xl mb-2">Calendar Overview</h1>
        <p className="text-text-muted">Master schedule for consultations and project kickoffs</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search calendar events..."
            className="input-field pl-10"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded font-jetbrains text-sm transition-all ${
              viewMode === 'month' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'
            }`}
          >
            MONTH
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded font-jetbrains text-sm transition-all ${
              viewMode === 'week' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'
            }`}
          >
            WEEK
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 rounded font-jetbrains text-sm transition-all ${
              viewMode === 'day' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-muted hover:text-white'
            }`}
          >
            DAY
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted font-jetbrains">FILTER BY:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-bg-card border border-border-color text-text-primary px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            <option value="all">All Service Categories</option>
            <option value="audit">Security Audit</option>
            <option value="development">Development</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTeamMember}
            onChange={(e) => setSelectedTeamMember(e.target.value)}
            className="bg-bg-card border border-border-color text-text-primary px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            <option value="all">All Team Members</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="mike">Mike Johnson</option>
          </select>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showKickoff}
              onChange={(e) => setShowKickoff(e.target.checked)}
              className="w-4 h-4 rounded border-border-color bg-bg-card text-accent-blue focus:ring-accent-blue"
            />
            <span className="text-sm text-text-muted font-jetbrains">Kickoff</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showConsultation}
              onChange={(e) => setShowConsultation(e.target.checked)}
              className="w-4 h-4 rounded border-border-color bg-bg-card text-accent-blue focus:ring-accent-blue"
            />
            <span className="text-sm text-text-muted font-jetbrains">Consultation</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-syne font-bold text-2xl">October 2023</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-bg-card rounded transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-bg-card rounded transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-jetbrains text-text-muted py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              
              {/* Calendar days */}
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className="aspect-square border border-border-color rounded-lg p-2 hover:bg-bg-card transition-colors cursor-pointer relative"
                >
                  <span className="text-sm font-medium">{day}</span>
                  {events[day] && (
                    <div className="mt-1 space-y-1">
                      {events[day].map((event, idx) => (
                        <div
                          key={idx}
                          className="text-xs px-1 py-0.5 bg-accent-blue rounded truncate"
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Today's Agenda Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-syne font-bold text-xl mb-4">Today's Agenda</h2>
            
            <div className="space-y-4">
              {todayAgenda.map((item, index) => (
                <div key={index} className="border-l-4 border-accent-blue pl-4 py-2">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-jetbrains text-text-muted">{item.time}</span>
                    <Badge active={item.type === 'KICKOFF'} className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.client}</p>
                </div>
              ))}
            </div>

            <button className="btn-primary w-full mt-6 text-sm">VIEW FULL SCHEDULE</button>
          </Card>

          {/* Critical Deadlines */}
          <Card className="p-6">
            <h2 className="font-syne font-bold text-xl mb-4">CRITICAL DEADLINES</h2>
            
            <div className="space-y-3">
              {deadlines.map((deadline, index) => (
                <div key={index} className="p-3 bg-bg-card rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{deadline.project}</h3>
                    <span className={`text-xs font-jetbrains px-2 py-1 rounded ${
                      deadline.priority === 'HIGH' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {deadline.priority}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">{deadline.client}</p>
                  <p className="text-xs text-accent-blue font-jetbrains mt-1">{deadline.date}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Admin Profile */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center">
                <span className="font-bold">AF</span>
              </div>
              <div>
                <h3 className="font-medium">Admin Forge-Master</h3>
                <p className="text-xs text-text-muted">System Lead</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarContent;
