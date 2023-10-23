import React, { Component } from 'react';
import * as Containers from '../containers';
// import { connect } from 'react-redux';
import { PrivateRoute, PublicRoute } from './route'
import { BrowserRouter as Router, Switch } from "react-router-dom";

export class AppRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute exact path='/' component={Containers.Menu} passProps={this.props} private={false} />
          <PublicRoute path='/q' component={Containers.Menu} passProps={this.props} private={false} />
          <PrivateRoute path='/admin' component={Containers.Menu} passProps={this.props} private={true} />
        </Switch>
      </Router>
    )
  }
}
// const mapStateToProps = (state) => ({
// })
// const mapDispatchToProps = {
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)
export default AppRoute