import { Button, Form, Switch } from 'antd';
import { BaseSyntheticEvent } from 'react';
import { Control, Controller } from 'react-hook-form';
import { BillFormType } from '../types/bill';
import { FormInput } from './formInput';
import { InputSelect } from './inputSelect';

type Props = {
  onFinish: (e?: BaseSyntheticEvent) => Promise<void>;
  control: Control<BillFormType>;
};

export function BillForm({ onFinish, control }: Props) {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <FormInput control={control} name="name" label="Customer name" placeholder="Cameron Doe" />

      <FormInput
        control={control}
        name="phoneNumber"
        label="Customer phone number"
        placeholder="06 12 34 56 78"
      />

      <FormInput control={control} name="price" label="Price" placeholder="75.00" addonAfter="€" />

      <FormInput control={control} name="start" label="Start" type="date" />

      <FormInput control={control} name="end" label="End" type="date" />

      <InputSelect
        control={control}
        name="room"
        label="Room"
        placeholder="Choose a room to stay"
        options={['T2 Corail', 'T3 Azur']}
      />

      <FormInput
        control={control}
        name="customers"
        label="Customers number"
        placeholder="1"
        type="number"
      />

      <InputSelect
        control={control}
        name="platform"
        label="Booking Platform"
        placeholder="Select a booking platform"
        options={['Site', 'Booking.com', 'AirBnB', 'TripAdvisor', 'Perso']}
      />

      <Controller
        control={control}
        name="taxes"
        defaultValue={true}
        render={({ field }) => {
          const { value, ...props } = field;
          return (
            <Form.Item label="Include taxes">
              <Switch
                checkedChildren="yes"
                unCheckedChildren="no"
                defaultChecked
                checked={value}
                {...props}
              />
            </Form.Item>
          );
        }}
      />

      <InputSelect
        control={control}
        name="paymentMethod"
        label="Payment method"
        placeholder="How do you want to pay?"
        options={['Card', 'Cash', 'Cheque', 'Transfer']}
      />

      <InputSelect
        control={control}
        name="paymentStatus"
        label="Payment status"
        placeholder="What is the current payment status?"
        options={['Pending', 'Canceled', 'Completed', 'Refunded']}
      />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
