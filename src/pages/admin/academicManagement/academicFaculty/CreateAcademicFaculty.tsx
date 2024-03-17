import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Flex } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/form/FormInput";
import PHForm from "../../../../components/form/PHForm";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { useCreateAcademicFacultyMutation } from "../../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../../schemas/AcademicManagement.schema";
import handleAPIRequest from "../../../../utils/handleAPIRequest";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const navigate = useNavigate();

  const handleCreateAcademicFaculty = async (data: any) => {
    const toastId = toast.loading("Faculty is creating");

    handleAPIRequest(
      createAcademicFaculty,
      data,
      toastId,
      navigate,
      "/admin/academic-faculties"
    );
  };
  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={12}>
          <PHForm
            onSubmit={handleCreateAcademicFaculty}
            resolver={zodResolver(academicFacultySchema)}
          >
            <GradientContainer>
              <div style={{ padding: "20px", width: "100%" }}>
                <h3 className="heading">Create Academic Faculty</h3>
                <div>
                  <FormInput type="text" name="name" label="Faculty Name" />
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
