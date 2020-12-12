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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { span: 24 },
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div>
      <Form className="filter-form" {...layout}>
        <Form.Item label="Date Range" style={{ fontWeight: 'bold', textAlign: 'center' }}>
          <RangePicker onChange={onChange} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button onClick={onClick} disabled={!startDate && !endDate} type="primary">
            View Entries
          </Button>
        </Form.Item>
      </Form>
      <Entries isInit={isInit} startDate={startDate} endDate={endDate} settings={settings} />
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}
