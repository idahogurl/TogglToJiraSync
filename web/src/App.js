import React, { useState, useEffect } from 'react';
import { Drawer, Layout, Menu } from 'antd';
import FilterForm from './components/FilterForm';
import SettingsPanel from './components/SettingsPanel';
import ErrorBoundary from './components/ErrorBoundry';
import SettingsIcon from './settings.svg';
import LocalStorage from './localstorage-settings-store';
import 'antd/dist/antd.css';
import './styles.css';
import logo from './assets/logo.png';

const { Content, Sider } = Layout;

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
    <ErrorBoundary>
      <Layout style={{ height: '100vh' }} hasSider>
        <Sider width={64} className="sider">
          <img src={logo} alt="App Logo" className="app-logo" />
          <Menu
            theme="light"
            onClick={() => {
              if (ipcRenderer) {
                ipcRenderer.send('getSettings');
              }
              setShowSettings(true);
            }}
          >
            <Menu.Item
              key="1"
              className="menu-item"
              title="Open Settings"
              icon={<img src={SettingsIcon} alt="Open Settings" className="settings-icon" />}
            />
          </Menu>
        </Sider>

        <Content style={{ padding: 20 }}>
          <FilterForm settings={settings} />
        </Content>
      </Layout>

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
  );
}
