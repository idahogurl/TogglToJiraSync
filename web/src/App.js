// https://www.npmjs.com/package/electron-json-storage
import React, { useState, useEffect } from 'react';
import useSwr, { mutate } from 'swr';
import {
  Table, Alert, Result, Form, Button, Divider,
} from 'antd';
import dayjs from 'dayjs';
import querystring from 'querystring';
import styled from '@emotion/styled';

import DatePicker from './components/DatePicker';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

const Container = styled.div`
  margin: 1rem;
`;

const SET_STATUS_PENDING = 'pending';
const SET_STATUS_RESOLVED = 'resolved';
const SET_STATUS_REJECTED = 'rejected';

const fetcher = (url, options) => fetch(url, options).then((res) => res.json());

function SyncResult(status) {
  if (status === SET_STATUS_RESOLVED) {
    return <Result status="success" title="Sync Succeeded" />;
  }
  if (status === SET_STATUS_REJECTED) {
    return <Result status="error" title="Sync Failed" subTitle="Please try again." />;
  }
  return null;
}

function Entries({ startDate, endDate }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [syncStatus, setSyncStatus] = useState();

  const entriesApiUrl = `${process.env.API_HOST}/api/toggl?${querystring.stringify({
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  })}`;

  const { data, error } = useSwr(entriesApiUrl, fetcher, {
    errorRetryCount: 2,
  });

  const displayData = data
    ? data.map((d) => {
      console.log(d.key, d.synced);
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
      <Container>
        <Alert type="error" message="Failed to time entries" />
      </Container>
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

export default function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [viewEntries, setViewEntries] = useState(false);

  const onChange = (date) => {
    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);
    setViewEntries(false);
  };

  const onClick = () => {
    setViewEntries(true);
  };

  return (
    <Container>
      <h1>Toggl Tracker to Jira Sync</h1>
      <Form layout="inline" css={{ marginBottom: '3rem' }}>
        <Form.Item label="Date Range">
          <RangePicker onChange={onChange} />
        </Form.Item>
        <Button onClick={onClick} disabled={!startDate && !endDate}>
          View Entries
        </Button>
      </Form>
      {viewEntries && <Entries startDate={startDate} endDate={endDate} />}
    </Container>
  );
}
