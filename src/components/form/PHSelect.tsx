import { Form, Select } from "antd";

const PHSelect = ({ label }: { label: string }) => {
  return (
    <div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{label}</p>
      <Form.Item>
        <Select
          defaultValue="lucy"
          style={{ width: "100%" }}
          onChange={(value) => {
            console.log(value);
          }}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Form.Item>
    </div>
  );
};

export default PHSelect;
