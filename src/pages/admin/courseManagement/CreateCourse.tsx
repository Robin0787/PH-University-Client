import { Col, Flex, Row } from "antd";
import { FieldValues } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import PHForm from "../../../components/form/PHForm";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";

const CreateCourse = () => {
  const handleCreateCourse = async (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="responsive-width80">
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm onSubmit={handleCreateCourse}>
            <GradientContainer>
              <div
                style={{ padding: "20px", width: "100%" }}
                className="container"
              >
                <h3 className="heading">Create Course</h3>
                <div className="phForm">
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput
                        type="text"
                        name="title"
                        label="Course Title"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="text" name="prefix" label="Prefix" />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="number" name="code" label="Code" />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="number" name="credit" label="Credit" />
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

export default CreateCourse;
