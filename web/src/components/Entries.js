/* global Rollbar */
import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import useSwr, { mutate } from 'swr';
import {
  Table, Alert, Button, Empty, Space,
} from 'antd';
import dayjs from 'dayjs';
import querystring from 'querystring';
import { encode } from 'base-64';

import SyncResult from './SyncResult';
import { SET_STATUS_PENDING, SET_STATUS_RESOLVED, SET_STATUS_REJECTED } from '../statuses';

export default function Entries({
  isInit, startDate, endDate, settings,
}) {
  if (isInit) {
    return (
      <Empty
        imageStyle={{
          border: '1px solid darkgray',
          backgroundColor: 'white',
          padding: 5,
          height: 305,
        }}
        style={{ marginTop: 35 }}
        description={(
          <span>
            Select a
            {' '}
            <strong>Date Range</strong>
            {' '}
            and click
            {' '}
            <strong>View Entries</strong>
            {' '}
            for data
          </span>
        )}
      />
    );
  }

  const entriesApiUrl = `${process.env.API_HOST}/api/toggl?${querystring.stringify({
    start_date: startDate.startOf('D').toISOString(),
    end_date: endDate.startOf('D').toISOString(),
  })}`;

  const [syncStatus, setSyncStatus] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetcher = (url) => fetch(url, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      Origin: process.env.API_HOST,
      Referer: process.env.API_HOST,
      'x-client-options': encode(JSON.stringify(settings)),
    },
  }).then((res) => res.json());

  const { data, error } = useSwr(entriesApiUrl, fetcher, {
    errorRetryCount: 2,
  });

  let displayData = [];

  useEffect(() => {
    if (syncStatus === SET_STATUS_PENDING) {
      const selectedData = selectedRowKeys.map((s) => {
        const item = data.find((d) => d.key === s);

        const { description, duration, start } = item;

        return {
          issue: description,
          timeSpentSeconds: duration,
          started: dayjs(start).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
        };
      });

      // update the local data immediately, but disable the revalidation
      // mutate(entriesApiUrl, displayData);
      (async () => {
        // try {
        //   await fetch(`${process.env.API_HOST}/api/jira`, {
        //     method: 'POST',
        //     headers: {
        //       'x-client-options': encode(JSON.stringify(settings)),
        //     },
        //     // eslint-disable-next-line no-use-before-define
        //     body: JSON.stringify(selectedData),
        //   });
        //   setSyncStatus(SET_STATUS_RESOLVED);
        //   setSelectedRowKeys([]);
        // } catch (e) {
        //   if (process.env.NODE_ENV === 'production') {
        //     Rollbar.error(e);
        //   }

        //   console.error(e);
        setSyncStatus(SET_STATUS_REJECTED);
        // }
        // trigger a revalidation (refetch) to make sure our local data is correct
        // mutate(entriesApiUrl);
      })();
    }
  }, [syncStatus]);

  if (error) {
    return <Alert type="error" showIcon message="Load Failure" style={{ textAlign: 'center' }} />;
  }

  displayData = data
    ? data.map((d) => {
      const selected = selectedRowKeys.find((s) => s === d.key);
      let { synced } = d;
      if (syncStatus === SET_STATUS_RESOLVED && selected) {
        synced = 'Yes';
      }
      if (syncStatus === SET_STATUS_REJECTED && selected) {
        synced = 'Failed';
      }
      return {
        ...d,
        startDisplay: dayjs(d.start).format('MM-DD-YYYY hh:MM a'),
        stopDisplay: dayjs(d.stop).format('MM-DD-YYYY hh:MM a'),
        synced,
      };
    })
    : [];

  return (
    <Space direction="vertical">
      <Table
        loading={!data}
        size="medium"
        scroll={{ y: 250 }}
        columns={[
          {
            title: 'Synced',
            dataIndex: 'synced',
          },
          {
            title: 'Issue',
            dataIndex: 'description',
          },
          {
            title: 'Start',
            dataIndex: 'startDisplay',
          },
          {
            title: 'End',
            dataIndex: 'stopDisplay',
          },
          {
            title: 'Length',
            dataIndex: 'durationDisplay',
          },
        ]}
        dataSource={displayData}
        rowSelection={{
          selectedRowKeys,
          onChange: (selected) => {
            setSelectedRowKeys(selected);
          },
        }}
      />

      <Button
        onClick={() => {
          setSyncStatus(SET_STATUS_PENDING);
        }}
        loading={syncStatus === SET_STATUS_PENDING}
        disabled={!selectedRowKeys.length}
        type="primary"
      >
        Sync
      </Button>

      <SyncResult status={syncStatus} />
    </Space>
  );
}
