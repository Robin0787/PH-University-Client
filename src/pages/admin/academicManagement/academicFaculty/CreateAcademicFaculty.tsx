import { Col, Flex } from "antd";
import FormInput from "../../../../components/form/FormInput";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";

const CreateAcademicFaculty = () => {
  const handleCreateAcademicFaculty = (data: any) => {
    console.log(data);
  };
  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={12}>
          <PHForm onSubmit={handleCreateAcademicFaculty}>
            <GradientContainer>
              <div style={{ padding: "20px", width: "100%" }}>
                <h3 className="heading">Create Academic Faculty</h3>
                <div>
                  <PHSelect label="Name" />
                  <FormInput type="number" name="Year" />
                  <FormInput type="text" name="Code" />
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

export default CreateAcademicFaculty;
