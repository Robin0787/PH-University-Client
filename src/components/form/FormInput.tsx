import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface TInputProps {
  name: string;
  type: string;
  className?: string;
  placeholder?: string;
}

const FormInput = ({
  type,
  className = "input",
  name,
  placeholder,
}: TInputProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{name}</p>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item>
            <Input
              {...field}
              type={type}
              id={name}
              className={className}
              placeholder={placeholder}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
