import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Divider, Flex, Form, Input, Row } from "antd";
import { BaseOptionType } from "antd/es/select";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/form/FormInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import {
  useGetAllDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { UserManagementValidationSchemas } from "../../../schemas/UserManagement.schema";
import handleAPIRequest from "../../../utils/handleAPIRequest";

const CreateStudent = () => {
  const [createStudent] = useCreateStudentMutation();
  const navigate = useNavigate();

  const { data: semesterData, isLoading: isSemesterDataLoading } =
    useGetAllSemesterQuery(undefined);
  const { data: departmentData, isLoading: isDepartmentDataLoading } =
    useGetAllDepartmentQuery(undefined, { skip: isSemesterDataLoading });

  const admissionSemesterOptions = semesterData?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.name} - ${semester.year} (${semester.startMonth}-${semester.endMonth})`,
  }));
  const admissionDepartmentOptions = departmentData?.data?.map(
    (department) => ({
      value: department._id,
      label: department.name,
    })
  );

  const handleCreateStudent = async (data: any) => {
    const toastId = toast.loading("Student is creating...");
    const studentData = {
      password: "student123",
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    handleAPIRequest(
      createStudent,
      formData,
      toastId,
      navigate,
      "/admin/faculties"
    );
  };
  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm
            onSubmit={handleCreateStudent}
            resolver={zodResolver(
              UserManagementValidationSchemas.studentCreateValidationSchema
            )}
          >
            <GradientContainer>
              <div
                style={{ padding: "20px", width: "100%" }}
                className="container"
              >
                <h3 className="heading">Create Student</h3>
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
                  <Divider>Guardian Information</Divider>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="guardian.fatherName"
                        label="Father Name"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="guardian.fatherOccupation"
                        label="Father Occupation"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="number"
                        name="guardian.fatherContactNo"
                        label="Father Contact No"
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="guardian.motherName"
                        label="Mother Name"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="guardian.motherOccupation"
                        label="Mother Occupation"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="number"
                        name="guardian.motherContactNo"
                        label="Mother Contact No"
                      />
                    </Col>
                  </Row>
                  <Divider>Local Guardian Information</Divider>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="localGuardian.name"
                        label="Name"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="localGuardian.occupation"
                        label="Occupation"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="number"
                        name="localGuardian.contactNo"
                        label="Contact No"
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <FormInput
                        type="text"
                        name="localGuardian.address"
                        label="Address"
                      />
                    </Col>
                  </Row>
                  <Divider>Student Address</Divider>
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
                      <PHSelect
                        name="admissionSemester"
                        label="Admission Semester"
                        disabled={isSemesterDataLoading}
                        placeholder="Select Admission Semester"
                        options={admissionSemesterOptions as BaseOptionType[]}
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

export default CreateStudent;
