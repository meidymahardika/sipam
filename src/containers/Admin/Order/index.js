import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Breadcrumb, PageHeader, Table, Modal, Space, Typography, Tag, Divider, Button } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { columns } from './columns'

const { Text } = Typography

const data = [
  {
    key: '1',
    queue: 1,
    orderNumber: 'TRK-08012400001',
    name: 'Jhon Doe',
    email: 'jhon@yopmail.com',
    phone: '081234567890',
    date: '17/10/23 13:30:00',
    total: 200000,
    status: 'WAITING'
  },
  {
    key: '2',
    queue: 2,
    orderNumber: 'TRK-08012400002',
    name: 'Jhon Doe',
    email: 'jhon@yopmail.com',
    phone: '081234567890',
    date: '17/10/23 13:30:00',
    total: 200000,
    status: 'WAITING'
  },
  {
    key: '3',
    queue: 3,
    orderNumber: 'TRK-08012400003',
    name: 'Jhon Doe',
    email: 'jhon@yopmail.com',
    phone: '081234567890',
    date: '17/10/23 13:30:00',
    total: 200000,
    status: 'PAID'
  },
];

export class Order extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       visible: false,
       submitLoading: false
    }
  }

  showDetail = () => {
    this.setState({ visible: true })
  }

  hideDetail = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible, submitLoading } = this.state
    return (
      <React.Fragment>
        <Row className='main-content'>
          <Col span={24} style={{ marginBottom: 8 }}>
            <Card className='rounded' style={{ border: 'none' }}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Breadcrumb>
                    <Breadcrumb.Item><DollarOutlined /> Order</Breadcrumb.Item>
                    <Breadcrumb.Item>Order List</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={24}>
                  <PageHeader 
                    className="site-page-header" 
                    title='Order List'
                  />
                </Col>
                <Col span={24}>
                  <Table columns={columns(this.showDetail)} dataSource={data} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal 
          title='Detail Order'
          visible={visible} 
          onCancel={this.hideDetail} 
          footer={false}
          width={700}
          destroyOnClose
        >
          <Row gutter={[0,16]}>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Order Number</Text>
                <Text strong>TRK-08012400002</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Total Price</Text>
                <Text strong>200,000 IDR</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Order Date</Text>
                <Text strong>TRK-08012400002</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Status</Text>
                <Tag color="warning">
                  Waiting for Payment
                </Tag>
              </Space>
            </Col>
            <Col span={24}>
              <Space direction='vertical' size={0}>
                <Text>Name</Text>
                <Text strong>Jhon Doe</Text>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row style={{ marginBottom: 8 }}>
            <Col span={8}>
              <Text>Product Name</Text>
            </Col>
            <Col span={8}>
              <Text>Qty</Text>
            </Col>
            <Col span={8}>
              <Text>Sub Total</Text>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Text strong>Fried Chicken</Text>
            </Col>
            <Col span={8}>
              <Text strong>2</Text>
            </Col>
            <Col span={8}>
              <Text strong>30,000</Text>
            </Col>
            <Col span={8}>
              <Text strong>Iced Tea</Text>
            </Col>
            <Col span={8}>
              <Text strong>2</Text>
            </Col>
            <Col span={8}>
              <Text strong>10,000</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 32 }}>
            <Col span={24}>
              <Space style={{ float: 'right' }}>
                <Button type='danger' ghost>Reject</Button>
                <Button type="primary" loading={submitLoading}>Accept</Button>
              </Space>
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Order)