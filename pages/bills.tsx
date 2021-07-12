import { Card, List } from "antd";
import { GetStaticProps } from "next";
import Link from "next/link";
import { fetchAllBills } from "../api";
import { withLayout } from "../layouts/main";
import { Bill } from "../types/bill";

type BillsProps = { bills: Bill[] };

export const getStaticProps: GetStaticProps = async () => {
  const bills = await fetchAllBills();
  return { props: { bills } };
};

const BillsPage = ({ bills }: BillsProps) => (
  <section>
    <h1>All bills</h1>
    <List
      grid={{ gutter: 16, column: 4 }}
      pagination={{ pageSize: 12 }}
      dataSource={bills}
      renderItem={(bill) => (
        <Link href={`/bills/${bill.id}`}>
          <a>
            <List.Item>
              <Card title={bill.id} bordered={false}>
                <p>{bill.name}</p>
              </Card>
            </List.Item>
          </a>
        </Link>
      )}
    />
  </section>
);

export default withLayout(BillsPage);
