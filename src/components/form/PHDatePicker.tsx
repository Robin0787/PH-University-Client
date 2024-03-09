import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

interface TInputProps {
  name: string;
  label: string;
}

const PHDatePicker = ({ label, name }: TInputProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
            {error && <small className="errorMessage">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
