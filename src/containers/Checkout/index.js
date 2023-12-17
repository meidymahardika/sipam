import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Space, Card, Typography, Image, Button, Form, Input, Select } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

export class Checkout extends Component {
  render() {
    console.log(1, JSON.parse(localStorage.getItem("data")))
    return (
      <React.Fragment>
        <Row className='main-content'>
          <Col span={24}>
            <Card className='rounded' bodyStyle={{ padding: 16 }}>
              <Form layout="vertical">
                <Row>
                  <Col span={24} style={{ marginBottom: 16 }}>
                    <Text className='text-title'>Data Customer</Text>
                  </Col>
                  <Col span={24}>
                    <Form.Item 
                      label="Name"
                      name="name"
                      style={{ marginBottom: 8 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Phone Number"
                      name="mobile"
                      style={{ marginBottom: 8 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item 
                      label="Email" 
                      name="email"
                      style={{ marginBottom: 8 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: 16, marginBottom: 16 }}>
                    <Text className='text-title'>Detail Order</Text>
                    <Link to={`/`}>
                      <Text type='primary' style={{ color: '#F56E00', float: 'right', cursor: 'pointer' }}><EditOutlined /> Edit Order</Text>
                    </Link>
                  </Col>
                  <Col span={24}>
                    {
                      JSON.parse(localStorage.getItem("data"))?.map((item,i) =>
                        <Card key={i} className='rounded' style={{ marginBottom: 8 }} bodyStyle={{ padding: 8 }}>
                          <Space size={16}>
                            <Image
                              width={75}
                              height={75}
                              src={`https://firebasestorage.googleapis.com/v0/b/sipam-c1be9.appspot.com/o/files%2F${item?.img?.split("_", 1).pop()}?alt=media&${item?.img?.split("_", 2).pop()}`}
                              preview={false}
                            />
                            <Space direction='vertical' size={0}>
                              <Text>{item.name}</Text>
                              <Text strong>Rp {item.price.toLocaleString()}</Text>
                            </Space>
                          </Space>
                          <Space style={{ float: 'right', marginTop: 24 }}>
                            <Text>x {JSON.parse(localStorage.getItem("data")).find(res => res.id === item.id)?.qty}</Text>
                          </Space>
                        </Card>
                      )
                    }
                  </Col>
                  <Col span={24} style={{ marginTop: 16 }}>
                    <Text className='text-title'>Payment Method</Text>
                  </Col>
                  <Col span={24} style={{ marginTop: 16 }}>
                    <Form.Item 
                      name="paymentMethod"
                      style={{ marginBottom: 8 }}
                    >
                      <Select>
                        <Option key="1" value="CASH">Cash</Option>
                        <Option key="2" value="BANK_TRANSFER">Bank Transfer</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24} style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 20 }}>Total Payment</Text>
                    <Text strong type='primary' style={{ color: '#F56E00', float: 'right', fontSize: 20 }}>Rp {localStorage.getItem("totalPrice")}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: 16 }}>
                    <Form.Item>
                      <Button type="primary" block>Order</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)