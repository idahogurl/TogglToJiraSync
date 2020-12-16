import React, { useState } from 'react';
import { Form, Button, Divider } from 'antd';
import Entries from './Entries';
import DatePicker from './DatePicker';

const { RangePicker } = DatePicker;

export default function FilterForm({ settings }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isInit, setIsInit] = useState(true);

  const onChange = (date) => {
    setIsInit(true);
    if (date) {
      const [start, end] = date;
      setStartDate(start);
      setEndDate(end);
    }
  };

  const onClick = () => {
    setIsInit(false);
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div>
      <Form
        className="filter-form"
        layout="inline"
        style={{
          margin: 'auto',
          width: 550,
          marginBottom: 40,
        }}
      >
        <Form.Item label="Date Range" style={{ fontWeight: 'bold', textAlign: 'center' }}>
          <RangePicker onChange={onChange} />
        </Form.Item>
        <Form.Item>
          <Button onClick={onClick} disabled={!isInit || !startDate || !endDate} type="primary">
            View Entries
          </Button>
        </Form.Item>
      </Form>
      <Divider>Time Entries</Divider>
      <Entries isInit={isInit} startDate={startDate} endDate={endDate} settings={settings} />
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}
