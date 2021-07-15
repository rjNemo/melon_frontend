import { Button, Form, Input, Switch } from 'antd';
import { BaseSyntheticEvent } from 'react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { BillFormType } from '../types/bill';
import { InputSelect } from './inputSelect';

type Props = {
  onFinish: (e?: BaseSyntheticEvent) => Promise<void>;
  control: Control<BillFormType>;
  register: UseFormRegister<BillFormType>;
};

export function BillForm({ onFinish, control, register }: Props) {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Customer name">
        <Input placeholder="Cameron Doe" {...register('name')} />
      </Form.Item>

      <Form.Item label="Customer phone number">
        <Input placeholder="06 12 34 56 78" {...register('phoneNumber')} />
      </Form.Item>

      <Form.Item label="Price">
        <Input placeholder="75.00" addonAfter="€" {...register('price')} />
      </Form.Item>

      <Form.Item label="Start">
        <Input type="date" {...register('start')} />
      </Form.Item>

      <Form.Item label="End">
        <Input type="date" {...register('end')} />
      </Form.Item>

      <InputSelect
        control={control}
        name="room"
        label="Room"
        placeholder="Choose a room to stay"
        options={['T2 Corail', 'T3 Azur']}
      />

      <Form.Item label="Customers number">
        <Input type="number" {...register('customers')} placeholder="1" />
      </Form.Item>

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
