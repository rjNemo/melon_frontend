import { Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { InputSelect } from '../components/inputSelect';
import { RadioInput } from '../components/radioInput';
import { withLayout } from '../layouts/main';
import { monthToList, ReportFormType, ReportType } from '../types/report';

function ReportPage() {
  // hooks
  const { control, handleSubmit, watch } = useForm<ReportFormType>();

  // Logic
  const onFinish = handleSubmit((data) => console.log(data));

  const isMonthlyReport = watch('type') === ReportType.monthly;

  return (
    <>
      <h1>Reports</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <RadioInput
          control={control}
          name="type"
          label="Report type"
          options={['Monthly', 'Yearly']}
        />
        {isMonthlyReport && (
          <InputSelect
            control={control}
            name="month"
            label="Month"
            options={monthToList()}
            placeholder="For which month"
          />
        )}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default withLayout(ReportPage);
