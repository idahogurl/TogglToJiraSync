import React from 'react';
import {
  Input, Select, Space, Form, Button,
} from 'antd';

const { Option } = Select;

const selectBefore = (
  <Form.Item name="jiraProtocol" noStyle>
    <Select className="select-before" style={{ width: 100 }}>
      <Option value="http">http://</Option>
      <Option value="https">https://</Option>
    </Select>
  </Form.Item>
);

export default function SettingsScreen({ onClose, onSave, settings }) {
  const appSettings = settings || {};
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...appSettings, jiraProtocol: appSettings.jiraProtocol || 'https' }}
      onFinish={(values) => onSave(values)}
    >
      <h2>Toggl</h2>
      <Form.Item
        label="API Token"
        name="togglToken"
        rules={[{ required: true, message: 'Please input your Toggl API token' }]}
      >
        <Input.Password placeholder="input API token" />
      </Form.Item>
      <h2>Jira</h2>
      <Input.Group className="input-group">
        <Form.Item
          label="Base URL"
          name="jiraHost"
          rules={[{ required: true, message: 'Please input your Jira URL' }]}
        >
          <Input addonBefore={selectBefore} placeholder="jiracloud.atlassian.net" />
        </Form.Item>
        <Form.Item
          label="API Token"
          name="jiraToken"
          rules={[{ required: true, message: 'Please input your Jira API token' }]}
        >
          <Input.Password placeholder="input API token" />
        </Form.Item>
        <Form.Item
          label="User Display Name"
          name="jiraUser"
          rules={[{ required: true, message: 'Please input your Jira display name' }]}
        >
          <Input placeholder="input username" />
        </Form.Item>
        <Form.Item
          label="Email/Username"
          name="jiraUsername"
          rules={[{ required: true, message: 'Please input your Jira email or username' }]}
        >
          <Input placeholder="input username" />
        </Form.Item>
      </Input.Group>
      <Space>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={() => onClose()}>Cancel</Button>
      </Space>
    </Form>
  );
}
