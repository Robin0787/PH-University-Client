import { Col, Divider, Flex, Row } from "antd";
import FormInput from "../../components/form/FormInput";
import PHDatePicker from "../../components/form/PHDatePicker";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import GradientContainer from "../../components/gradientContainer/gradientContainer";
import { bloodGroupOptions, genderOptions } from "../../constant/global";

const CreateStudent = () => {
  const handleCreateStudent = async (data: any) => {
    console.log(data);

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));

    // // This is for development
    // // Just for checking the formData in console
    // console.log(Object.fromEntries(formData));
  };
  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm onSubmit={handleCreateStudent}>
            <GradientContainer>
              <div style={{ padding: "20px", width: "100%" }}>
                <h3 className="heading">Create Student</h3>

                <div>
                  <Divider>Personal Info</Divider>
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
