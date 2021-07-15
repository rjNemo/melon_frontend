import { Button, Col, Divider, message, PageHeader, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneBill, sendBillAsPDF } from '../../api';
import { withLayout } from '../../layouts/main';
import { Bill } from '../../types/bill';
import NotFoundPage from '../notFound';
import { BillSent } from './billSent';
import { EditBillForm } from './editBillForm';

export type QueryParams = { id: string };

const BillPage = () => {
  // Hooks
  const { id } = useParams<QueryParams>();
  const history = useHistory();

  // Local State
  const [sent, setSent] = useState(false);
  const [edit, setEdit] = useState(false);
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

  const content = edit ? (
    <EditBillForm bill={bill} />
  ) : sent ? (
    <BillSent />
  ) : (
    <Col>
      <Typography.Text>{bill?.name}</Typography.Text>
      <Typography.Text>{bill?.price} €</Typography.Text>
      <Typography.Text>
        from {bill?.start} to {bill?.end}
      </Typography.Text>
    </Col>
  );

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title={`Facture #VFNI${bill.id?.toString().padStart(4, '0')}`}
        subTitle={bill.name}
      />

      {content}

      <Divider />

      <Space>
        <Button type="primary" onClick={() => handleSendPDF(bill.id)} disabled={sent || edit}>
          Send Bill
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            setSent(() => false);
            setEdit(() => true);
          }}
        >
          Edit
        </Button>
      </Space>
    </>
  );
};

export default withLayout(BillPage);
