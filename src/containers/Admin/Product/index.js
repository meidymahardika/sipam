import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loading } from '../../../components'
import { Row, Col, Card, Button, Breadcrumb, PageHeader, Table, Modal, Form, Input, InputNumber, Space, Upload, Select, Typography, Tag, Image, Pagination, message } from 'antd'
import { ShoppingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { columns } from './columns'
import { masterCategoryProduct, unmountMasterCategoryProduct } from '../../../redux/actions/categoryProduct/categoryProductAction'
import { listProduct, createProduct, updateProduct, updateStatusProduct, unmountListProduct } from '../../../redux/actions/product/productAction'

const { Text } = Typography
export class Product extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
  
    this.state = {
       visible: false,
       visibleDetail: false,
       submitLoading: false,
       deleteLoading: false,
       valueForm: null,
       meta: {
        page: 1,
        perpage: 20
       },
       image: null,
       isEdit: false,
       dataEdit: null
    }
  }
  
  componentDidMount() {
    const { meta } = this.state
    const { actionMasterCategoryProduct, actionListProduct } = this.props
    actionMasterCategoryProduct()
    actionListProduct(meta)
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  };

  showDetail = (data) => {
    this.setState({
      visibleDetail: true,
      dataDetail: data
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleDetail: false,
      isEdit: false,
      dataEdit: null
    })
  };
  
  handleUpload(){
    return {
      showUploadList: false,
      withCredentials: true,
      accept:"image/*",
      beforeUpload: file => {
        const validateSize = file.size >= 500000;
        if (validateSize) {
          message.error('Max file size is 500 KB!');
          return false
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.setState({ 
            image: file
          })
        }
        message.info('Upload Success!');
        return false;
      },
    }
  }

  handleRemove = () => {
    this.formRef.current.setFieldsValue({
      image: undefined
    })
    this.setState({ image: null })
  }

  onAdd = (values) => {
    const { meta } = this.state
    const { actionCreate, actionListProduct } = this.props;
    values.image = values.image.file
    values.isActive = 0
    this.setState({ submitLoading: true })
    return actionCreate(values, () => {
      this.setState({ submitLoading: false }, () => {
        message.success('Data created successfully')
        this.setState({ visible: false })
        return actionListProduct(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }

  onUpdate = (values) => {
    const { meta, dataEdit } = this.state
    const { actionUpdate, actionListProduct } = this.props;
    if(values.image){
      values.image = values.image.file
    }else{
      delete values.image
    }
    values.id = dataEdit?.id
    values.isActive = dataEdit?.is_active
    this.setState({ submitLoading: true })
    return actionUpdate(values, () => {
      this.setState({ submitLoading: false }, () => {
        message.success('Data updated successfully')
        this.setState({ visible: false })
        return actionListProduct(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }

  handleSetStatus = (status, id) => {
    const { meta } = this.state
    const { actionUpdateStatus, actionListProduct } = this.props
    const values = {
      status: status
    }
    return actionUpdateStatus(id, values, () => {
      this.setState({ submitLoading: false }, () => {
        message.success(`Successfully changed status`)
        return actionListProduct(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }

  handleEdit = (data) => {
    this.setState({ visible: true, isEdit: true, dataEdit: data })
  }

  pagination = (page, perpage) => {
    const { meta } = this.state;
    const { actionListProduct } = this.props;
    meta.page = page
    meta.perpage = perpage
    return actionListProduct(meta)
  }
  
  render() {
    const { visible, visibleDetail, dataDetail, isEdit, dataEdit, submitLoading } = this.state
    const { getDataCategoryProduct, getListProduct: { data, pagination, loading } } = this.props

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
                  <Table 
                    dataSource={data} 
                    columns={columns(this.handleEdit, this.handleSetStatus, this.showDetail)} 
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
          title={isEdit ? 'Edit Product' : 'Add Product'}
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
            initialValues={{
              idCategoryProduct: dataEdit?.id_category_product,
              name: dataEdit?.name,
              price: dataEdit?.price,
              description: dataEdit?.description
            }}
          >
            <Row>
              <Col span={24}>
                <Form.Item name="idCategoryProduct" label="Category Product" style={{ marginBottom: 8 }}>
                  <Select>
                    {
                      getDataCategoryProduct?.data?.map(item => 
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="name" label="Name" style={{ marginBottom: 8 }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="price" label="Price" style={{ marginBottom: 8 }}>
                  <InputNumber 
                    className="full-width"
                    prefix="Rp" 
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/,/g, '')}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="image" label="Image" style={{ marginBottom: 8 }}>
                  <Upload 
                    {...this.handleUpload()}
                    onRemove={this.handleRemove}
                    listType='picture'
                    showUploadList
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="description" label="description" style={{ marginBottom: 20 }}>
                  <Input.TextArea rows={3} />
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
        <Modal 
          title='Detail Product'
          visible={visibleDetail} 
          onCancel={this.handleCancel} 
          footer={false}
          width={700}
          destroyOnClose
        >
          <Row gutter={[0,16]}>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Category Product</Text>
                <Text strong>{dataDetail?.category_name}</Text>
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
                <Text>Created Date</Text>
                <Text strong>{moment(dataDetail?.created_date).format('ll')}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Updated Date</Text>
                <Text strong>{moment(dataDetail?.updated_date).format('ll')}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Price</Text>
                <Text strong>Rp {dataDetail?.price?.toLocaleString()}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' size={0}>
                <Text>Status</Text>
                {
                  dataDetail?.is_active === 1 ?
                    <Tag color="success">Ready</Tag>
                  : dataDetail?.is_active === 0 ?
                    <Tag color="error">Not Ready</Tag>
                  : null
                }
              </Space>
            </Col>
            <Col span={24}>
              <Space direction='vertical' size={0}>
                <Text>Image</Text>
                <Image
                  width={150}
                  src={`https://firebasestorage.googleapis.com/v0/b/sipam-c1be9.appspot.com/o/files%2F${dataDetail?.img?.split("_", 1).pop()}?alt=media&${dataDetail?.img?.split("_", 2).pop()}`}
                />
              </Space>
            </Col>
            <Col span={24}>
              <Space direction='vertical' size={0}>
                <Text>Description</Text>
                <Text strong>{dataDetail?.description}</Text>
              </Space>
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
    )
  }
  componentWillUnmount() {
    const { unmountMasterCategoryProduct, unmountListProduct } = this.props
    unmountMasterCategoryProduct()
    unmountListProduct()
  }
}

const mapStateToProps = (state) => ({
  getDataCategoryProduct: state.categoryProduct.master,
  getListProduct: state.productReducer.list
})
  
const mapDispatchToProps = {
  actionMasterCategoryProduct: masterCategoryProduct,
  actionListProduct: listProduct,
  actionCreate: createProduct,
  actionUpdate: updateProduct,
  actionUpdateStatus: updateStatusProduct,
  unmountMasterCategoryProduct: unmountMasterCategoryProduct,
  unmountListProduct: unmountListProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)