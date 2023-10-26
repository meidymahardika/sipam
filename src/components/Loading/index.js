import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'

export default class Loading extends Component {
  render() {
    return (
      <Row align="middle" style={{ height: '100vh', textAlign: 'center' }}>
        <Col sm={24} md={24}>
          <Spin size="large" />
        </Col>
      </Row>
    )
  }
}