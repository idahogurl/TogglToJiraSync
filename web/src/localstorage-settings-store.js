import Settings from './settings';

function setSettings(values) {
  return Settings.setSettings(values, (name, value) => window.localStorage.setItem(name, value));
}

function getSettings() {
  return Settings.getSettings((setting) => window.localStorage.getItem(setting));
}

function overrideWithEnvVar(settingName, value) {
  const currentValue = window.localStorage.getItem(settingName);
  if (!currentValue) {
    window.localStorage.setItem(settingName, value);
  }
}

if (process.env.NODE_ENV === 'development') {
  const { SETTING_NAMES } = Settings;
  overrideWithEnvVar(SETTING_NAMES.TOGGL_TOKEN, process.env.TOGGL_TOKEN);
  overrideWithEnvVar(SETTING_NAMES.JIRA_USERNAME, process.env.JIRA_USERNAME);
  overrideWithEnvVar(SETTING_NAMES.JIRA_TOKEN, process.env.JIRA_TOKEN);
  overrideWithEnvVar(SETTING_NAMES.JIRA_HOST, process.env.JIRA_HOST);
  overrideWithEnvVar(SETTING_NAMES.JIRA_PROTOCOL, process.env.JIRA_PROTOCOL);
  overrideWithEnvVar(SETTING_NAMES.JIRA_USER, process.env.JIRA_USER);
}

export default {
  setSettings,
  getSettings,
};
