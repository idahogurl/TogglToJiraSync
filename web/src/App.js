import React, { useState, useEffect } from 'react';
import {
  Drawer, Space, Row, Col,
} from 'antd';
import FilterForm from './components/FilterForm';
import SettingsPanel from './components/SettingsPanel';
import ErrorBoundary from './components/ErrorBoundry';
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
    <div
      style={{
        backgroundColor: 'gainsboro',
        padding: 10,
        textAlign: 'center',
        border: '1px solid darkgray',
        height: 690,
      }}
    >
      <ErrorBoundary>
        <Row gutter={[8, 40]}>
          <Col span={24}>
            <Space>
              <img src={logo} alt="App Logo" style={{ width: '64px' }} />
              <h1>Toggl Worklog</h1>
              <button
                type="button"
                style={{ cursor: 'pointer' }}
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
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FilterForm settings={settings} />
          </Col>
        </Row>

        <Drawer title="Settings" width={550} closable={false} visible={showSettings}>
          <SettingsPanel
            onClose={() => {
              setShowSettings(false);
            }}
            onSave={(values) => {
              if (ipcRenderer) {
                ipcRenderer.send('saveSettings', values);
              } else {
                LocalStorage.setSettings(values);
              }
              setSettingValues(values);
              setShowSettings(false);
            }}
            settings={settings}
          />
        </Drawer>
      </ErrorBoundary>
    </div>
  );
}
