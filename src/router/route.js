import React from 'react'
import { MainPublic, MainPrivate } from '../components'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, passProps, ...res }) => {
  return (
    <React.Fragment>
      <Route 
        {...res} 
        render = {
          (props) => 
          passProps.authed ? <MainPrivate {...res} {...props}> <Component {...res} {...props} /> </MainPrivate> 
          : 
          <Redirect to="/admin" /> 
        } 
      />
    </React.Fragment>
  )
}
export const PublicRoute = ({ component: Component, passProps, ...res }) => {
  return (
    <Route 
      {...res}
      render = {
        (props) => 
        !passProps.authed ? 
          <MainPublic {...res} {...props}> <Component {...res} {...props} /> </MainPublic>
        : 
          <Redirect to="/admin/order"/>
       }
    />
  )
}
