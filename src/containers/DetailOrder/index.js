import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Space, Card, Typography } from 'antd'
import { getNextQueue } from '../../redux/actions/order/orderAction'

const { Text, Title } = Typography

export class DetailOrder extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       nextQueue: 0,
    }
  }

  componentDidMount(){
    const { actionGetNextQueue } = this.props
    if(!localStorage.getItem("detailTotalPrice")){
      this.props.history.push('/')
    }
    actionGetNextQueue((res) => {
      this.setState({ nextQueue: res.next_queue })
    })
  }

  render() {
    const { nextQueue } = this.state
    return (
      <React.Fragment>
        <Row className='main-content'>
          <Col span={12} style={{ paddingRight: 4 }}>
            <Card className='rounded' bodyStyle={{ padding: 16 }}>
              <Space direction='vertical'>
                <Text>Your Queue Number</Text>
                <Title type='success' strong style={{ margin: 0 }}>{localStorage.getItem("queue")}</Title>
              </Space>
            </Card>
          </Col>
          <Col span={12} style={{ paddingLeft: 4 }}>
            <Card className='rounded' bodyStyle={{ padding: 16 }}>
              <Space direction='vertical'>
                <Text>Next Queue Number</Text>
                <Title type='warning' strong style={{ margin: 0 }}>{nextQueue}</Title>
              </Space>
            </Card>
          </Col>
          <Col span={24} style={{ paddingTop: 8 }}>
            <Card className='rounded' bodyStyle={{ padding: 16 }}>
              <Row gutter={[0,8]}>
                <Col span={24}>
                  <Text className='text-title'>Data Customer</Text>
                </Col>
                <Col span={24}>
                  <Space direction='vertical' size={0}>
                    <Text>Name</Text>
                    <Text strong>{localStorage.getItem("name")}</Text>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space direction='vertical' size={0}>
                    <Text>Phone Number</Text>
                    <Text strong>{localStorage.getItem("phone")}</Text>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space direction='vertical' size={0}>
                    <Text>Email</Text>
                    <Text strong>{localStorage.getItem("email")}</Text>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: 16, marginBottom: 16 }}>
                  <Text className='text-title'>Detail Order</Text>
                </Col>
                <Col span={24}>
                  {
                    JSON.parse(localStorage.getItem("detailData"))?.map((item,i) =>
                      <Card key={i} className='rounded' style={{ marginBottom: 8 }} bodyStyle={{ padding: 8 }}>
                        <Space size={16}>
                          <Space direction='vertical' size={0}>
                            <Text>{item.name}</Text>
                            <Text strong>Rp {item.price.toLocaleString()}</Text>
                          </Space>
                        </Space>
                        <Space style={{ float: 'right', marginTop: 12 }}>
                          <Text>x {JSON.parse(localStorage.getItem("detailData")).find(res => res.id === item.id)?.qty}</Text>
                        </Space>
                      </Card>
                    )
                  }
                </Col>
                <Col span={24} style={{ marginTop: 16 }}>
                  <Space direction='vertical' size={0}>
                    <Text>Payment Method</Text>
                    <Text strong>{localStorage.getItem("paymentMethod") === '1' ? 'Bank Transfer' : 'Cash'}</Text>
                  </Space>
                </Col>
                <Col span={24} style={{ marginTop: 16 }}>
                </Col>
                <Col span={24} style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 20 }}>Total Payment</Text>
                  <Text strong type='primary' style={{ color: '#F56E00', float: 'right', fontSize: 20 }}>Rp {localStorage.getItem("detailTotalPrice")}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  actionGetNextQueue: getNextQueue,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder)