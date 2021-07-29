import { Card, Col, Divider, List, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { Report } from '../../types/report';

type Props = {
  content: Report;
};

export function ReportResult({ content }: Props) {
  return (
    <>
      <Divider />
      <h2>{content.type.toUpperCase()} report </h2>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Revenue" value={content.revenue} suffix={'€'} />
        </Col>
        <Col span={12}>
          <Statistic title="Profit" value={content.profit} suffix={'€'} />
        </Col>
        <Col span={12}>
          <Statistic title="Bookings" value={content.bookings} />
        </Col>
      </Row>
      <Divider />
      <h3>Bills</h3>
      <Row gutter={16}>
        <List
          grid={{ gutter: 16, column: 4 }}
          pagination={{ pageSize: 12 }}
          dataSource={content.bills}
          renderItem={(bill) => (
            <Link to={`/bills/${bill.id}`}>
              <List.Item>
                <Card title={bill.id} bordered={false}>
                  <p>{bill.name}</p>
                </Card>
              </List.Item>
            </Link>
          )}
        />
      </Row>
    </>
  );
}
