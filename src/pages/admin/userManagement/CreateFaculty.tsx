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
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { facultyValidationSchemas } from "../../../schemas/UserManagement.schema";
import { TIssue } from "../../../types";

const CreateFaculty = () => {
  const { data: departmentData, isLoading: isDepartmentDataLoading } =
    useGetAllDepartmentQuery(undefined);
  const admissionDepartmentOptions = departmentData?.data?.map(
    (department) => ({
      value: department._id,
      label: department.name,
    })
  );
  const navigate = useNavigate();

  const [createFaculty] = useCreateFacultyMutation();

  const handleCreateFaculty = async (data: FieldValues) => {
    if (!data.dateOfBirth) {
      toast.error("Date of Birth is required!");
      return;
    }
    const toastId = toast.loading("Faculty is creating...");

    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    try {
      const res = await createFaculty(formData).unwrap();
      if (res.success) {
        toast.success(res.message || "Faculty is created successfully", {
          id: toastId,
        });
        navigate("/admin/faculties");
      }
    } catch (error: any) {
      const errorSources = error?.data?.errorSources;
      if (errorSources.length > 0) {
        errorSources.map((issue: TIssue) =>
          toast.error(
            "(" + issue?.path + "): " + issue?.message ||
              "Something went wrong",
            { id: toastId }
          )
        );
      } else {
        toast.error(error?.message || "Something went wrong", { id: toastId });
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm
            onSubmit={handleCreateFaculty}
            resolver={zodResolver(
              facultyValidationSchemas.facultyCreateValidationSchema
            )}
          >
            <GradientContainer>
              <div
                style={{ padding: "20px", width: "100%" }}
                className="container"
              >
                <h3 className="heading">Create Faculty</h3>
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
                        name="academicDepartment"
                        label="Academic Department"
                        disabled={isDepartmentDataLoading}
                        placeholder="Select Academic Department"
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

export default CreateFaculty;
