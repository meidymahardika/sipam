import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../../components'
import { Row, Col, Card, Button, Breadcrumb, PageHeader, Table, Modal, Form, Input, InputNumber, Space, Upload, Select, message } from 'antd'
import { ShoppingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { columns } from './columns'
import { masterCategoryProduct, unmountMasterCategoryProduct } from '../../../redux/actions/categoryProduct/categoryProductAction'
import { listProduct, createProduct, unmountListProduct } from '../../../redux/actions/product/productAction'

export class Product extends Component {
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
        perpage: 20
       },
       image: null
    }
  }
  
  componentDidMount() {
    const { meta } = this.state
    const { actionMasterCategoryProduct, acttionListProduct } = this.props
    actionMasterCategoryProduct()
    acttionListProduct(meta)
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
    const { actionCreate, acttionListProduct } = this.props;
    values.image = values.image.file
    values.isActive = 0
    this.setState({ submitLoading: true })
    return actionCreate(values, () => {
      this.setState({ submitLoading: false }, () => {
        message.success('Data created successfully')
        this.setState({ visible: false })
        return acttionListProduct(meta)
      })
    }, (err) => {
      this.setState({ submitLoading: false }, () => message.error(err))
    })
  }
  
  render() {
    const { visible, submitLoading, image } = this.state
    const { getDataCategoryProduct, getListProduct: { data, loading } } = this.props

    if(loading){
      return <Loading />
    }

    console.log(2, image);
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
                    columns={columns(this.handleEdit, this.handleDelete)} 
                  />
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
            onFinish={this.onAdd}
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
                  <Button htmlType="submit" type="primary" loading={submitLoading}>Add</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
  componentWillUnmount() {
    const { unmountMasterCategoryProduct } = this.props
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
  acttionListProduct: listProduct,
  actionCreate: createProduct,
  unmountMasterCategoryProduct: unmountMasterCategoryProduct,
  unmountListProduct: unmountListProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)