// TOGGL_TOKEN=4fb92acfdaf88495e752775864c3956c
// JIRA_ACCOUNT=rvest@healthline.com
// JIRA_TOKEN=Z0JVZI8pSpBhVYM41PbL46D2
// JIRA_HOST=redventures.atlassian.net
// JIRA_PROTOCOL=https
// assignee

import React from 'react';
import {
  Input, Space, Select, Option,
} from 'antd';

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);

export default function SettingsScreen() {
  return (
    <div>
      <h1>Settings</h1>
      Toogl API Token
      <input type="text" id="toggleApiToken" />
      <Input.Password placeholder="input password" />
      <h2>Jira</h2>
      <Input.Group compact />
      Base URL (You can enter a cloud or server url like https://jiracloud.atlassian.net or
      https://jira.mydomain.com)
      <div style={{ marginBottom: 16 }}>
        <Input addonBefore={selectBefore} defaultValue="https://jiracloud.atlassian.net" />
      </div>
      Username
      <Input placeholder="Basic usage" addonBefore="Username" />
      Personal API Token
      <Space direction="vertical">
        <Input.Password placeholder="input password" />
      </Space>
      <Input />
    </div>
  );
}
