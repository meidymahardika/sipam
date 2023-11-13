import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Button, Breadcrumb, PageHeader, Table, Modal, Form, Input, Space } from 'antd'
import { GroupOutlined, PlusOutlined } from '@ant-design/icons'
import { columns } from './columns'

const data = [
  {
    key: '1',
    name: 'Food',
  },
  {
    key: '2',
    name: 'Drink',
  },
];

export class CategoryProduct extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
  
    this.state = {
       visible: false,
       submitLoading: false,
       deleteLoading: false,
       valueForm: null
    }
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false
    })
  };
  
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
                    <Breadcrumb.Item><GroupOutlined /> Category Product</Breadcrumb.Item>
                    <Breadcrumb.Item>Category Product List</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={24}>
                  <PageHeader 
                    className="site-page-header" 
                    title='Category Product List'
                    extra={[
                      <Button className='rounded' type="primary" onClick={this.showModal} icon={<PlusOutlined />} ghost>
                        Add Category Product
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
        <Modal 
          title='Add Category Product'
          visible={visible} 
          onCancel={this.handleCancel} 
          footer={false}
          width={700}
          destroyOnClose
        >
          <Form 
            ref={this.formRef}
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={24}>
                <Form.Item name="Name" label="Name" style={{ marginBottom: 8 }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Space style={{ float: 'right' }}>
                  <Button onClick={this.handleCancel}>Cancel</Button>
                  <Button htmlType="submit" type="primary" loading={submitLoading}>Add</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct)