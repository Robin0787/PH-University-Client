import { Form, Select } from "antd";
import { BaseOptionType } from "antd/es/select";

interface TPHSelectProps {
  label: string;
  defaultValue: string;
  options: BaseOptionType[];
  setSelect: (selected: string) => void;
}

const PHSelect = ({
  label,
  defaultValue,
  options,
  setSelect,
}: TPHSelectProps) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Form.Item>
        <Select
          defaultValue={defaultValue}
          style={{ width: "100%", height: "40px" }}
          onChange={(value) => {
            setSelect(value);
          }}
          options={options}
        />
      </Form.Item>
    </div>
  );
};

export default PHSelect;
