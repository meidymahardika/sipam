import { Space, Button } from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

export const columns = (handleEdit, handleDelete) => {
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
      key: 'name',
      render: (record) => record.name,
    },
    {
      key: 'action',
      width: 40,
      align: 'right',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record.id, record.name)} icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]
}