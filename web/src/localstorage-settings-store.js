const { SETTINGS } = require('./setting-names');

module.exports = {
  getSettings: function getSettings() {
    const storage = window.localStorage;
    const togglToken = storage.getItem(SETTINGS.TOGGL_TOKEN);
    const jiraUsername = storage.getItem(SETTINGS.JIRA_USERNAME);
    const jiraToken = storage.getItem(SETTINGS.JIRA_TOKEN);
    const jiraHost = storage.getItem(SETTINGS.JIRA_HOST);
    const jiraProtocol = storage.getItem(SETTINGS.JIRA_PROTOCOL);
    const jiraUser = storage.getItem(SETTINGS.JIRA_USER);

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
    const storage = window.localStorage;
    storage.setItem(SETTINGS.TOGGL_TOKEN, values[SETTINGS.TOGGL_TOKEN]);
    storage.setItem(SETTINGS.JIRA_USERNAME, values[SETTINGS.JIRA_USERNAME]);
    storage.setItem(SETTINGS.JIRA_TOKEN, values[SETTINGS.JIRA_TOKEN]);
    storage.setItem(SETTINGS.JIRA_HOST, values[SETTINGS.JIRA_HOST]);
    storage.setItem(SETTINGS.JIRA_PROTOCOL, values[SETTINGS.JIRA_PROTOCOL]);
    storage.setItem(SETTINGS.JIRA_USER, values[SETTINGS.JIRA_USER]);
  },
};
