import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import AntiGravityBackground from '../components/AntiGravityBackground';
import { teamAPI } from '../api/client';

const Team = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const departments = ['All', 'Management', 'Design', 'Development', 'QA'];

  useEffect(() => {
    teamAPI.list()
      .then(({ data }) => setMembers(data.data || []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredMembers = activeTab === 'All'
    ? members
    : members.filter((m) => m.department === activeTab);

  return (
    <AntiGravityBackground>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
              Our People
            </span>
            <h1 className="font-syne font-bold text-5xl md:text-6xl mt-4">Meet the Team</h1>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              Talented professionals dedicated to delivering exceptional results
            </p>
          </div>

          {/* Department Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === dept
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-card text-text-muted hover:bg-accent-blue/20'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMembers.map((member) => (
                  <Card
                    key={member.id}
                    hover
                    className={`text-center group ${member.is_featured ? 'ring-2 ring-accent-blue' : ''}`}
                  >
                    {member.is_featured && (
                      <div className="mb-4"><Badge active>FEATURED</Badge></div>
                    )}

                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent-blue/20">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center">
                          <span className="font-syne font-bold text-2xl text-white">
                            {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-syne font-bold text-xl mb-2">{member.name}</h3>
                    <p className="text-accent-blue font-medium mb-2">{member.role}</p>
                    <Badge>{member.department}</Badge>

                    <div className="mt-4 pt-4 border-t border-border-color space-y-2">
                      {/* Email */}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center gap-2 text-text-muted hover:text-accent-blue transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{member.email}</span>
                        </a>
                      )}

                      {/* Phone */}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center justify-center gap-2 text-text-muted hover:text-accent-blue transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {member.phone}
                        </a>
                      )}

                      {/* Portfolio */}
                      {member.portfolio_url ? (
                        <a
                          href={member.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-accent-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-blue-deep transition-all mt-2 w-full"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          View Portfolio
                        </a>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-2 bg-bg-card text-text-muted px-4 py-2 rounded-lg text-sm font-medium mt-2 w-full cursor-not-allowed opacity-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          No Portfolio Available
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {filteredMembers.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-text-muted text-lg">No team members found in this department.</p>
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-20 text-center">
            <Card className="p-12 bg-gradient-to-br from-accent-blue/10 to-transparent">
              <h2 className="font-syne font-bold text-3xl md:text-4xl mb-4">Want to Join Our Team?</h2>
              <p className="text-text-muted text-lg mb-6">
                We're always looking for talented individuals to join our growing team
              </p>
              <a href="mailto:careers@bitforge.com" className="inline-block btn-primary">
                View Open Positions
              </a>
            </Card>
          </div>
        </div>
      </div>
    </AntiGravityBackground>
  );
};

export default Team;
