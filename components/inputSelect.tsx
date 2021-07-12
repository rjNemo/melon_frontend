import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type InputSelectProps = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
};

export const InputSelect = ({ control, name, label, placeholder, options }: InputSelectProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item label={label}>
        <Select
          showSearch
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          options={options.map((label, value) => ({
            value,
            label,
          }))}
          {...field}
        />
      </Form.Item>
    )}
  />
);
