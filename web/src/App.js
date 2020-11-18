import React, { useState, useEffect } from 'react';
import { Drawer, Space } from 'antd';
import FilterForm from './components/FilterForm';
import SettingsPanel from './components/SettingsPanel';
import SettingsIcon from './settings.svg';
import 'antd/dist/antd.css';
import './styles.css';

const electron = window.require('electron');

const { ipcRenderer } = electron;

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettingValues] = useState();
  useEffect(() => {
    ipcRenderer.on('getSettings', (event, settingValues) => {
      setSettingValues(settingValues);
    });
  }, []);
  return (
    <>
      <div className="container">
        <Space>
          <h1>Toggl Tracker to Jira Sync</h1>
          <button
            type="button"
            onClick={() => {
              ipcRenderer.send('getSettings');
              setShowSettings(true);
            }}
          >
            <img src={SettingsIcon} alt="Open Settings" className="settings-icon" />
          </button>
        </Space>
        <FilterForm settings={settings} />
      </div>
      <Drawer title="Settings" width={550} closable={false} visible={showSettings}>
        <SettingsPanel
          onClose={() => {
            setShowSettings(false);
          }}
          onSave={(values) => {
            ipcRenderer.send('saveSettings', values);
            setShowSettings(false);
            setSettingValues(values);
          }}
          settings={settings}
        />
      </Drawer>
    </>
  );
}
