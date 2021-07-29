import { Form, Radio } from 'antd';
import { Controller } from 'react-hook-form';

type RadioInputProps = {
  control: any;
  name: string;
  label: string;
  options: string[];
};

export const RadioInput = ({ control, name, label, options }: RadioInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item label={label}>
        <Radio.Group {...field}>
          {options.map((label, value) => (
            <Radio key={value} value={label.toLowerCase()}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    )}
  />
);
