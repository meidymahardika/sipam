import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Row, Col, Space, Card, Typography, Image, Button, Form, Input, Select, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { createOrder } from '../../redux/actions/order/orderAction'
import { convertStringToInteger } from '../../utils/strToInt'
import { getQueue } from '../../redux/actions/order/orderAction'

const { Text } = Typography
const { Option } = Select

export class Checkout extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
  
    this.state = {
       submitLoading: false,
    }
  }

  componentDidMount(){
    if(!localStorage.getItem("totalPrice")){
      this.props.history.push('/')
    }
  }

  handleSubmitOrder = (values) => {
    const { actionGetQueue, actionCreate } = this.props;
    actionGetQueue((res) => {
      this.setState({ submitLoading: true })
      values.orderNumber = `SPM${moment().format('DDMMYYHHmmss')}${(moment().valueOf()).toString().slice(-4)}`
      values.queue = res.max_queue+1
      values.total = convertStringToInteger(localStorage.getItem("totalPrice"))
      values.detail = JSON.parse(localStorage.getItem("data"))
      return actionCreate(values, () => {
        this.setState({ submitLoading: false }, () => {
          localStorage.setItem("queue", values.queue);
          localStorage.setItem("name", values.name);
          localStorage.setItem("phone", values.phone);
          localStorage.setItem("email", values.email);
          localStorage.setItem("paymentMethod", values.paymentMethod);
          localStorage.setItem("detailData", localStorage.getItem("data"));
          localStorage.setItem("detailTotalPrice", localStorage.getItem("totalPrice"));
          localStorage.removeItem("data")
          localStorage.removeItem("totalPrice")
          message.success('Order successfully')
          this.props.history.push('/detail-order')
        })
      }, (err) => {
        this.setState({ submitLoading: false }, () => message.error(err))
      })
    })
  }

  render() {
    const { submitLoading } = this.state
    return (
      <React.Fragment>
        <Row className='main-content'>
          <Col span={24}>
            <Card className='rounded' bodyStyle={{ padding: 16 }}>
              <Form layout="vertical" onFinish={this.handleSubmitOrder}>
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
                      name="phone"
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
                        <Option key="1" value={0}>Cash</Option>
                        <Option key="2" value={1}>Bank Transfer</Option>
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
                      <Button htmlType='submit' type="primary" size='large' block loading={submitLoading}>Order</Button>
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

const mapDispatchToProps = {
  actionGetQueue: getQueue,
  actionCreate: createOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)