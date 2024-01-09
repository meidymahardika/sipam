import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Cookie from 'js-cookie';
import { Layout, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Header from './Header';
import Sider from './Sider';
// import Footer from './Footer';
import { setLogout } from '../../redux/actions/auth/authAction';

const { Content } = Layout;
const { confirm } = Modal;

export class MainPrivate extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      visible: false,
      sidebar: true,
      params: {
        page: 1,
        perpage: 100
      },
      visibleNotification: false
    }
  }
  setLogout = () => {
    const { actionSetLogout } = this.props;
    
    confirm({
      title: 'Are you sure want to logout?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          actionSetLogout(() => { resolve() }, () => reject())
        });
      },
      onCancel() {},
    });


  }

  render() {
    const { children } = this.props

    const initialProps = {
      setLogout: this.setLogout
    }

    return (
      <Layout className='layout'>
        <Header {...this.props} {...initialProps} />
        <Layout>
          <Sider {...this.props} />
          <Content>
            { children }
          </Content>
        </Layout>
        {/* <Footer /> */}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  actionSetLogout: setLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPrivate)