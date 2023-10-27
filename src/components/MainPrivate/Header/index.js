import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Image } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import Logo from '../../../assets/img/logo.png'

const { Header } = Layout

export default function PrivateHeader(props) {
  return (
    <Header className='header-private'>
      <Image
        width={150}
        src={Logo}
        preview={false}
        style={{ marginLeft: -32 }}
      />
      <Link to="#" onClick={props.setLogout} style={{ float: 'right' }}>
        <LogoutOutlined /> Logout
      </Link>
    </Header>
  )
}
