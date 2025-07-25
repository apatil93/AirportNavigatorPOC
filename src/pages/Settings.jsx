import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
    language: 'en',
    responseSpeed: 'normal',
    dataRetention: '30days',
    accessibility: false,
    analyticsOptIn: true
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>⚙️ Settings & Preferences</h1>
        <p className="settings-subtitle">Customize your Airport Assistant experience</p>
      </div>
      
      <div className="settings-content">
        <div className="settings-section">
          <h2>🎨 Appearance</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Interface Theme</label>
              <span className="setting-description">Choose your preferred visual theme</span>
            </div>
            <select 
              value={settings.theme} 
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="setting-select"
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>🔔 Notifications</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Push Notifications</label>
              <span className="setting-description">Receive updates about airport services and delays</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>💾 Data & Privacy</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Auto-save Conversations</label>
              <span className="setting-description">Automatically save chat history for future reference</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>Data Retention</label>
              <span className="setting-description">How long to keep your conversation history</span>
            </div>
            <select 
              value={settings.dataRetention} 
              onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
              className="setting-select"
            >
              <option value="7days">7 Days</option>
              <option value="30days">30 Days</option>
              <option value="90days">90 Days</option>
              <option value="1year">1 Year</option>
              <option value="forever">Keep Forever</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Analytics Opt-in</label>
              <span className="setting-description">Help improve the service by sharing anonymous usage data</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.analyticsOptIn}
                onChange={(e) => handleSettingChange('analyticsOptIn', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>🌐 Language & Region</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Interface Language</label>
              <span className="setting-description">Select your preferred language for the interface</span>
            </div>
            <select 
              value={settings.language} 
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>⚡ Performance</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Response Speed</label>
              <span className="setting-description">Adjust how quickly the assistant responds</span>
            </div>
            <select 
              value={settings.responseSpeed} 
              onChange={(e) => handleSettingChange('responseSpeed', e.target.value)}
              className="setting-select"
            >
              <option value="fast">Fast (Instant)</option>
              <option value="normal">Normal (1 second)</option>
              <option value="slow">Thoughtful (2 seconds)</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>♿ Accessibility</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>High Contrast Mode</label>
              <span className="setting-description">Enable enhanced contrast for better visibility</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.accessibility}
                onChange={(e) => handleSettingChange('accessibility', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-primary">Save Changes</button>
          <button className="btn btn-secondary">Reset to Defaults</button>
          <button className="btn btn-danger">Clear All Data</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
