import React, { useState } from 'react';
import Card from '../Card';
import Badge from '../Badge';

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [developerMode, setDeveloperMode] = useState(false);
  
  const [formData, setFormData] = useState({
    brandName: 'BitForge IT Suite',
    contactEmail: 'admin@bitforge.io',
    timezone: 'UTC',
    language: 'en-US'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      brandName: 'BitForge IT Suite',
      contactEmail: 'admin@bitforge.io',
      timezone: 'UTC',
      language: 'en-US'
    });
  };

  const handleSave = () => {
    // Save logic here
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'GENERAL' },
    { id: 'security', label: 'SECURITY' },
    { id: 'notifications', label: 'NOTIFICATIONS' },
    { id: 'api', label: 'API KEYS' }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-syne font-bold text-4xl mb-2">CORE ARCHITECTURE</h1>
        <h2 className="font-syne font-bold text-2xl text-text-muted mb-2">SYSTEM SETTINGS</h2>
        <p className="text-text-muted">Configure system parameters and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border-color overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-jetbrains text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-accent-blue border-b-2 border-accent-blue'
                : 'text-text-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2">
          {activeTab === 'general' && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-syne font-bold text-xl">General Settings</h2>
                <Badge active className="text-xs">BF-9902</Badge>
              </div>

              <div className="space-y-6">
                {/* Brand Name */}
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                {/* System Timezone */}
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    System Timezone
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="GMT">GMT (Greenwich Mean Time)</option>
                    <option value="JST">JST (Japan Standard Time)</option>
                  </select>
                </div>

                {/* Interface Language */}
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Interface Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button onClick={handleReset} className="btn-secondary">
                    Reset to Default
                  </button>
                  <button onClick={handleSave} className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="font-syne font-bold text-xl mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Two-Factor Authentication
                  </label>
                  <div className="flex items-center justify-between p-4 bg-bg-card rounded-lg">
                    <div>
                      <p className="font-medium mb-1">Enable 2FA</p>
                      <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Session Timeout
                  </label>
                  <select className="input-field">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Password Policy
                  </label>
                  <div className="space-y-2 p-4 bg-bg-card rounded-lg">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-border-color bg-bg-surface text-accent-blue focus:ring-accent-blue" />
                      <span className="text-sm">Require uppercase letters</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-border-color bg-bg-surface text-accent-blue focus:ring-accent-blue" />
                      <span className="text-sm">Require numbers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-border-color bg-bg-surface text-accent-blue focus:ring-accent-blue" />
                      <span className="text-sm">Require special characters</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-border-color bg-bg-surface text-accent-blue focus:ring-accent-blue" />
                      <span className="text-sm">Minimum 12 characters</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="btn-primary">Save Security Settings</button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="font-syne font-bold text-xl mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', desc: 'Receive email alerts for important events' },
                  { title: 'Booking Confirmations', desc: 'Get notified when bookings are confirmed' },
                  { title: 'System Alerts', desc: 'Critical system notifications and warnings' },
                  { title: 'Weekly Reports', desc: 'Receive weekly performance summaries' },
                  { title: 'Team Updates', desc: 'Notifications about team member activities' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-bg-card rounded-lg">
                    <div>
                      <p className="font-medium mb-1">{item.title}</p>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={index < 3} className="sr-only peer" />
                      <div className="w-11 h-6 bg-bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button className="btn-primary">Save Preferences</button>
              </div>
            </Card>
          )}

          {activeTab === 'api' && (
            <Card className="p-6">
              <h2 className="font-syne font-bold text-xl mb-6">API Keys Management</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-medium text-yellow-400 mb-1">Keep your API keys secure</p>
                      <p className="text-sm text-text-muted">Never share your API keys publicly or commit them to version control</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Production API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="bf_prod_••••••••••••••••"
                      readOnly
                      className="input-field flex-1"
                    />
                    <button className="btn-secondary">Regenerate</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">
                    Development API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="bf_dev_••••••••••••••••"
                      readOnly
                      className="input-field flex-1"
                    />
                    <button className="btn-secondary">Regenerate</button>
                  </div>
                </div>

                <div>
                  <button className="btn-primary">Generate New Key</button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Forge Maintenance */}
          <Card className="p-6">
            <h3 className="font-syne font-bold text-lg mb-4">FORGE MAINTENANCE</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Developer Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={developerMode}
                      onChange={(e) => setDeveloperMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
                  </label>
                </div>
                <p className="text-xs text-text-muted">
                  Enable advanced debugging and development tools
                </p>
              </div>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="font-syne font-bold text-lg mb-4">SYSTEM STATUS</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-muted font-jetbrains">Node Latency</span>
                  <span className="text-sm font-medium text-green-400">12ms</span>
                </div>
                <div className="w-full bg-bg-card rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-muted font-jetbrains">Memory Usage</span>
                  <span className="text-sm font-medium">4.2GB / 16GB</span>
                </div>
                <div className="w-full bg-bg-card rounded-full h-2">
                  <div className="bg-accent-blue h-2 rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-color">
                <p className="text-xs text-text-muted font-jetbrains mb-1">LAST BACKUP</p>
                <p className="text-sm font-medium">2024-01-10 03:00 UTC</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-text-muted font-jetbrains mb-1">UPTIME CLUSTER</p>
                <p className="text-2xl font-syne font-bold text-green-400">94.04%</p>
              </div>
            </div>
          </Card>

          {/* Admin Profile */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center">
                <span className="font-bold">AU</span>
              </div>
              <div>
                <h3 className="font-medium">ADMIN USER</h3>
                <p className="text-xs text-text-muted font-jetbrains">ROOT ACCESS</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
