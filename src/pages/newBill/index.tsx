import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createBill } from '../../api/bills';
import { BillForm } from '../../components/billForm';
import { withLayout } from '../../layouts/main';
import { BillFormType } from '../../types/bill';

const NewBillPage = () => {
  // Hooks
  const { handleSubmit, control } = useForm<BillFormType>();
  const history = useHistory();

  // Logic
  const onSubmit = handleSubmit(async (data) => {
    const newId = await createBill(data);
    history.push(`/bills/${newId}`);
  });

  return (
    <>
      <h1>Create a new bill</h1>

      <BillForm onFinish={onSubmit} control={control} />
    </>
  );
};

export default withLayout(NewBillPage);
