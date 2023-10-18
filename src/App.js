import React from 'react';
import { Row, Col, Result, Button } from 'antd';

const App = () => (
  <div className="App">
    <Row style={{ margin: 200 }}>
      <Col span={24}>
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      </Col>
    </Row>
  </div>
);

export default App;