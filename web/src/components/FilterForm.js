import React, { useState } from 'react';
import { Form, Button } from 'antd';
import Entries from './Entries';
import DatePicker from './DatePicker';

const { RangePicker } = DatePicker;

export default function FilterForm({ settings }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isInit, setIsInit] = useState(true);

  const onChange = (date) => {
    if (date) {
      const [start, end] = date;
      setStartDate(start);
      setEndDate(end);
    }
  };

  const onClick = () => {
    setIsInit(false);
  };

  return (
    <>
      <Form layout="inline" className="filter-form">
        <Form.Item label="Date Range">
          <RangePicker onChange={onChange} />
        </Form.Item>
        <Button onClick={onClick} disabled={!startDate && !endDate} type="primary">
          View Entries
        </Button>
      </Form>
      {isInit && <Entries startDate={startDate} endDate={endDate} settings={settings} />}
    </>
  );
}
