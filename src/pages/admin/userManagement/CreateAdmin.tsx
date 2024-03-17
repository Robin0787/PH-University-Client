import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Divider, Flex, Form, Input, Row } from "antd";
import { BaseOptionType } from "antd/es/select";
import { Controller, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/form/FormInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { useCreateAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { UserManagementValidationSchemas } from "../../../schemas/UserManagement.schema";
import handleAPIRequest from "../../../utils/handleAPIRequest";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const { data: departmentData, isLoading: isDepartmentDataLoading } =
    useGetAllDepartmentQuery(undefined);
  const admissionDepartmentOptions = departmentData?.data?.map(
    (department) => ({
      value: department._id,
      label: department.name,
    })
  );

  const [createAdmin] = useCreateAdminMutation();

  const handleCreateAdmin = async (data: FieldValues) => {
    const toastId = toast.loading("Admin is creating...");

    const facultyData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    handleAPIRequest(createAdmin, formData, toastId, navigate, "/admin/admins");
  };

  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm
            onSubmit={handleCreateAdmin}
            resolver={zodResolver(
              UserManagementValidationSchemas.adminCreateValidationSchema
            )}
          >
            <GradientContainer>
              <div
                style={{ padding: "20px", width: "100%" }}
                className="container"
              >
                <h3 className="heading">Create Admin</h3>
                <div className="phForm">
                  <Divider>Personal Information</Divider>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="name.firstName"
                        label="First Name"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="name.middleName"
                        label="Middle Name (Optional)"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="name.lastName"
                        label="Last Name"
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHSelect
                        name="gender"
                        label="Gender"
                        placeholder="Select Gender"
                        options={genderOptions}
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHDatePicker name="dateOfBirth" label="Date of Birth" />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHSelect
                        name="bloodGroup"
                        label="Blood Group"
                        placeholder="Select Blood Group"
                        options={bloodGroupOptions}
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <Controller
                        name="image"
                        render={({ field: { onChange, value, ...field } }) => (
                          <Form.Item
                            label={<p style={{ fontSize: "16px" }}>Image</p>}
                          >
                            <Input
                              size="large"
                              type="file"
                              value={value?.fileName}
                              {...field}
                              onChange={(e) => onChange(e.target?.files?.[0])}
                            />
                          </Form.Item>
                        )}
                      />
                    </Col>
                  </Row>
                  <Divider>Contact Information</Divider>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput type="text" name="email" label="Email" />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="number"
                        name="contactNo"
                        label="Contact Number"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="number"
                        name="emergencyContactNo"
                        label="Emergency Contact Number"
                      />
                    </Col>
                  </Row>
                  <Divider>Address</Divider>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="presentAddress"
                        label="Present Address"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="permanentAddress"
                        label="Permanent Address"
                      />
                    </Col>
                  </Row>
                  <Divider>Academic Information</Divider>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="designation"
                        label="Designation"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHSelect
                        name="managementDepartment"
                        label="Management Department"
                        disabled={isDepartmentDataLoading}
                        placeholder="Select Management Department"
                        options={admissionDepartmentOptions as BaseOptionType[]}
                      />
                    </Col>
                  </Row>
                  <div>
                    <button type="submit" className="submitBtn">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </GradientContainer>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAdmin;
