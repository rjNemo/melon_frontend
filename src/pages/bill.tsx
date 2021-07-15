import { Button, message, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneBill, sendBillAsPDF } from '../api';
import { withLayout } from '../layouts/main';
import { Bill } from '../types/bill';
import NotFoundPage from './notFound';

export type QueryParams = { id: string };

const BillPage = () => {
  // Hooks
  const { id } = useParams<QueryParams>();
  const [sent, setSent] = useState(false);
  // Local State
  const [bill, setBill] = useState<Bill>({} as Bill);

  // Effects
  useEffect(() => {
    const loadBIllById = async (id: string) => {
      const billID = parseInt(id);
      const { data: loadedBill, error } = await fetchOneBill(billID);
      if (!loadedBill || error) {
        return <NotFoundPage />;
      }
      setBill(() => loadedBill);
      return;
    };

    loadBIllById(id);
  }, [id]);

  // Logic
  const handleSendPDF = (id: number) => {
    sendBillAsPDF(id);
    message.success('The bill will be sent to the customer');
    setSent(() => true);
  };

  return (
    <main>
      <Typography.Title>Facture #VFNI{`${bill.id}`.padStart(4, '0')}</Typography.Title>
      <Space>
        <Button type="primary" onClick={() => handleSendPDF(bill.id)} disabled={sent}>
          {sent ? 'The bill is on its way to your customer' : 'Send Bill'}
        </Button>
      </Space>

      <Space>
        <Typography.Text>{bill?.name}</Typography.Text>
        <Typography.Text>{bill?.price} €</Typography.Text>
        <Typography.Text>
          from {bill?.start} to {bill?.end}
        </Typography.Text>
      </Space>
    </main>
  );
};

export default withLayout(BillPage);
