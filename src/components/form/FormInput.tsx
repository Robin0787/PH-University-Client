import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface TInputProps {
  name: string;
  label: string;
  type: string;
  className?: string;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
}

const FormInput = ({
  type,
  label,
  className = "input",
  name,
  placeholder,
  value,
  disabled,
}: TInputProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <Input
              {...field}
              type={type}
              id={name}
              value={value}
              className={className}
              placeholder={placeholder}
              disabled={disabled}
            />
            {error && <small className="errorMessage">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
