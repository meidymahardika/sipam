import React, { Component } from 'react';
import * as Containers from '../containers';
// import { connect } from 'react-redux';
import { Result } from 'antd';
import { PrivateRoute, PublicRoute } from './route'
import { BrowserRouter as Router, Switch } from "react-router-dom";

export class AppRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisconnected: false
    }
  }

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        () => {
          fetch('/google.com', {
            mode: 'no-cors',
            })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing)
            });
          }).catch(() => this.setState({ isDisconnected: true }) )
        }, 2000);
      return;
    }
    return this.setState({ isDisconnected: true });
  }

  render() {
    const { isDisconnected } = this.state;
    
    return (
      <div className="container">
        <Router>
          <Switch>
            <PublicRoute exact path='/' component={Containers.Menu} passProps={this.props} private={false} />
            <PublicRoute path='/q' component={Containers.Menu} passProps={this.props} private={false} />
            <PrivateRoute exact path='/admin' component={Containers.Menu} passProps={this.props} private={true} />
            { 
              isDisconnected && (
                <React.Fragment>
                  <Result status="500" title="Lost Connection" subTitle="Please check your internet connection" />
                </React.Fragment>
              )
            } 
          </Switch>
        </Router>
      </div>
    )
  }
}
// const mapStateToProps = (state) => ({
// })
// const mapDispatchToProps = {
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)
export default AppRoute