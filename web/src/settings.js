import SETTING_NAMES from './setting-names';

export default {
  getSettings: function getSettings(getFunction) {
    const settings = {};
    Object.keys(SETTING_NAMES).forEach((s) => {
      const settingName = SETTING_NAMES[s];
      settings[settingName] = getFunction(settingName) || '';
    });
    if (process.env.NODE_ENV === 'development') {
      const settingValues = Object.values(settings);

      const empty = settingValues.filter((v) => !v);
      // set with env variables if all empty
      if (empty.length === settingValues.length) {
        // webpack env plugin does search & replace, cannot loop
        settings[SETTING_NAMES.TOGGL_TOKEN] = process.env.TOGGL_TOKEN;
        settings[SETTING_NAMES.JIRA_USERNAME] = process.env.JIRA_USERNAME;
        settings[SETTING_NAMES.JIRA_TOKEN] = process.env.JIRA_TOKEN;
        settings[SETTING_NAMES.JIRA_HOST] = process.env.JIRA_HOST;
        settings[SETTING_NAMES.JIRA_PROTOCOL] = process.env.JIRA_PROTOCOL;
        settings[SETTING_NAMES.JIRA_USER] = process.env.JIRA_USER;
      }
    }

    return settings;
  },
  setSettings: function setSettings(values, setFunction) {
    Object.keys(values).forEach((v) => {
      setFunction(v, values[v]);
    });
  },
};
