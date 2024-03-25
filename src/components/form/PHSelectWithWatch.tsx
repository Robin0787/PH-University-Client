import { Form, Select } from "antd";
import { BaseOptionType } from "antd/es/select";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

interface TPHSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  options: BaseOptionType[];
  disabled?: boolean;
  loading?: boolean;
  mode?: "multiple" | "tags" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
}

const PHSelectWithWatch = ({
  label,
  name,
  placeholder,
  defaultValue,
  options,
  disabled,
  loading,
  mode = undefined,
  onValueChange,
}: TPHSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

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

export default PHSelectWithWatch;
