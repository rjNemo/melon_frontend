import { Button, Form } from 'antd';
import { BaseSyntheticEvent } from 'react';
import { Control } from 'react-hook-form';
import { FormInput } from '../../components/formInput';
import { InputSelect } from '../../components/inputSelect';
import { RadioInput } from '../../components/radioInput';
import { monthToList, ReportFormType } from '../../types/report';

type Props = {
  onFinish: (e?: BaseSyntheticEvent) => Promise<void>;
  control: Control<ReportFormType>;
  monthlyReport: boolean;
};

export function ReportForm({ control, monthlyReport, onFinish }: Props) {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <RadioInput
        control={control}
        name="type"
        label="Report type"
        options={['Monthly', 'Yearly']}
      />

      <FormInput control={control} name="year" label="Year" type="number" />

      {monthlyReport && (
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
  );
}
