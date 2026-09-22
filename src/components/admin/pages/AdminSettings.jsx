import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Database,
  FileCode,
  CheckCircle2,
  Save,
  Download,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { INITIAL_ADMIN_SETTINGS } from '../mockAdminData';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(INITIAL_ADMIN_SETTINGS);
  const [saveToast, setSaveToast] = useState(null);
  const [backupToast, setBackupToast] = useState(null);

  const showSaveSuccess = () => {
    setSaveToast('Settings updated successfully.');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleNotificationToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSecurityToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key]
      }
    }));
  };

  const handleSimulateBackup = () => {
    setBackupToast('Platform database snapshot generated and downloaded locally (servicenest-backup-20250520.json).');
    setTimeout(() => setBackupToast(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto">
      
      {/* Toast Alert */}
      {saveToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {backupToast && (
        <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <Download className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{backupToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure system configurations, notification triggers, security compliance, and mock maintenance backups.
          </p>
        </div>

        <button
          type="button"
          onClick={showSaveSuccess}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { id: 'general', label: 'General Settings', icon: Settings },
          { id: 'notifications', label: 'Notification Triggers', icon: Bell },
          { id: 'security', label: 'Security & Access', icon: Shield },
          { id: 'system', label: 'System Logs', icon: FileCode },
          { id: 'backup', label: 'Backup & Restore', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0B3A82] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Settings */}
      {activeTab === 'general' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Platform General Configurations</h2>
            <p className="text-xs text-slate-500">Core parameters governing public labels, contact emails, and operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Platform Brand Name</label>
              <input
                type="text"
                name="platformName"
                value={settings.general.platformName}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Support Email Address</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.general.supportEmail}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Admin Contact Hotline</label>
              <input
                type="text"
                name="adminContact"
                value={settings.general.adminContact}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">System Base Currency</label>
              <input
                type="text"
                name="currency"
                value={settings.general.currency}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 focus:outline-none"
                disabled
              />
            </div>
          </div>

          {/* Maintenance Mode Toggle */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Maintenance Mode (Demo Simulation)</span>
              <span className="text-[11px] text-slate-500 block">Temporarily display a maintenance banner to public visitors</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.general.maintenanceMode}
                onChange={handleGeneralChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
      )}

      {/* Tab 2: Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4 animate-in fade-in text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Admin Notification Triggers</h2>
            <p className="text-xs text-slate-500">Configure simulated push and email alerts for critical operations.</p>
          </div>

          <div className="divide-y divide-slate-100 space-y-3">
            {[
              {
                key: 'emailOnNewProvider',
                title: 'New Service Provider Application',
                desc: 'Receive instant alert when a contractor uploads documents for verification.'
              },
              {
                key: 'emailOnComplaint',
                title: 'High Priority Dispute Filed',
                desc: 'Alert administrator when an unresolved customer complaint is lodged.'
              },
              {
                key: 'weeklyReportDigest',
                title: 'Weekly Performance Digest',
                desc: 'Summary of booking volume, completion metrics, and revenue estimates.'
              },
              {
                key: 'smsAlertsCritical',
                title: 'SMS Alerts for Platform Critical Incidents',
                desc: 'Simulated cellular dispatch for security warnings or provider suspensions.'
              }
            ].map((item) => (
              <div key={item.key} className="pt-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{item.title}</span>
                  <span className="text-[11px] text-slate-500 block">{item.desc}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key]}
                    onChange={() => handleNotificationToggle(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Security Settings */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4 animate-in fade-in text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Security & Authentication Policies</h2>
            <p className="text-xs text-slate-500">Access control settings simulated for academic & evaluation demo.</p>
          </div>

          <div className="divide-y divide-slate-100 space-y-3">
            {[
              {
                key: 'twoFactorAdmin',
                title: 'Enforce Two-Factor Authentication for Admins',
                desc: 'Requires 6-digit TOTP confirmation upon administrator portal login.'
              },
              {
                key: 'requireNicUpload',
                title: 'Mandatory Government NIC for Provider Signups',
                desc: 'Requires verified photo identification prior to listing trade services.'
              }
            ].map((item) => (
              <div key={item.key} className="pt-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{item.title}</span>
                  <span className="text-[11px] text-slate-500 block">{item.desc}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.security[item.key]}
                    onChange={() => handleSecurityToggle(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Session Inactivity Timeout (Minutes)</label>
              <input
                type="number"
                value={settings.security.sessionTimeoutMins}
                onChange={(e) => setSettings((p) => ({
                  ...p,
                  security: { ...p.security, sessionTimeoutMins: Number(e.target.value) }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password Rotation Period (Days)</label>
              <input
                type="number"
                value={settings.security.passwordExpirationDays}
                onChange={(e) => setSettings((p) => ({
                  ...p,
                  security: { ...p.security, passwordExpirationDays: Number(e.target.value) }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Logs */}
      {activeTab === 'system' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4 animate-in fade-in text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">System Diagnostics & Environment</h2>
            <p className="text-xs text-slate-500">Framework build details and client runtime status.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 block font-mono text-[10px]">APPLICATION VERSION</span>
              <span className="text-xs font-bold text-slate-900 mt-1 block">ServiceNest v2.4.0 (Demo)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 block font-mono text-[10px]">FRONTEND CORE</span>
              <span className="text-xs font-bold text-slate-900 mt-1 block">React 18.3.1 + Vite 6.1</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 block font-mono text-[10px]">CLIENT BROWSER HOST</span>
              <span className="text-xs font-bold text-emerald-600 mt-1 block">localhost:5173 (Active)</span>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed space-y-1">
            <p className="text-emerald-400">[INFO] Vite dev server ready in 527 ms</p>
            <p className="text-blue-300">[INFO] 1617 client modules transformed cleanly</p>
            <p className="text-slate-400">[INFO] Zero external APIs or database dependencies connected</p>
            <p className="text-slate-400">[INFO] Local frontend state synchronization operational</p>
            <p className="text-emerald-400">[READY] ServiceNest 100% frontend runtime ready</p>
          </div>
        </div>
      )}

      {/* Tab 5: Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Backup & Restore Simulation</h2>
            <p className="text-xs text-slate-500">Download mock platform snapshot or test restoration mechanisms.</p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-900 block">Manual Platform Snapshot Backup</span>
              <span className="text-[11px] text-blue-700/80 block mt-0.5">
                Last snapshot: Today at 02:00 AM • Format: JSON schema (0.8 MB)
              </span>
            </div>

            <button
              type="button"
              onClick={handleSimulateBackup}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B3A82] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Backup (.JSON)</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Simulated State Reset</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Reset local mock users, providers, and complaints back to factory default state.
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all demo state back to default?')) {
                  window.location.reload();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
