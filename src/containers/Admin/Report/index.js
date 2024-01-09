import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loading } from '../../../components'
import { Row, Col, Card, Breadcrumb, PageHeader, Table, Modal, Space, Typography, Tag, Divider, Pagination, Skeleton } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { columns } from './columns'
import { listReport, unmountListReport } from '../../../redux/actions/report/reportAction'
import { detailOrder, unmountDetailOrder } from '../../../redux/actions/order/orderAction'

const { Text } = Typography

export class Report extends Component {
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
    const { actionListReport } = this.props
    actionListReport(meta)
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
    this.setState({ visible: false, dataDetail: null })
  }

  render() {
    const { visible, dataDetail } = this.state
    const { getListReport: { data, pagination, loading}, getDetailOrder } = this.props

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
                    <Breadcrumb.Item><DollarOutlined /> Report</Breadcrumb.Item>
                    <Breadcrumb.Item>Report List</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={24}>
                  <PageHeader 
                    className="site-page-header" 
                    title='Report List'
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
          title='Detail Report'
          visible={visible} 
          onCancel={this.hideDetail} 
          cancelText={false}
          width={700}
          destroyOnClose
          footer={false}
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
                  dataDetail?.status === 'DONE' ?
                    <Tag color="blue">
                      Done
                    </Tag>
                  : dataDetail?.status === 'REJECTED' ?
                    <Tag color="red">
                      Rejected
                    </Tag>
                  : null
                }
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
        </Modal>
      </React.Fragment>
      
    )
  }
  componentWillUnmount() {
    const { unmountListReport, unmountDetailOrder } = this.props
    unmountListReport()
    unmountDetailOrder()
  }
}

const mapStateToProps = (state) => ({
  getListReport: state.reportReducer.list,
  getDetailOrder: state.orderReducer.detail
})

const mapDispatchToProps = {
  actionListReport: listReport,
  actionDetailOrder: detailOrder,
  unmountListReport: unmountListReport,
  unmountDetailOrder: unmountDetailOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)