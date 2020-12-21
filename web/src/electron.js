// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import SettingsStore from './electron-settings-store';

const {
  app, session, ipcMain, BrowserWindow,
} = electron;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 700,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../build/index.html'));

  if (isDev && process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => {
        console.log(`Added extension ${name}`);
      })
      .catch((e) => {
        console.log(`Error occurred: ${e.message}`);
      });
  }

  // eslint-disable-next-line no-return-assign
  mainWindow.on('closed', () => (mainWindow = null));

  mainWindow.once('ready-to-show', () => {
    // Modify the origin for all requests to the following urls.
    // eslint-disable-next-line prefer-destructuring
    const API_HOST = process.env.API_HOST;
    const filter = {
      urls: [`${API_HOST}/*`],
    };
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      const newDetails = {
        ...details,
        requestHeaders: {
          ...details.requestHeaders,
          Origin: API_HOST,
        },
      };
      callback(newDetails);
    });
    mainWindow.webContents.send('getSettings', SettingsStore.getSettings());
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('saveSettings', (event, values) => {
  console.log('saveSettings', values);
  SettingsStore.setSettings(values);
});

ipcMain.on('getSettings', (event) => {
  event.reply('getSettings', SettingsStore.getSettings());
});
