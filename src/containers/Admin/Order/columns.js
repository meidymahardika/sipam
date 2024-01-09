import { Button, Tag } from 'antd'
import moment from 'moment'

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
      render: (record) => record.order_number,
    },
    {
      title: 'Name',
      key: 'name',
      render: (record) => record.name,
    },
    {
      title: 'Order Date',
      key: 'date',
      render: (record) => moment(record.created_at).format('lll'),
    },
    {
      title: 'Total Price',
      key: 'total',
      render: (record) => `Rp ${record.total.toLocaleString()}`,
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
        <Button type='primary' ghost onClick={() => showDetail(record)}>
          Check Detail
        </Button>
      ),
    },
  ]
}