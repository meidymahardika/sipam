import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../../components'
import { Row, Col, Card, Button, Breadcrumb, PageHeader, Table, Modal, Form, Input, Space, Pagination, message } from 'antd'
import { GroupOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { columns } from './columns'
import { listCategoryProduct, createCategoryProduct, deleteCategoryProduct, updateCategoryProduct, unmountListCategoryProduct } from '../../../redux/actions/categoryProduct/categoryProductAction'

const { confirm } = Modal

export class CategoryProduct extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
  
    this.state = {
       visible: false,
       submitLoading: false,
       deleteLoading: false,
       valueForm: null,
       meta: {
        page: 1,
        perpage: 10
       },
       isEdit: false,
       dataEdit: null
    }
  }
  
  componentDidMount() {
    const { meta } = this.state
    const { actionGetCategoryProduct } = this.props

    return actionGetCategoryProduct(meta)
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      isEdit: false,
      dataEdit: null
    })
  };
  
  onAdd = (values) => {
    const { meta } = this.state
    const { actionCreate, actionGetCategoryProduct } = this.props;
    this.setState({ submitLoading: true })

    return actionCreate(values, () => {
      this.setState({ submitLoading: false }, () => {
        message.success('Data created successfully')
        this.setState({ visible: false })
        return actionGetCategoryProduct(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }

  onUpdate = (values) => {
    const { meta, dataEdit, isEdit } = this.state
    const { actionUpdate, actionGetCategoryProduct } = this.props;
    this.setState({ submitLoading: true })
    const id = dataEdit?.id
    return actionUpdate(id, values, () => {
      this.setState({ submitLoading: false }, () => {
        message.success(`Data ${isEdit ? 'updated' : 'created'} successfully`)
        this.setState({ visible: false })
        return actionGetCategoryProduct(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }

  handleEdit = (id, name) => {
    this.setState({ visible: true, isEdit: true, dataEdit: {id, name} })
  }

  handleDelete = (value) => {
    const { meta } = this.state;
    const { actionDelete, actionGetCategoryProduct } = this.props;
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return actionDelete(value, () => {
          message.success('Successfully deleted data')
          return actionGetCategoryProduct(meta)
        }, (err) => message.error(err))
      },
      onCancel() {},
    });
  }

  pagination = (page, perpage) => {
    const { meta } = this.state;
    const { actionGetCategoryProduct } = this.props;
    meta.page = page
    meta.perpage = perpage
    return actionGetCategoryProduct(meta)
  }

  render() {
    const { visible, submitLoading, isEdit, dataEdit } = this.state
    const { getData: { data, pagination, loading } } = this.props

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
                  <Table 
                    dataSource={data} 
                    columns={columns(this.handleEdit, this.handleDelete)} 
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
          title={isEdit ? 'Edit Category Product' : 'Add Category Product'}
          visible={visible} 
          onCancel={this.handleCancel} 
          footer={false}
          width={700}
          destroyOnClose
        >
          <Form 
            ref={this.formRef}
            layout="vertical"
            onFinish={isEdit ? this.onUpdate : this.onAdd}
          >
            <Row>
              <Col span={24}>
                <Form.Item 
                  name="name" 
                  label="Name" 
                  initialValue={dataEdit?.name ? dataEdit?.name : null} 
                  style={{ marginBottom: 20 }}
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Space style={{ float: 'right' }}>
                  <Button onClick={this.handleCancel}>Cancel</Button>
                  <Button htmlType="submit" type="primary" loading={submitLoading}>{isEdit ? 'Update' : 'Add'}</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
  componentWillUnmount() {
    const { unmountListCategoryProduct } = this.props
    return unmountListCategoryProduct()
  }
}

const mapStateToProps = (state) => ({
  getData: state.categoryProduct.list
})

const mapDispatchToProps = {
  actionGetCategoryProduct: listCategoryProduct,
  actionCreate: createCategoryProduct,
  actionDelete: deleteCategoryProduct,
  actionUpdate: updateCategoryProduct,
  unmountListCategoryProduct: unmountListCategoryProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct)