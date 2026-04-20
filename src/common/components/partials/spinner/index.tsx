import React from 'react';
import { Flex, Spin } from 'antd';

const Spinner: React.FC = () => (
  <Flex style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
    <Spin size="large" />
  </Flex>
);

export default Spinner;
