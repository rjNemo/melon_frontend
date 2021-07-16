import { Button, Col, Divider, message, PageHeader, Space, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneBill, sendBillAsPDF, updateBill } from '../../api';
import { BillForm } from '../../components/billForm';
import { withLayout } from '../../layouts/main';
import { Bill, BillFormType } from '../../types/bill';
import { BillSent } from './billSent';

export type QueryParams = { id: string };

const BillPage = () => {
  // Hooks
  let { id } = useParams<QueryParams>();
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm<BillFormType>();

  // Local State
  const [sent, setSent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bill, setBill] = useState<Bill>({} as Bill);

  // Effects
  const loadBill = useCallback(
    async (id: string) => {
      const billID = parseInt(id);
      const { data: loadedBill, error } = await fetchOneBill(billID);
      if (loadedBill && !error) {
        setBill(() => loadedBill);
        const { id, ...values } = loadedBill;
        reset(values);
      }
    },
    [reset]
  );

  useEffect(() => {
    loadBill(id);
  }, [id, loadBill, reset]);

  // Logic
  const handleSendPDF = (id: number) => {
    sendBillAsPDF(id);
    message.success('The bill will be sent to the customer');
    setSent(() => true);
  };

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await updateBill(parseInt(id), data);
    if (error) {
      message.error(`Update failed because of ${error}`);
    }
    setEdit(() => false);
    loadBill(id);
  });

  const content = edit ? (
    <BillForm onFinish={onSubmit} control={control} />
  ) : sent ? (
    <BillSent />
  ) : (
    <Col>
      <Typography.Text>{bill.name}</Typography.Text>
      <Typography.Text>{bill.price} €</Typography.Text>
      <Typography.Text>
        from {bill.start} to {bill.end}
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
