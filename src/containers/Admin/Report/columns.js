import { Button, Tag } from 'antd'

export const columns = (showDetail) => {
  return [
    {
      title: 'Order Number',
      key: 'orderNumber',
      render: (record) => record.orderNumber,
    },
    {
      title: 'Name',
      key: 'name',
      render: (record) => record.name,
    },
    {
      title: 'Order Date',
      key: 'date',
      render: (record) => record.date,
    },
    {
      title: 'Total Price',
      key: 'total',
      render: (record) => record.total,
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => (
        record.status === 'DONE' ?
          <Tag color="blue">
            Done
          </Tag>
        : record.status === 'REJECTED' ?
          <Tag color="red">
            Rejected
          </Tag>
        : null
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Button type='primary' ghost onClick={showDetail}>
          Check Detail
        </Button>
      ),
    },
  ]
}