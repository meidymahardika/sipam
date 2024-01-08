import { Space, Tag, Button } from 'antd'
import {
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

export const columns = (handleEdit, handleSetStatus, showDetail) => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_,val,i) => i+1,
    },
    {
      title: 'Category Product',
      key: 'categoryProduct',
      render: (record) => record.category_name,
    },
    {
      title: 'Name',
      key: 'name',
      render: (record) => record.name,
    },
    {
      title: 'Price',
      key: 'price',
      render: (record) => `Rp ${record?.price?.toLocaleString()}`,

    },
    {
      title: 'Status',
      key: 'status',
      width: 50,
      render: (record) => (
        record.is_active === 1 ?
          <Tag color="success">Ready</Tag>
        :
          <Tag color="error">Not Ready</Tag>
      ),
    },
    {
      key: 'action',
      width: 40,
      align: 'right',
      render: (record) => (
        <Space>
          <Button onClick={() => handleEdit(record)} type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          {
            record.is_active === 1 ?
              <Button onClick={() => handleSetStatus(0, record.id)} type="danger" icon={<CloseCircleOutlined />} ghost style={{ width: 150 }}>
                Set Not Ready
              </Button>
            :
              <Button onClick={() => handleSetStatus(1, record.id)} type="primary" icon={<CheckCircleOutlined />} ghost style={{ width: 150 }}>
                Set Ready
              </Button>
          }
          <Button onClick={() => showDetail(record)} icon={<SearchOutlined />}>Detail</Button>
          {/* <Button type="danger" icon={<DeleteOutlined />}>
            Delete
          </Button> */}
        </Space>
      ),
    },
  ]
}