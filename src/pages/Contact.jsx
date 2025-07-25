import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    autoSave: true,
    language: 'en'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="setting-item">
          <label>Theme:</label>
          <select 
            value={settings.theme} 
            onChange={(e) => handleSettingChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
            />
            Enable notifications
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Chat Preferences</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
            />
            Auto-save conversations
          </label>
        </div>
        
        <div className="setting-item">
          <label>Language:</label>
          <select 
            value={settings.language} 
            onChange={(e) => handleSettingChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
