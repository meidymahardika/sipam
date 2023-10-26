import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Breadcrumb, PageHeader, Table } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { columns } from './columns'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export class Transaction extends Component {
  render() {
    return (
      <Row className='main-content'>
        <Col span={24} style={{ marginBottom: 8 }}>
          <Card className='rounded' style={{ border: 'none' }}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Breadcrumb>
                  <Breadcrumb.Item><DollarOutlined /> Transaction</Breadcrumb.Item>
                  <Breadcrumb.Item>Transaction List</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={24}>
                <PageHeader 
                  className="site-page-header" 
                  title='Transaction List'
                />
              </Col>
              <Col span={24}>
                <Table columns={columns()} dataSource={data} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)