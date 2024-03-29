import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

interface TInputProps {
  name: string;
  label: string;
  disabled?: boolean;
}

const PHDatePicker = ({ label, name, disabled }: TInputProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <DatePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              disabled={disabled}
            />
            {error && <small className="errorMessage">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
