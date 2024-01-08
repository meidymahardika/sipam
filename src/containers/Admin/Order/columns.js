import { Button, Tag } from 'antd'

export const columns = (showDetail) => {
  return [
    {
      title: 'Queue Number',
      key: 'queue',
      render: (record) => record.queue,
    },
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
      title: 'Email',
      key: 'email',
      render: (record) => record.email,
    },
    {
      title: 'Phone',
      key: 'phone',
      render: (record) => record.phone,
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
        record.status === 'WAITING' ?
          <Tag color="warning">
            Waiting for Payment
          </Tag>
        : record.status === 'PAID' ?
          <Tag color="success">
            Paid
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