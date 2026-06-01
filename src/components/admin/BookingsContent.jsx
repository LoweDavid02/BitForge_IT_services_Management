import React, { useState } from 'react';
import Card from '../Card';
import Badge from '../Badge';

const BookingsContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      label: 'Total Bookings',
      value: '1,284',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'text-blue-400'
    },
    {
      label: 'Pending Confirmation',
      value: '42',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-yellow-400'
    },
    {
      label: 'Completed',
      value: '1,108',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-400'
    },
    {
      label: 'Cancelled',
      value: '134',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-red-400'
    }
  ];

  const bookings = [
    { client: 'Nexus Tech Solutions', service: 'AI Infrastructure Audit', date: '2024-01-15', status: 'CONFIRMED', avatar: 'NT' },
    { client: 'Matrix Logistics', service: 'Web3 Integration', date: '2024-01-16', status: 'PENDING', avatar: 'ML' },
    { client: 'Aether Ventures', service: 'Custom SaaS Dev', date: '2024-01-17', status: 'RESCHEDULED', avatar: 'AV' },
    { client: 'DataSphere Corp', service: 'Cybersecurity Audit', date: '2024-01-18', status: 'CONFIRMED', avatar: 'DS' },
    { client: 'Zenith Fintech', service: 'Mobile App Migration', date: '2024-01-19', status: 'PENDING', avatar: 'ZF' },
    { client: 'Quantum Systems', service: 'Cloud Infrastructure', date: '2024-01-20', status: 'CONFIRMED', avatar: 'QS' },
    { client: 'Nova Enterprises', service: 'DevOps Consultation', date: '2024-01-21', status: 'CONFIRMED', avatar: 'NE' },
    { client: 'Stellar Networks', service: 'Network Security Audit', date: '2024-01-22', status: 'PENDING', avatar: 'SN' }
  ];

  const utilizationData = [
    { day: 'Mon', value: 75 },
    { day: 'Tue', value: 85 },
    { day: 'Wed', value: 65 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 45 },
    { day: 'Sun', value: 30 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'RESCHEDULED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-syne font-bold text-4xl mb-2">Bookings Management</h1>
            <p className="text-text-muted">Manage and track all client bookings</p>
          </div>
          
          {/* Search Bar */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={stat.color}>{stat.icon}</div>
            </div>
            <p className="text-text-muted text-sm mb-1 font-jetbrains uppercase tracking-wider">{stat.label}</p>
            <p className="font-syne font-bold text-3xl text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filter and Export Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="btn-secondary text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
        <button className="btn-secondary text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Bookings Table */}
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
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b border-border-color hover:bg-bg-card transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center">
                        <span className="text-sm font-bold">{booking.avatar}</span>
                      </div>
                      <span className="font-medium">{booking.client}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-muted">{booking.service}</td>
                  <td className="py-4 px-4 text-text-muted font-jetbrains text-sm">{booking.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-jetbrains border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="text-accent-blue hover:text-accent-blue-glow transition-colors" title="Edit">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors" title="Delete">
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
        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="px-4 py-2 bg-accent-blue text-white rounded font-jetbrains text-sm">1</button>
          <button className="px-4 py-2 bg-bg-card text-text-muted rounded hover:bg-bg-surface font-jetbrains text-sm">2</button>
          <button className="px-4 py-2 bg-bg-card text-text-muted rounded hover:bg-bg-surface font-jetbrains text-sm">3</button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forge Utilization Trend */}
        <Card className="p-6">
          <h2 className="font-syne font-bold text-xl mb-6">Forge Utilization Trend</h2>
          
          <div className="flex items-end justify-between h-48 gap-3">
            {utilizationData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-bg-card rounded-t relative" style={{ height: '100%' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-accent-blue to-accent-blue-glow rounded-t transition-all duration-500"
                    style={{ height: `${data.value}%` }}
                  ></div>
                </div>
                <span className="text-xs text-text-muted font-jetbrains">{data.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Automate Confirmation Card */}
        <Card className="p-6 bg-gradient-to-br from-accent-blue/20 to-purple-600/20 border-accent-blue/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent-blue flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-syne font-bold text-xl mb-2">Automate Confirmation</h3>
              <p className="text-text-muted mb-4">
                Reduce pending requests by 65% with AI-driven availability matching
              </p>
              <button className="btn-primary text-sm">Enable Auto-Forge</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingsContent;
