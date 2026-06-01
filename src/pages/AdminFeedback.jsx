import React, { useState } from 'react';
import Card from '../components/Card';

const AdminFeedback = () => {
  // Sample feedback data
  const feedbackData = [
    {
      id: 1,
      user: { name: 'Alex Rivera', avatar: 'AR', email: 'alex.rivera@email.com' },
      service: 'WEB DEV',
      rating: 5,
      date: '24 OCT 2024',
      status: 'new',
      message: 'Excellent work on the new dashboard. The team delivered beyond expectations.'
    },
    {
      id: 2,
      user: { name: 'Sarah Chen', avatar: 'SC', email: 'sarah.chen@email.com' },
      service: 'UI/UX DESIGN',
      rating: 5,
      date: '22 OCT 2024',
      status: 'in-progress',
      message: 'Great design work! Very intuitive and modern interface.'
    },
    {
      id: 3,
      user: { name: 'Jordan Smyth', avatar: 'JS', email: 'jordan.smyth@email.com' },
      service: 'API ARCHITECTURE',
      rating: 5,
      date: '21 OCT 2024',
      status: 'resolved',
      message: 'Most users appreciate the precision of the new Forge API integrations.'
    }
  ];

  const stats = {
    averageRating: 4.9,
    totalReviews: 142,
    pendingResponses: 8
  };

  const sentimentAnalysis = {
    positive: 134,
    neutral: 6,
    critical: 2,
    score: 94
  };

  const liveActivity = [
    { user: 'Admin @Marcus', action: 'replied to Alex Rivera', time: '2 MINUTES AGO' },
    { user: 'New feedback received', action: 'for UI/UX Audit', time: '15 MINUTES AGO' },
    { user: 'Feedback #BF-7712', action: 'marked as Resolved', time: '1 HOUR AGO' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return 'bg-accent-blue text-white';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-accent-blue fill-current' : 'text-border-color'}`}
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-text-muted">
          MANAGEMENT CONSOLE
        </span>
        <div className="flex items-center justify-between mt-2">
          <h1 className="font-syne font-bold text-4xl">User Feedback & Reviews</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-border-color text-text-primary rounded-lg hover:bg-bg-card transition-all text-sm font-medium">
              EXPORT CSV
            </button>
            <button className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-deep transition-all text-sm font-medium">
              BULK ACTION
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-bg-card border border-border-color">
          <div className="text-text-muted text-xs uppercase tracking-wider mb-2 font-jetbrains">AVERAGE RATING</div>
          <div className="text-5xl font-bold text-white font-syne">
            {stats.averageRating} <span className="text-2xl text-text-muted">/5.0</span>
          </div>
        </Card>

        <Card className="p-6 bg-bg-card border border-border-color">
          <div className="text-text-muted text-xs uppercase tracking-wider mb-2 font-jetbrains">TOTAL REVIEWS</div>
          <div className="text-5xl font-bold text-white font-syne">
            {stats.totalReviews} <span className="text-2xl text-text-muted">Submissions</span>
          </div>
        </Card>

        <Card className="p-6 bg-bg-card border border-border-color">
          <div className="text-text-muted text-xs uppercase tracking-wider mb-2 font-jetbrains">PENDING RESPONSES</div>
          <div className="text-5xl font-bold text-white font-syne">
            {stats.pendingResponses} <span className="text-2xl text-text-muted">Required</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Inbox */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-bg-card border border-border-color">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-syne font-bold text-2xl">Feedback Inbox</h2>
              <button className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                FILTERS
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-border-color text-text-muted text-xs uppercase tracking-wider font-jetbrains">
              <div className="col-span-3">USER</div>
              <div className="col-span-2">SERVICE</div>
              <div className="col-span-2">RATING</div>
              <div className="col-span-2">DATE</div>
              <div className="col-span-3">ACTIONS</div>
            </div>

            {/* Feedback List */}
            <div className="space-y-4 mt-4">
              {feedbackData.map((feedback) => (
                <div key={feedback.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-border-color hover:bg-bg-surface transition-colors rounded-lg px-2">
                  {/* User */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-semibold text-sm">
                      {feedback.user.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{feedback.user.name}</div>
                      <div className="text-xs text-text-muted">{feedback.user.email.split('@')[0]}...</div>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="col-span-2">
                    <span className="text-xs font-jetbrains uppercase tracking-wider text-accent-blue">
                      {feedback.service}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="col-span-2">
                    {renderStars(feedback.rating)}
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <span className="text-xs text-text-muted font-jetbrains">{feedback.date}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getStatusBadge(feedback.status)}`}>
                      {feedback.status === 'new' ? 'NEW' : feedback.status === 'in-progress' ? 'IN PROGRESS' : 'RESOLVED'}
                    </span>
                    <button className="p-1 hover:bg-bg-card rounded transition-colors">
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-bg-card rounded transition-colors">
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 text-text-muted hover:text-text-primary transition-colors text-sm font-medium uppercase tracking-wider">
              LOAD MORE RECORDS
            </button>
          </Card>

          {/* Generate Report Button */}
          <button className="w-full mt-4 py-3 bg-accent-blue/10 border border-accent-blue text-accent-blue rounded-lg hover:bg-accent-blue hover:text-white transition-all font-medium">
            GENERATE REPORT
          </button>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Sentiment Analysis */}
          <Card className="p-6 bg-bg-card border border-border-color">
            <h3 className="font-syne font-bold text-lg mb-4">SENTIMENT ANALYSIS</h3>

            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-white font-syne mb-2">{sentimentAnalysis.score}%</div>
              <div className="text-text-muted text-xs uppercase tracking-wider font-jetbrains flex items-center justify-center gap-2">
                POSITIVE SCORE
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Positive</span>
                  <span className="text-white font-medium">{sentimentAnalysis.positive}</span>
                </div>
                <div className="h-2 bg-bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent-blue rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Neutral</span>
                  <span className="text-white font-medium">{sentimentAnalysis.neutral}</span>
                </div>
                <div className="h-2 bg-bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: '4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Critical</span>
                  <span className="text-white font-medium">{sentimentAnalysis.critical}</span>
                </div>
                <div className="h-2 bg-bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-bg-surface rounded-lg">
              <p className="text-text-muted text-sm italic leading-relaxed">
                "Most users appreciate the precision of the new Forge API integrations. Responses are described as 'blazing fast'."
              </p>
            </div>
          </Card>

          {/* Live Activity */}
          <Card className="p-6 bg-bg-card border border-border-color">
            <h3 className="font-syne font-bold text-lg mb-4">LIVE ACTIVITY</h3>
            <div className="space-y-4">
              {liveActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-accent-blue' : 'bg-green-400'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{activity.user}</p>
                    <p className="text-sm text-text-muted">{activity.action}</p>
                    <p className="text-xs text-text-muted font-jetbrains mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
