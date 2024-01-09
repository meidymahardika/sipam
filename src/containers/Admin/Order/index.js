import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../../components'
import { Row, Col, Card, Breadcrumb, PageHeader, Table, Modal, Space, Typography, Tag, Divider, Button } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { columns } from './columns'
import { listOrder, unmountListOrder } from '../../../redux/actions/order/orderAction'

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
       submitLoading: false,
       meta: {
        page: 1,
        perpage: 20
       },
    }
  }

  componentDidMount() {
    const { meta } = this.state
    const { actionListOrder } = this.props
    actionListOrder(meta)
  }

  showDetail = () => {
    this.setState({ visible: true })
  }

  hideDetail = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible, submitLoading } = this.state
    const { getListOrder: { data, pagination, loading} } = this.props

    if(loading){
      return <Loading />
    }

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
                <Text>Name</Text>
                <Text strong>Jhon Doe</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Email</Text>
                <Text strong>jhon@yopmail.com</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Phone</Text>
                <Text strong>08976543212</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Order Date</Text>
                <Text strong>2024-01-09</Text>
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
                <Text>Payment Method</Text>
                <Text strong>Cash</Text>
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
  componentWillUnmount() {
    const { unmountListOrder } = this.props
    unmountListOrder()
  }
}

const mapStateToProps = (state) => ({
  getListOrder: state.orderReducer.list
})

const mapDispatchToProps = {
  actionListOrder: listOrder,
  unmountListOrder: unmountListOrder

}

export default connect(mapStateToProps, mapDispatchToProps)(Order)