import React, { useState, useEffect } from 'react';
import useSwr, { mutate } from 'swr';
import {
  Table, Alert, Button, Divider,
} from 'antd';
import dayjs from 'dayjs';
import querystring from 'querystring';
import { encode } from 'base-64';

import SyncResult from '../sync-result';
import { SET_STATUS_PENDING, SET_STATUS_RESOLVED, SET_STATUS_REJECTED } from '../statuses';

export default function Entries({ startDate, endDate, settings }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [syncStatus, setSyncStatus] = useState();

  const entriesApiUrl = `${process.env.API_HOST}/api/toggl?${querystring.stringify({
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  })}`;

  const fetcher = (url) => fetch(url, {
    method: 'POST',
    headers: {
      'x-client-options': encode(JSON.stringify(settings)),
    },
  }).then((res) => res.json());

  const { data, error } = useSwr(entriesApiUrl, fetcher, {
    errorRetryCount: 2,
  });

  const displayData = data
    ? data.map((d) => {
      const selected = selectedRowKeys.find((s) => s === d.key);
      return {
        ...d,
        startDisplay: dayjs(d.start).format('MM-DD-YYYY hh:MM a'),
        stopDisplay: dayjs(d.stop).format('MM-DD-YYYY hh:MM a'),
        synced: d.synced || (syncStatus === SET_STATUS_RESOLVED && selected ? 'Yes' : undefined),
      };
    })
    : [];

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
      mutate(entriesApiUrl, displayData, false);
      (async () => {
        try {
          await fetch(`${process.env.API_HOST}/api/jira`, {
            method: 'POST',
            // eslint-disable-next-line no-use-before-define
            body: JSON.stringify(selectedData),
          });
          setSyncStatus(SET_STATUS_RESOLVED);
          setSelectedRowKeys([]);
        } catch (e) {
          console.error(e);
          setSyncStatus(SET_STATUS_REJECTED);
        }
        // trigger a revalidation (refetch) to make sure our local data is correct
        mutate(entriesApiUrl);
      })();
    }
  }, [syncStatus]);

  if (error) {
    return (
      <div className="container">
        <Alert type="error" message="Failed to time entries" />
      </div>
    );
  }

  return (
    <>
      <Divider>Time Entries</Divider>
      <Table
        loading={!data}
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
            title: 'Duration',
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
      >
        Sync
      </Button>
      <SyncResult status={syncStatus} />
    </>
  );
}
