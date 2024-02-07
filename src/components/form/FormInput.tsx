import { Input } from "antd";
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
    <Controller
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          id={name}
          className={className}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default FormInput;
