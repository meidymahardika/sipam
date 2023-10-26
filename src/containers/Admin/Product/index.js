import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Button, Breadcrumb, PageHeader, Table } from 'antd'
import { ShoppingOutlined, PlusOutlined } from '@ant-design/icons'
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

export class Product extends Component {
  render() {
    return (
      <Row className='main-content'>
        <Col span={24} style={{ marginBottom: 8 }}>
          <Card className='rounded' style={{ border: 'none' }}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Breadcrumb>
                  <Breadcrumb.Item><ShoppingOutlined /> Product</Breadcrumb.Item>
                  <Breadcrumb.Item>Product List</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={24}>
                <PageHeader 
                  className="site-page-header" 
                  title='Product List'
                  extra={[
                    <Button className='rounded' type="primary" icon={<PlusOutlined />} ghost>
                      Add Product
                    </Button>
                    ,
                  ]}
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

export default connect(mapStateToProps, mapDispatchToProps)(Product)