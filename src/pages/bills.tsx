import { Card, List } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBills } from '../api';
import { withLayout } from '../layouts/main';
import { Bill } from '../types/bill';

function BillsPage() {
  // Local State
  const [bills, setBills] = useState<Bill[]>([]);

  // Effects
  useEffect(() => {
    const loadBills = async () => {
      const loadedBills = await fetchAllBills();
      setBills(() => loadedBills);
    };

    loadBills();
  }, []);

  return (
    <section>
      <h1>All bills</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        pagination={{ pageSize: 12 }}
        dataSource={bills}
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
    </section>
  );
}

export default withLayout(BillsPage);
