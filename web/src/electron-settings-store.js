import Store from 'electron-store';
import Settings from './settings';

const store = new Store();
export default {
  getSettings: function getSettings() {
    return Settings.getSettings((setting) => store.get(setting));
  },
  setSettings: function setSettings(values) {
    return Settings.setSettings(values, (name, value) => store.set(name, value));
  },
};
