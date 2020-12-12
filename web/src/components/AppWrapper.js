import React from 'react';
import { Row, Col } from 'antd';

import 'antd/dist/antd.css';
import '../styles.css';

const column = {
  backgroundColor: 'gainsboro',
  padding: 10,
  border: 1,
  textAlign: 'center',
};

export default function AppWrapper({ headerContent, bodyContent }) {
  return (
    <>
      <Row>
        <Col span={24} style={column}>
          {headerContent}
        </Col>
      </Row>
      <Row>
        <Col span={24} style={column}>
          {bodyContent}
        </Col>
      </Row>
    </>
  );
}
