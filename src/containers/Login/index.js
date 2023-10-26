import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLogin } from '../../redux/actions/auth/authAction'
import { Form, Input, Card, Button, Row, Col, Typography, message } from 'antd'

const { Text } = Typography

export class Login extends Component {

  onFinish = (values) => {
    const { actionSetLogin } = this.props;
    return actionSetLogin(values, null, (err) => message.error(err))
  }

  render() {
    return (
      <Row className='main-content'>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 8, offset: 8 }} style={{ marginBottom: 8 }}>
          <Card>
            <Form 
              layout="vertical" 
              onFinish={this.onFinish}
            >
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} style={{ fontSize: 28 }}>
                  <Text type="secondary">login</Text>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Text type="secondary">Email</Text>
                  <Form.Item 
                    className="mb-16"
                    name="email"
                  >
                    <Input 
                      type="email"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Text type="secondary">Password</Text>
                  <Form.Item 
                    className="mb-8" 
                    name="password"
                  >
                    <Input.Password
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item className="mb-8">
                    <Button type="primary" htmlType="submit" block>
                      Login
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  actionSetLogin : setLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)