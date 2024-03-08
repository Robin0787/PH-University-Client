import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Flex } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/form/FormInput";
import PHForm from "../../../../components/form/PHForm";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { useCreateAcademicFacultyMutation } from "../../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../../schemas/AcademicManagement.schema";
import { TIssue, TResponse } from "../../../../types";
import { TAcademicFaculty } from "../../../../types/academicManagement.types";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const navigate = useNavigate();

  const handleCreateAcademicFaculty = async (data: any) => {
    const toastId = toast.loading("Faculty is creating");

    try {
      const res: TResponse<TAcademicFaculty> = await createAcademicFaculty(
        data
      ).unwrap();
      if (res.success) {
        toast.success(res.message || "Faculty is created successfully", {
          id: toastId,
        });
        navigate("/admin/academic-faculties");
      }
    } catch (error: any) {
      const errorSources = error?.data?.errorSources;
      if (errorSources.length > 0) {
        errorSources.map((issue: TIssue) =>
          toast.error(issue?.message || "Something went wrong", { id: toastId })
        );
      } else {
        toast.error(error?.message || "Something went wrong", { id: toastId });
      }
    }
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
