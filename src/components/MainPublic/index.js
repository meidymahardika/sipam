import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Cookie from 'js-cookie';
import { Layout } from 'antd';
import Header from './Header';
// import Footer from './Footer';
// import { checkToken } from '../../redux/actions/auth/authAction'
const { Content } = Layout;

export class MainPublic extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    }
  }

  render() {
    const { children } = this.props
    
    return (
      <React.Fragment>
        <Layout className='layout'>
          <Header />
          <Content>
            { children }
          </Content>
          {/* <Footer /> */}
        </Layout>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPublic)
