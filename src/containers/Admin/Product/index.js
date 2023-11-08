import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Button, Breadcrumb, PageHeader, Table, Modal, Form, Input, InputNumber, Space, Upload, message } from 'antd'
import { ShoppingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
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

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <React.Fragment>
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
                      <Button className='rounded' type="primary" onClick={this.showModal} icon={<PlusOutlined />} ghost>
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
        <Modal 
          title='Add Product'
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
                <Form.Item name="Price" label="Price">
                  <InputNumber 
                  className="full-width"
                  prefix="Rp" 
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/,/g, '')}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="image" label="Image">
                <Upload 
                  {...props}
                  listType='picture'
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product)