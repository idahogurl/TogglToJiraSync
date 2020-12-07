import React, { useState, useEffect } from 'react';
import { Drawer, Space } from 'antd';
import FilterForm from './components/FilterForm';
import SettingsPanel from './components/SettingsPanel';
import SettingsIcon from './settings.svg';
import LocalStorage from './localstorage-settings-store';
import 'antd/dist/antd.css';
import './styles.css';
import logo from './assets/logo.png';

let ipcRenderer;
if (window.require) {
  const electron = window.require('electron');
  ipcRenderer = electron.ipcRenderer;
}

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettingValues] = useState();
  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on('getSettings', (event, settingValues) => {
        setSettingValues(settingValues);
      });
    } else {
      setSettingValues(LocalStorage.getSettings());
    }
  }, []);
  return (
    <>
      <div className="container">
        <Space>
          <img src={logo} alt="App Logo" style={{ width: '64px' }} />
          <h1>Toggl Tracker to Jira Sync</h1>
          <button
            type="button"
            onClick={() => {
              if (ipcRenderer) {
                ipcRenderer.send('getSettings');
              }
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
            if (ipcRenderer) {
              ipcRenderer.send('saveSettings', values);
            } else {
              LocalStorage.setSettingValues(values);
            }
            setShowSettings(false);
            setSettingValues(values);
          }}
          settings={settings}
        />
      </Drawer>
    </>
  );
}
