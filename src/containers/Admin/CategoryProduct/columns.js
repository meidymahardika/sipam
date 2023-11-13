import { Space, Button } from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

export const columns = (props) => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 10,
      align: 'center',
      render: (_,val,i) => i+1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text,
    },
    {
      title: 'Action',
      key: 'action',
      width: 40,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="danger" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]
}