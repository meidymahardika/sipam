import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loading } from '../../../components'
import { Row, Col, Card, Breadcrumb, PageHeader, Table, Modal, Space, Typography, Tag, Divider, Button, Pagination, Skeleton, message } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { columns } from './columns'
import { listOrder, detailOrder, updateStatusPaid, unmountListOrder, unmountDetailOrder } from '../../../redux/actions/order/orderAction'

const { Text } = Typography

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

  showDetail = (data) => {
    const { actionDetailOrder } = this.props
    this.setState({ 
      visible: true,
      dataDetail: data
    })
    actionDetailOrder(data.id)
  }

  hideDetail = () => {
    this.setState({ visible: false })
  }

  handleAccept = (id) => {
    const { meta } = this.state
    const { actionUpdateStatusPaid, actionListOrder } = this.props

    return actionUpdateStatusPaid(id, () => {
      this.setState({ submitLoading: false, visible: false }, () => {
        message.success(`Successfully changed status`)
        return actionListOrder(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }

  pagination = (page, perpage) => {
    const { meta } = this.state;
    const { actionListOrder } = this.props;
    meta.page = page
    meta.perpage = perpage
    return actionListOrder(meta)
  }

  render() {
    const { visible, dataDetail, submitLoading } = this.state
    const { getListOrder: { data, pagination, loading}, getDetailOrder } = this.props

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
                  <Table 
                    columns={columns(this.showDetail)} 
                    dataSource={data}
                    pagination={false}
                  />
                </Col>
                {/* Pagination */}
                <Col span={24}>
                  <Pagination
                    total={pagination.total}
                    onChange={this.pagination}
                    current={pagination.page}
                    pageSize={pagination.perpage}
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} Data`}
                  />
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
                <Text strong>{dataDetail?.order_number}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Name</Text>
                <Text strong>{dataDetail?.name}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Email</Text>
                <Text strong>{dataDetail?.email}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Phone</Text>
                <Text strong>{dataDetail?.phone}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Order Date</Text>
                <Text strong>{moment(dataDetail?.created_at).format('lll')}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Total Price</Text>
                <Text strong>Rp {dataDetail?.total.toLocaleString()}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Payment Method</Text>
                <Text strong>{dataDetail?.payment_method === 1 ? 'Bank Transfer' : 'Cash'}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Status</Text>
                {
                  dataDetail?.status === 'WAITING' ?
                    <Tag color="warning">
                      Waiting for Payment
                    </Tag>
                  : dataDetail?.status === 'PAID' ?
                    <Tag color="success">
                      Paid
                    </Tag>
                  : null
                }
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Queue</Text>
                <Text strong>{dataDetail?.queue}</Text>
              </Space>
            </Col>
          </Row>
          <Divider />
          {
            getDetailOrder.loading ?
              <Skeleton />
            :
              <>
              <Row style={{ marginBottom: 8 }}>
                <Col span={6}>
                  <Text>Product Name</Text>
                </Col>
                <Col span={6}>
                  <Text>Qty</Text>
                </Col>
                <Col span={6}>
                  <Text>Price</Text>
                </Col>
                <Col span={6}>
                  <Text>Sub Total</Text>
                </Col>
              </Row>
              <Row>
                {
                  getDetailOrder?.data?.map((item,i) =>
                    <React.Fragment key={i}>
                      <Col span={6}>
                        <Text strong>{item.name}</Text>
                      </Col>
                      <Col span={6}>
                        <Text strong>{item.qty}</Text>
                      </Col>
                      <Col span={6}>
                        <Text strong>Rp {item.price.toLocaleString()}</Text>
                      </Col>
                      <Col span={6}>
                        <Text strong>Rp {(item.price*item.qty).toLocaleString()}</Text>
                      </Col>
                    </React.Fragment>
                  )
                }
              </Row>
              </>
          }
          <Row style={{ marginTop: 32 }}>
            <Col span={24}>
              {
                dataDetail?.status === 'PAID' ?
                  <Space style={{ float: 'right' }}>
                    <Button type="primary" loading={submitLoading}>Done</Button>
                  </Space>
                :
                  <Space style={{ float: 'right' }}>
                    <Button type='danger' ghost>Reject</Button>
                    <Button onClick={() => this.handleAccept(dataDetail?.id)} type="primary" loading={submitLoading}>Accept</Button>
                  </Space>
              }
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
      
    )
  }
  componentWillUnmount() {
    const { unmountListOrder, unmountDetailOrder } = this.props
    unmountListOrder()
    unmountDetailOrder()
  }
}

const mapStateToProps = (state) => ({
  getListOrder: state.orderReducer.list,
  getDetailOrder: state.orderReducer.detail
})

const mapDispatchToProps = {
  actionListOrder: listOrder,
  actionDetailOrder: detailOrder,
  actionUpdateStatusPaid: updateStatusPaid,
  unmountListOrder: unmountListOrder,
  unmountDetailOrder: unmountDetailOrder

}

export default connect(mapStateToProps, mapDispatchToProps)(Order)