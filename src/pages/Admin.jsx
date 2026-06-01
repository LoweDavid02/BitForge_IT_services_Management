import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Bookings', icon: '📅' },
    { name: 'Team Access', icon: '👥' },
    { name: 'Calendar', icon: '🗓️' },
    { name: 'Feedback', icon: '💬' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const metrics = [
    { label: 'Total Employees', value: '10', icon: '👥', color: 'text-blue-400' },
    { label: 'Admins', value: '1', icon: '🔑', color: 'text-green-400' },
    { label: 'Developers', value: '3', icon: '💻', color: 'text-purple-400' },
    { label: 'QA', value: '2', icon: '🧪', color: 'text-orange-400' },
  ];

  const employees = [
    {
      name: 'Isacaar Manlulu',
      role: 'Project Manager',
      accessLevel: 'ADMIN',
      lastModified: '2026-05-28',
    },
    {
      name: 'Ceejay Santos',
      role: 'Lead Developer',
      accessLevel: 'DEVELOPER',
      lastModified: '2026-05-27',
    },
    {
      name: 'Lei Ann Judea Dico',
      role: 'QA Lead',
      accessLevel: 'QA',
      lastModified: '2026-05-26',
    },
    {
      name: 'Vincent Duriga',
      role: 'Full Stack Developer',
      accessLevel: 'DEVELOPER',
      lastModified: '2026-05-25',
    },
  ];

  const auditLogs = [
    {
      action: 'Access Level Changed',
      user: 'Isacaar Manlulu',
      details: 'Changed Ceejay Santos to DEVELOPER',
      timestamp: '2026-05-28 14:32',
    },
    {
      action: 'New User Added',
      user: 'System',
      details: 'Added Vincent Duriga as DEVELOPER',
      timestamp: '2026-05-27 10:15',
    },
    {
      action: 'Access Level Changed',
      user: 'Isacaar Manlulu',
      details: 'Changed Lei Ann Dico to QA LEAD',
      timestamp: '2026-05-26 16:45',
    },
    {
      action: 'Permission Updated',
      user: 'Isacaar Manlulu',
      details: 'Updated booking permissions for QA team',
      timestamp: '2026-05-25 09:20',
    },
  ];

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'ADMIN':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'DEVELOPER':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'QA':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-surface border-r border-border-color p-6 hidden lg:block">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-accent-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BF</span>
            </div>
            <span className="font-syne font-bold text-xl">BitForge</span>
          </div>
          <p className="text-text-muted text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.name
                  ? 'bg-accent-blue text-white'
                  : 'text-text-muted hover:bg-bg-card hover:text-text-primary'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-syne font-bold text-4xl mb-2">
                Role-Based Access Control
              </h1>
              <p className="text-text-muted">
                Manage team member permissions and access levels
              </p>
            </div>
            <Badge active>ADMIN ONLY</Badge>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm mb-1">{metric.label}</p>
                  <p className={`font-syne font-bold text-3xl ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <div className="text-4xl">{metric.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Employee Access Table */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-2xl">Employee Access</h2>
            <button className="btn-primary text-sm">
              + Add Employee
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color">
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Access Level</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Last Modified</th>
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="border-b border-border-color hover:bg-bg-card transition-colors">
                    <td className="py-4 px-4 font-medium">{employee.name}</td>
                    <td className="py-4 px-4 text-text-muted">{employee.role}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getAccessLevelColor(employee.accessLevel)}`}>
                        {employee.accessLevel}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-text-muted">{employee.lastModified}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="text-accent-blue hover:text-accent-blue-glow transition-colors">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Audit Log */}
        <Card className="p-6">
          <h2 className="font-syne font-bold text-2xl mb-6">Audit Log</h2>
          
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-bg-card rounded-lg hover:bg-bg-surface transition-colors"
              >
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{log.action}</h3>
                    <span className="text-text-muted text-sm">{log.timestamp}</span>
                  </div>
                  <p className="text-text-muted text-sm">
                    <span className="text-accent-blue">{log.user}</span> - {log.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
