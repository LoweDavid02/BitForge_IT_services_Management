import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Badge from '../Badge';
import { settingsAPI } from '../../api/client';

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [developerMode, setDeveloperMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    brand_name: 'BitForge IT Suite',
    contact_email: 'admin@bitforge.io',
    timezone: 'UTC',
    language: 'en-US',
  });

  useEffect(() => {
    settingsAPI.show()
      .then(({ data }) => {
        const s = data.data;
        setFormData({
          brand_name: s.brand_name || 'BitForge IT Suite',
          contact_email: s.contact_email || 'admin@bitforge.io',
          timezone: s.timezone || 'UTC',
          language: s.language || 'en-US',
        });
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFormData({ brand_name: 'BitForge IT Suite', contact_email: 'admin@bitforge.io', timezone: 'UTC', language: 'en-US' });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.update(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const tabs = [
    { id: 'general', label: 'GENERAL' },
    { id: 'security', label: 'SECURITY' },
    { id: 'notifications', label: 'NOTIFICATIONS' },
    { id: 'api', label: 'API KEYS' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-4xl mb-2">CORE ARCHITECTURE</h1>
        <h2 className="font-syne font-bold text-2xl text-text-muted mb-2">SYSTEM SETTINGS</h2>
        <p className="text-text-muted">Configure system parameters and preferences</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-green-400 font-medium">Settings saved successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border-color overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-jetbrains text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                ? 'text-accent-blue border-b-2 border-accent-blue'
                : 'text-text-muted hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'general' && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-syne font-bold text-xl">General Settings</h2>
                <Badge active className="text-xs">BF-9902</Badge>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">Brand Name</label>
                    <input type="text" name="brand_name" value={formData.brand_name} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">Contact Email</label>
                    <input type="email" name="contact_email" value={formData.contact_email} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">System Timezone</label>
                    <select name="timezone" value={formData.timezone} onChange={handleInputChange} className="input-field">
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                      <option value="PST">PST (Pacific Standard Time)</option>
                      <option value="GMT">GMT (Greenwich Mean Time)</option>
                      <option value="JST">JST (Japan Standard Time)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">Interface Language</label>
                    <select name="language" value={formData.language} onChange={handleInputChange} className="input-field">
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button onClick={handleReset} className="btn-secondary">Reset to Default</button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary">
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="font-syne font-bold text-xl mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-jetbrains text-text-muted mb-2 uppercase tracking-wider">Two-Factor Authentication</label>
                  <div className="flex items-center justify-between p-4 bg-bg-card rounded-lg">
                    <div>
                      <p className="font-medium mb-1">Enable 2FA</p>
                      <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-bg-surface rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
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
                  { title: 'Team Updates', desc: 'Notifications about team member activities' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-bg-card rounded-lg">
                    <div>
                      <p className="font-medium mb-1">{item.title}</p>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={index < 3} className="sr-only peer" />
                      <div className="w-11 h-6 bg-bg-surface rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
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
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg mb-6">
                <p className="font-medium text-yellow-400 mb-1">Keep your API keys secure</p>
                <p className="text-sm text-text-muted">Never share your API keys publicly or commit them to version control</p>
              </div>
              <p className="text-text-muted text-sm">API key management is not yet enabled in this environment.</p>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-syne font-bold text-lg mb-4">FORGE MAINTENANCE</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Developer Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={developerMode} onChange={(e) => setDeveloperMode(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-surface rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
              </label>
            </div>
            <p className="text-xs text-text-muted">Enable advanced debugging and development tools</p>
          </Card>

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
              <div className="pt-4 border-t border-border-color">
                <p className="text-xs text-text-muted font-jetbrains mb-1">UPTIME CLUSTER</p>
                <p className="text-2xl font-syne font-bold text-green-400">99.9%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
