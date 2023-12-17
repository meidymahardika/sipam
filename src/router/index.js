import React, { Component } from 'react';
import * as Containers from '../containers';
import { connect } from 'react-redux';
import { PrivateRoute, PublicRoute } from './route'
import { HashRouter as Router, Switch } from "react-router-dom";
import { checkAuth } from '../redux/actions/auth/authAction';
import { Loading } from '../components';

export class AppRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { actionCheckAuth } = this.props;
    actionCheckAuth()
  }
  
  render() {
    const { loading } = this.props;

    if(loading){ 
      return <Loading />
    }

    return (
      <Router>
        <Switch>
          <PublicRoute exact path='/' component={Containers.Menu} passProps={this.props} private={false} />
          <PublicRoute exact path='/checkout' component={Containers.Checkout} passProps={this.props} private={false} />
          <PublicRoute exact path='/admin' component={Containers.Login} passProps={this.props} private={false} />
          <PrivateRoute exact path='/admin/order' component={Containers.Order} passProps={this.props} private={true} />
          <PrivateRoute exact path='/admin/product' component={Containers.Product} passProps={this.props} private={true} />
          <PrivateRoute exact path='/admin/category-product' component={Containers.CategoryProduct} passProps={this.props} private={true} />
          <PrivateRoute exact path='/admin/report' component={Containers.Report} passProps={this.props} private={true} />
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = (state) => ({
  loading     : state.authReducer.loading,
  authed      : state.authReducer.authed,
})
const mapDispatchToProps = {
  actionCheckAuth: checkAuth
}
export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)