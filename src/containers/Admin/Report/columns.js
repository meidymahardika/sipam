import { Button, Tag } from 'antd'
import moment from 'moment'

export const columns = (showDetail) => {
  return [
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
        <Button type='primary' ghost onClick={() => showDetail(record)}>
          Check Detail
        </Button>
      ),
    },
  ]
}