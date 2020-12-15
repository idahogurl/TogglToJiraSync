const SETTING_NAMES = {
  TOGGL_TOKEN: 'togglToken',
  JIRA_USERNAME: 'jiraUsername',
  JIRA_TOKEN: 'jiraToken',
  JIRA_HOST: 'jiraHost',
  JIRA_PROTOCOL: 'jiraProtocol',
  JIRA_USER: 'jiraUser',
};

export default {
  SETTING_NAMES,
  getSettings: function getSettings(getFunction) {
    const settings = {};
    Object.keys(SETTING_NAMES).forEach((s) => {
      const settingName = SETTING_NAMES[s];
      settings[settingName] = getFunction(settingName) || '';
    });
    return settings;
  },
  setSettings: function setSettings(values, setFunction) {
    Object.keys(values).forEach((v) => {
      setFunction(SETTING_NAMES[v], values[v]);
    });
  },
};
