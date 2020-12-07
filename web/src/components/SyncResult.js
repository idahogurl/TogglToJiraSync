// https://www.npmjs.com/package/electron-json-storage
import React from 'react';
import { Result } from 'antd';
import { SET_STATUS_RESOLVED, SET_STATUS_REJECTED } from '../statuses';

export default function SyncResult(status) {
  if (status === SET_STATUS_RESOLVED) {
    return <Result status="success" title="Sync Succeeded" />;
  }
  if (status === SET_STATUS_REJECTED) {
    return <Result status="error" title="Sync Failed" subTitle="Please try again." />;
  }
  return null;
}
