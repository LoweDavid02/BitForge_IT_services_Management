import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Team = () => {
  const [activeTab, setActiveTab] = useState('All');

  const departments = ['All', 'Management', 'Design', 'Development', 'QA'];

  const teamMembers = [
    {
      name: 'Isacaar Manlulu',
      role: 'Project Manager / Proprietor',
      department: 'Management',
      featured: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Numer Lumbrino',
      role: 'Business Analyst',
      department: 'Management',
      featured: false,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      name: 'Ma. Hermosa Malapit',
      role: 'Design Lead',
      department: 'Design',
      featured: false,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Rizalyne Asaldo',
      role: 'UI/UX Designer',
      department: 'Design',
      featured: false,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
      name: 'Lowe David Tubat',
      role: 'UI/UX Designer & Front-End',
      department: 'Design',
      featured: false,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
      name: 'Ceejay Santos',
      role: 'Lead Developer',
      department: 'Development',
      featured: false,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    },
    {
      name: 'Vincent Duriga',
      role: 'Full Stack Developer',
      department: 'Development',
      featured: false,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    {
      name: 'Rasheed Gavin Esponga',
      role: 'Full Stack Developer',
      department: 'Development',
      featured: false,
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    },
    {
      name: 'Lei Ann Judea Dico',
      role: 'QA Lead',
      department: 'QA',
      featured: false,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    },
    {
      name: 'Jorilyn Pantallano',
      role: 'QA Tester',
      department: 'QA',
      featured: false,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    },
  ];

  const filteredMembers = activeTab === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeTab);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-jetbrains text-xs uppercase tracking-widest text-accent-blue">
            Our People
          </span>
          <h1 className="font-syne font-bold text-5xl md:text-6xl mt-4">
            Meet the Team
          </h1>
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
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === dept
                  ? 'bg-accent-blue text-white'
                  : 'bg-bg-card text-text-muted hover:bg-accent-blue/20'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <Card 
              key={index} 
              hover 
              className={`text-center ${member.featured ? 'ring-2 ring-accent-blue' : ''}`}
            >
              {member.featured && (
                <div className="mb-4">
                  <Badge active>FEATURED</Badge>
                </div>
              )}
              
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent-blue/20">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="font-syne font-bold text-xl mb-2">
                {member.name}
              </h3>
              
              <p className="text-accent-blue font-medium mb-2">
                {member.role}
              </p>
              
              <Badge>{member.department}</Badge>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No team members found in this department.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="p-12 bg-gradient-to-br from-accent-blue/10 to-transparent">
            <h2 className="font-syne font-bold text-3xl md:text-4xl mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-text-muted text-lg mb-6">
              We're always looking for talented individuals to join our growing team
            </p>
            <a 
              href="mailto:careers@bitforge.com"
              className="inline-block btn-primary"
            >
              View Open Positions
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;
