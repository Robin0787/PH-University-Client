import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Flex } from "antd";
import { BaseOptionType } from "antd/es/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/form/FormInput";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllFacultyQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../../schemas/AcademicManagement.schema";
import { TAcademicFaculty } from "../../../../types/academicManagement.types";
import handleAPIRequest from "../../../../utils/handleAPIRequest";

const CreateAcademicDepartment = () => {
  const navigate = useNavigate();
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const { data: faculties } = useGetAllFacultyQuery(undefined);

  const facultyOptions: BaseOptionType[] = [];
  if (faculties && faculties?.data?.length > 0) {
    faculties.data.map((item: TAcademicFaculty) => {
      facultyOptions.push({
        label: item.name,
        value: item._id,
      });
    });
  }

  const handleCreateAcademicDepartment = async (data: any) => {
    const toastId = toast.loading("Department is creating");

    handleAPIRequest(
      createAcademicDepartment,
      data,
      toastId,
      navigate,
      "/admin/academic-departments"
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={12}>
          <PHForm
            onSubmit={handleCreateAcademicDepartment}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <GradientContainer>
              <div style={{ padding: "20px", width: "100%" }}>
                <h3 className="heading">Create Academic Department</h3>
                <div>
                  <FormInput type="text" name="name" label="Department Name" />
                  <PHSelect
                    placeholder="Select Academic Faculty"
                    name="academicFaculty"
                    label="Academic Faculty"
                    options={facultyOptions}
                  />
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

export default CreateAcademicDepartment;
