import React from 'react'
import { Layout, Image } from 'antd'
import Logo from '../../../assets/img/logo.png'
const { Header } = Layout

export default function PrivateHeader() {
  return (
    <Header className='header-private'>
      <Image
        width={150}
        src={Logo}
        preview={false}
        style={{ marginLeft: -32 }}
      />
    </Header>
  )
}
