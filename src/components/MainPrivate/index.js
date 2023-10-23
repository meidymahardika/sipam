import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Cookie from 'js-cookie';
import { Layout } from 'antd';
// import Header from './Header';
// import Sider from './Sider';
// import Footer from './Footer';

const { Content } = Layout;

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
  
  componentDidMount() {
    // const { params } = this.state
    // const { actionCheckToken, actionGetHeader, actionListNotification, actionCountNotification } = this.props
    // const getToken = Cookie.get('user')
    
    // if(!getToken){
    //   window.location.reload()
    // }

    // if(window.location.pathname !== '/candidate/career-pathway/question/basic-english'){
    //   localStorage.removeItem('isTest')
    // }

    // if(window.location.pathname !== '/candidate/career-pathway/question/mini-english'){
    //   localStorage.removeItem('isTestMiniEnglish')
    //   localStorage.removeItem("questionListening")
    //   localStorage.removeItem("questionStructure")
    //   localStorage.removeItem("questionWrittenExp")
    //   localStorage.removeItem("questionReadingCompre")
    // }


    // return actionCheckToken((response) => {
    //   if(!response){
    //     window.location.reload()
    //   }

    //   if(response.code === "1000"){
    //     if(!localStorage.getItem('imageCandidate')){
    //       actionGetHeader()
    //       localStorage.setItem('imageCandidate', true);
    //     }
    //     actionListNotification(params)
    //     actionCountNotification()
    //   }
    // })
  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  onClickSider = () => {
    const { sidebar } = this.state
    this.setState({
      sidebar: sidebar === true ? false : true
    })
  }

  showNotification = () => {
    this.setState({
      visibleNotification: true
    })
  }

  onCloseNotification = () => {
    this.setState({
      visibleNotification: false
    })
  }

  setLogout = () => {
    const { actionSetLogout } = this.props;
    
    return new Promise((resolve, reject) => {
      actionSetLogout(() => { resolve() }, () => reject())
    });

  }

  render() {
    const { children } = this.props
    const { visible, sidebar, visibleNotification } = this.state
    const { pathname } = window.location

    const initialProps = {
      visible: visible,
      sidebar: sidebar,
      visibleNotification: visibleNotification,
      showDrawer: this.showDrawer,
      onClose: this.onClose,
      onClickSider: this.onClickSider,
      showNotification: this.showNotification,
      onCloseNotification: this.onCloseNotification,
      setLogout: this.setLogout
    }

    return (
      <Layout style={{ position: 'relative', minHeight: '100vh' }}>
        {/* <Header {...initialProps} {...this.props} style={{ borderBottom: '2px solid #dfdfdf' }} /> */}
        <Layout>
          {/* {
            pathname === '/job-preferences/industries' || pathname === '/job-preferences/position' || pathname === '/job-preferences/destination' ?
              null
            :
              <Sider {...initialProps} {...this.props} />
          } */}
          <Content>
            { children }
          </Content>
        </Layout>
        {/* <Footer style={{ position: 'absolute', bottom: 0, width: '100%', height: '2.5rem' }} /> */}
      </Layout>
    )
  }
}

// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = {
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MainPrivate)
export default MainPrivate