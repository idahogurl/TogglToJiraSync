// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');

const {
  app, session, ipcMain, BrowserWindow,
} = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const { getSettings, setSettings } = require('./settings-store');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 700,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:1234' : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  if (isDev && process.env.NODE_ENV === 'development') {
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
    const { API_HOST } = process.env;
    const filter = {
      urls: [`${API_HOST}/*`],
    };
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      const newDetails = {
        ...details,
        referrer: API_HOST,
        requestHeaders: {
          ...details.requestHeaders,
          Origin: API_HOST,
          Referer: API_HOST,
        },
      };
      callback(newDetails);
    });
    mainWindow.webContents.send('getSettings', getSettings());
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
  setSettings(values);
});

ipcMain.on('getSettings', (event) => {
  event.reply('getSettings', getSettings());
});
