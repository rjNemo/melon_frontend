import { Button, Col, Divider, message, PageHeader, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { createBill, fetchOneBill, sendBillAsPDF } from '../../api';
import { BillForm } from '../../components/billForm';
import { withLayout } from '../../layouts/main';
import { Bill } from '../../types/bill';
import NotFoundPage from '../notFound';
import { BillSent } from './billSent';

export type QueryParams = { id: string };

const BillPage = () => {
  // Hooks
  const { id } = useParams<QueryParams>();
  const history = useHistory();

  const defaultValues = {
    customers: 0,
    start: '',
    end: '',
    name: '',
    paymentMethod: 0,
    paymentStatus: 0,
    phoneNumber: '',
    platform: 0,
    price: 0,
    room: 0,
    taxes: false
  };

  const { register, handleSubmit, control, reset } = useForm<BillFormType>({
    defaultValues
  });

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

  const onSubmit = handleSubmit(async (data) => {
    await createBill(data);
  });

  const content = edit ? (
    <BillForm onFinish={onSubmit} control={control} register={register} />
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
          disabled={edit}
        >
          Edit
        </Button>
      </Space>
    </>
  );
};

export default withLayout(BillPage);
