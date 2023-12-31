import React from 'react'
import { Layout, Image } from 'antd'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
const { Header } = Layout

export default function PublicHeader() {
  return (
    <Header className='header-public'>
      <Link to={`/`}>
        <Image
          width={150}
          src={Logo}
          preview={false}
          style={{ marginLeft: -32 }}
        />
      </Link>
      {/* <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(15).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      /> */}
    </Header>
  )
}
