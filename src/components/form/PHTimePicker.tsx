import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TPHTimePickerProps = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

const PHTimePicker = ({
  name,
  label,
  placeholder,
  disabled,
}: TPHTimePickerProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <TimePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              format={"HH:mm"}
              disabled={disabled}
              placeholder={placeholder}
            />
            {error && <small className="errorMessage">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
