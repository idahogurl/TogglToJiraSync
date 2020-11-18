const Store = require('electron-store');

const SETTINGS = {
  TOGGL_TOKEN: 'togglToken',
  JIRA_USERNAME: 'jiraUsername',
  JIRA_TOKEN: 'jiraToken',
  JIRA_HOST: 'jiraHost',
  JIRA_PROTOCOL: 'jiraProtocol',
  JIRA_USER: 'jiraUser',
};

const store = new Store();

module.exports = {
  getSettings: function getSettings() {
    const togglToken = store.get(SETTINGS.TOGGL_TOKEN);
    const jiraUsername = store.get(SETTINGS.JIRA_USERNAME);
    const jiraToken = store.get(SETTINGS.JIRA_TOKEN);
    const jiraHost = store.get(SETTINGS.JIRA_HOST);
    const jiraProtocol = store.get(SETTINGS.JIRA_PROTOCOL);
    const jiraUser = store.get(SETTINGS.JIRA_USER);

    return {
      togglToken,
      jiraUsername,
      jiraToken,
      jiraHost,
      jiraProtocol,
      jiraUser,
    };
  },
  setSettings: function setSettings(values) {
    store.delete(SETTINGS.JIRA_PROTOCOL);
    store.set(SETTINGS.TOGGL_TOKEN, values[SETTINGS.TOGGL_TOKEN]);
    store.set(SETTINGS.JIRA_USERNAME, values[SETTINGS.JIRA_USERNAME]);
    store.set(SETTINGS.JIRA_TOKEN, values[SETTINGS.JIRA_TOKEN]);
    store.set(SETTINGS.JIRA_HOST, values[SETTINGS.JIRA_HOST]);
    store.set(SETTINGS.JIRA_PROTOCOL, values[SETTINGS.JIRA_PROTOCOL]);
    store.set(SETTINGS.JIRA_USER, values[SETTINGS.JIRA_USER]);
  },
};
