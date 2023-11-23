import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Space, Card, Typography, Image, Button, Layout, Badge, Drawer, Divider } from 'antd'
import { PlusOutlined, ShoppingOutlined, MinusOutlined } from '@ant-design/icons'
import { indexProduct, unmountIndexProduct } from '../../redux/actions/product/productAction'
import { Loading } from '../../components'

const { Text } = Typography
const { Footer } = Layout

export class Menu extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data: [],
      totalPrice: 0,
      visible: false
    }
  }
  componentDidMount() {
    const { actionGetProduct } = this.props

    return actionGetProduct()
  }

  handleAddCart = (item) => {
    const { data } = this.state

    if(data.find(res => res.id === item.id)){
      data.forEach(res => {
        if(res.id === item.id){
          res.qty = res.qty+1
        }
      })
    }else{
      data.push({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        qty: 1
      })
    }
    this.setState({ data, totalPrice: data.reduce((acc, item) => acc + item.price * item.qty, 0) })
  }

  handleMinCart = (item) => {
    const { data } = this.state

    if(data.find(res => res.id === item.id)){
      data.forEach(res => {
        if(res.id === item.id){
          res.qty = res.qty-1
        }
      })
    }
    const filteredData = data.filter(item => item.qty > 0)
    this.setState({ data: filteredData, totalPrice: data.reduce((acc, item) => acc + item.price * item.qty, 0) })
  }
  
  showDrawer = () => {
    this.setState({ visible: true })
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  render() {
    const { getProduct } = this.props
    const { data, totalPrice, visible } = this.state
    
    if (getProduct.loading) {
      return <Loading />
    } 
    return (
      <React.Fragment>
        <Row className='main-content' style={data.length > 0 ? { marginBottom: 64 } : null}>
          {
            getProduct.data.map((item,i) => 
              <React.Fragment key={i}>
                <Col span={24} style={{ marginBottom: 8 }}>
                  <Text strong>{item.category}</Text>
                </Col>
                {
                  item.data.map((res,idxProd) => 
                    <Col key={idxProd} span={24} style={{ marginBottom: 8 }}>
                      <Card className='rounded' bodyStyle={{ padding: 8 }}>
                        <Space size={16}>
                          <Image
                            width={75}
                            height={75}
                            src='https://firebasestorage.googleapis.com/v0/b/sipam-c1be9.appspot.com/o/files%2F1699446864683?alt=media&token=f41644ab-e1f3-4d8c-81bb-a56c752808d2'
                            preview={false}
                          />
                          <Space direction='vertical' size={0}>
                            <Text>{res.name}</Text>
                            <Text strong>Rp {res.price.toLocaleString()}</Text>
                          </Space>
                        </Space>
                        <Space style={{ float: 'right', marginTop: 24 }}>
                          {
                            data.find(r => r.id === res.id) ?
                              <>
                                <Button type="primary" size='small' onClick={() => this.handleMinCart(res)} icon={<MinusOutlined />} ghost />
                                <Text>{data.find(r => r.id === res.id)?.qty}</Text>
                              </>
                            : null
                          }
                          <Button type="primary" size='small' onClick={() => this.handleAddCart(res)} icon={<PlusOutlined />} />
                        </Space>
                      </Card>
                    </Col>
                  )
                }
                {
                  getProduct.data.length !== i+1 ?
                    <Divider style={{ marginTop: 8, marginBottom: 16 }} />
                  : null
                }
              </React.Fragment>
            )
          }
        </Row>
        
        {
          data.length > 0 ?
            <Footer style={{ backgroundColor: '#fff1e6', position: 'fixed', zIndex: 1001, width: '100%', height: 64, bottom: 0, left: 0, paddingLeft: 16, paddingRight: 16, paddingTop: 12 }}>
              <Row justify="space-around" align="middle">
                <Col className='mb-16' span={24}>
                </Col>
                <Col span={8}>
                  <Badge count={data.length} color='#F56E00' size='small'>
                    <ShoppingOutlined onClick={this.showDrawer} style={{ fontSize: 30, color: '#F56E00' }} />
                  </Badge>
                </Col>
                <Col span={16}>
                  <Space style={{ float: 'right' }}>
                    <Text strong type='primary' style={{ color: '#F56E00' }}>Rp {totalPrice.toLocaleString()}</Text>
                    <Button type="primary" size="large">Checkout</Button>
                  </Space>
                </Col>
              </Row>
            </Footer>
          : null
        }

        <Drawer
          title="Cart"
          placement='bottom'          
          onClose={this.onClose}
          height={data.length > 5 ? 600 : 'auto'}
          open={visible}
          style={{ marginBottom: 56 }}
        >
          {
            data?.map((item,i) =>
              <Card key={i} className='rounded' style={{ marginBottom: 8 }} bodyStyle={{ padding: 8 }}>
                <Space size={16}>
                  <Image
                    width={75}
                    height={75}
                    src='https://firebasestorage.googleapis.com/v0/b/sipam-c1be9.appspot.com/o/files%2F1699446864683?alt=media&token=f41644ab-e1f3-4d8c-81bb-a56c752808d2'
                    preview={false}
                  />
                  <Space direction='vertical' size={0}>
                    <Text>{item.name}</Text>
                    <Text strong>Rp {item.price.toLocaleString()}</Text>
                  </Space>
                </Space>
                <Space style={{ float: 'right', marginTop: 24 }}>
                  <Text>x {data.find(res => res.id === item.id)?.qty}</Text>
                </Space>
              </Card>
            )
          }
        </Drawer>
      </React.Fragment>
    )
  }

  componentWillUnmount() {
    const { unmountIndexProduct } = this.props;
    unmountIndexProduct()
  }
}

const mapStateToProps = (state) => ({
  getProduct: state.productReducer
})

const mapDispatchToProps = {
  actionGetProduct: indexProduct,
  unmountIndexProduct: unmountIndexProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)