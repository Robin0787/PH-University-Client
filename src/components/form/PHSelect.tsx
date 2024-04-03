import { Form, Select } from "antd";
import { BaseOptionType } from "antd/es/select";
import { Controller } from "react-hook-form";

interface TPHSelectProps {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  options: BaseOptionType[];
  disabled?: boolean;
  loading?: boolean;
  mode?: "multiple" | "tags" | undefined;
}

const PHSelect = ({
  label,
  name,
  placeholder,
  defaultValue,
  options,
  disabled,
  loading,
  mode = undefined,
}: TPHSelectProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <Select
              mode={mode}
              disabled={disabled}
              loading={loading}
              placeholder={placeholder}
              defaultValue={defaultValue}
              style={{ width: "100%", height: "40px" }}
              options={options}
              {...field}
            />
            {error && <small className="errorMessage">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHSelect;
