import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type FormInputProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  addonAfter?: string;
  type?: string;
};

export function FormInput({
  control,
  name,
  label,
  placeholder,
  addonAfter,
  type = 'text'
}: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Input placeholder={placeholder} {...field} addonAfter={addonAfter} type={type} />
        </Form.Item>
      )}
    />
  );
}
