import Settings from './settings';

export default {
  getSettings: function getSettings() {
    return Settings.getSettings((setting) => window.localStorage.getItem(setting));
  },
  setSettings: function setSettings(values) {
    return Settings.setSettings(values, (name, value) => window.localStorage.setItem(name, value));
  },
};
