import React from 'react'
import { Layout, Menu } from 'antd'
import { DollarOutlined, ShoppingOutlined, FileTextOutlined } from '@ant-design/icons';

const { Sider } = Layout

const items = [
  {
    key: '/admin/transaction',
    label: 'Transaction',
    icon: <DollarOutlined />,
  },
  {
    key: '/admin/product',
    label: 'Product',
    icon: <ShoppingOutlined />,
  },
  {
    key: '/admin/report',
    label: 'Report',
    icon: <FileTextOutlined />,
  }
];

export default function SiderPrivate(props) {
  const onClick = (e) => {
    props.history.push(e.key)
  };

  return (
    <React.Fragment>
      <Sider 
        trigger={null} 
        collapsible 
        theme="light" 
        collapsedWidth={80}
      >
        <Menu
          onClick={onClick}
          defaultSelectedKeys={[props.path]}
          mode="vertical"
          items={items}
        />
        {/* <Menu
          mode="vertical"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        /> */}
      </Sider>
    </React.Fragment>
  )
}
