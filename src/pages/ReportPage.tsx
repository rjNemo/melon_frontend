import { Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { fetchReport } from '../api/reports';
import { FormInput } from '../components/formInput';
import { InputSelect } from '../components/inputSelect';
import { RadioInput } from '../components/radioInput';
import { withLayout } from '../layouts/main';
import { monthToList, ReportFormType, ReportType } from '../types/report';

function ReportPage() {
  // hooks
  const { control, handleSubmit, watch } = useForm<ReportFormType>({
    defaultValues: {
      type: ReportType.monthly,
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    }
  });

  // Logic
  const onFinish = handleSubmit((data) => fetchReport(data));

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

        <FormInput control={control} name="year" label="Year" type="number" />

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
