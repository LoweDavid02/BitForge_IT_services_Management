// frontend/src/components/admin/TeamAccessContent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import Badge from '../Badge';
import { teamAPI, auditAPI } from '../../api/client';

const TeamAccessContent = () => {
  // ── Data state ──────────────────────────────────────────────────────────
  const [members, setMembers]     = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading]     = useState(true);

  // ── Modal state ─────────────────────────────────────────────────────────
  const [showAddModal, setShowAddModal]       = useState(false);
  const [showEditModal, setShowEditModal]     = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedMember, setSelectedMember]   = useState(null);

  // ── Form state ───────────────────────────────────────────────────────────
  const emptyForm = { name: '', role: '', department: 'Development', access_level: 'DEVELOPER', email: '', phone: '' };
  const [addForm, setAddForm]   = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [removing, setRemoving] = useState(false);
  const [formError, setFormError] = useState('');

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchAll = useCallback(() => {
    setLoading(true);
    Promise.all([
      teamAPI.list(),
      auditAPI.list({ per_page: 10 }),
    ])
      .then(([teamRes, auditRes]) => {
        setMembers(teamRes.data.data || []);
        setAuditLogs(auditRes.data.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Derived metrics from live data ───────────────────────────────────────
  const total     = members.length;
  const admins    = members.filter((m) => m.access_level === 'ADMIN').length;
  const devs      = members.filter((m) => m.access_level === 'DEVELOPER').length;
  const qa        = members.filter((m) => m.access_level === 'QA').length;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAdd = async () => {
    if (!addForm.name || !addForm.role) { setFormError('Name and role are required.'); return; }
    setSaving(true); setFormError('');
    try {
      await teamAPI.create(addForm);
      setShowAddModal(false);
      setAddForm(emptyForm);
      fetchAll();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add member.');
    } finally { setSaving(false); }
  };

  const handleEditOpen = (member) => {
    setSelectedMember(member);
    setEditForm({
      name:         member.name,
      role:         member.role,
      department:   member.department,
      access_level: member.access_level || 'DEVELOPER',
      email:        member.email || '',
      phone:        member.phone || '',
    });
    setFormError('');
    setShowEditModal(true);
  };

  const handleEdit = async () => {
    if (!editForm.name || !editForm.role) { setFormError('Name and role are required.'); return; }
    setSaving(true); setFormError('');
    try {
      await teamAPI.update(selectedMember.id, editForm);
      setShowEditModal(false);
      fetchAll();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to update member.');
    } finally { setSaving(false); }
  };

  const handleRemoveOpen = (member) => {
    setSelectedMember(member);
    setShowRemoveModal(true);
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await teamAPI.destroy(selectedMember.id);
      setShowRemoveModal(false);
      fetchAll();
    } catch { setShowRemoveModal(false); }
    finally { setRemoving(false); }
  };

  const handleAccessLevelChange = async (member, newLevel) => {
    try {
      await teamAPI.updateAccess(member.id, newLevel);
      fetchAll();
    } catch { /* ignore */ }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'ADMIN':     return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'DEVELOPER': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'QA':        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:          return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const MemberForm = ({ form, setForm }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-muted mb-2">Full Name *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Full name" />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Role *</label>
          <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-field" placeholder="e.g. Lead Developer" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-muted mb-2">Department</label>
          <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input-field">
            <option value="Management">Management</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="QA">QA</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Access Level</label>
          <select value={form.access_level} onChange={(e) => setForm({ ...form, access_level: e.target.value })} className="input-field">
            <option value="ADMIN">Admin</option>
            <option value="DEVELOPER">Developer</option>
            <option value="QA">QA</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-muted mb-2">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Phone</label>
          <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="+63 9XX XXX XXXX" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h1 className="font-syne font-bold text-4xl mb-2">Role-Based Access Control</h1>
            <p className="text-text-muted">Manage team member permissions and access levels</p>
          </div>
          <Badge active>ADMIN ONLY</Badge>
        </div>
      </div>

      {/* Metrics — live from API */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Employees', value: total, color: 'text-blue-400' },
          { label: 'Admins',          value: admins, color: 'text-green-400' },
          { label: 'Developers',      value: devs,   color: 'text-purple-400' },
          { label: 'QA',              value: qa,     color: 'text-orange-400' },
        ].map((m, i) => (
          <Card key={i} className="p-6">
            <p className="text-text-muted text-sm mb-1">{m.label}</p>
            <p className={`font-syne font-bold text-3xl ${m.color}`}>{loading ? '—' : m.value}</p>
          </Card>
        ))}
      </div>

      {/* Employee Access Table */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne font-bold text-2xl">Employee Access</h2>
          <button onClick={() => { setAddForm(emptyForm); setFormError(''); setShowAddModal(true); }} className="btn-primary text-sm">
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
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center">
                  <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
                </td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-text-muted">No team members found.</td></tr>
              ) : members.map((member) => (
                <tr key={member.id} className="border-b border-border-color hover:bg-bg-card transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">
                          {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-muted">{member.role}</td>
                  <td className="py-4 px-4">
                    {/* Inline access-level dropdown — calls updateAccess on change */}
                    <select
                      value={member.access_level || ''}
                      onChange={(e) => handleAccessLevelChange(member, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border bg-transparent cursor-pointer focus:outline-none ${getAccessLevelColor(member.access_level)}`}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="DEVELOPER">DEVELOPER</option>
                      <option value="QA">QA</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-text-muted text-sm">
                    {member.last_modified || '—'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditOpen(member)}
                        className="text-accent-blue hover:text-accent-blue-glow transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveOpen(member)}
                        className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                      >
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

      {/* Audit Log — live from API */}
      <Card className="p-6">
        <h2 className="font-syne font-bold text-2xl mb-6">Audit Log</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : auditLogs.length === 0 ? (
            <p className="text-text-muted text-sm py-4">No audit log entries yet.</p>
          ) : auditLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-bg-card rounded-lg hover:bg-bg-surface transition-colors">
              <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h3 className="font-medium">{log.action}</h3>
                  <span className="text-text-muted text-xs font-jetbrains">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                  </span>
                </div>
                <p className="text-text-muted text-sm">
                  <span className="text-accent-blue">{log.performed_by}</span> — {log.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Add Employee Modal ──────────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-lg w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Add Team Member</h2>
            <MemberForm form={addForm} setForm={setAddForm} />
            {formError && <p className="text-red-400 text-sm mt-3">{formError}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleAdd} className="flex-1 btn-primary" disabled={saving}>
                {saving ? 'Adding...' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Member Modal ───────────────────────────────────────────────── */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-lg w-full p-6">
            <h2 className="font-syne font-bold text-2xl mb-6">Edit Member</h2>
            <MemberForm form={editForm} setForm={setEditForm} />
            {formError && <p className="text-red-400 text-sm mt-3">{formError}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="flex-1 btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleEdit} className="flex-1 btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Remove Confirmation Modal ───────────────────────────────────────── */}
      {showRemoveModal && selectedMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-border-color rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-syne font-bold text-xl">Remove Member</h2>
                <p className="text-text-muted text-sm">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-text-muted mb-6">
              Remove <span className="text-white font-medium">{selectedMember.name}</span> from the team?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowRemoveModal(false)} className="flex-1 btn-secondary" disabled={removing}>Cancel</button>
              <button onClick={handleRemove} disabled={removing} className="flex-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium py-3">
                {removing ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAccessContent;
