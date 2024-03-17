import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { semesterNamesForSelect } from "../../../../constant/academicSemester";
import { monthListForSelect } from "../../../../constant/global";
import { useCreateAcademicSemesterMutation } from "../../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../../schemas/AcademicManagement.schema";
import handleAPIRequest from "../../../../utils/handleAPIRequest";
import {
  getSemesterCodeBasedOnSemesterName,
  yearListForSelect,
} from "./academicSemester.utils";

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const navigate = useNavigate();

  const handleCreateAcademicSemester = async (data: any) => {
    const toastId = toast.loading("Creating Academic Semester");
    const semesterCode = getSemesterCodeBasedOnSemesterName(data.name);
    data.code = semesterCode;

    handleAPIRequest(
      createAcademicSemester,
      data,
      toastId,
      navigate,
      "/admin/academic-semesters"
    );
  };

  return (
    <section className="main">
      <PHForm
        onSubmit={handleCreateAcademicSemester}
        resolver={zodResolver(academicSemesterSchema)}
      >
        <GradientContainer>
          <div className="form">
            <div className="heading">Create Academic Semester</div>
            <div>
              <PHSelect
                label="Semester Name"
                name="name"
                placeholder="Select Semester Name"
                options={semesterNamesForSelect}
              />
              <PHSelect
                name="year"
                label="Year"
                options={yearListForSelect}
                placeholder="Select Semester Year"
              />
              <PHSelect
                name="startMonth"
                label="Start Month"
                options={monthListForSelect}
                placeholder="Select Start Month"
              />
              <PHSelect
                name="endMonth"
                label="End Month"
                options={monthListForSelect}
                placeholder="Select End Month"
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
    </section>
  );
};

export default CreateAcademicSemester;
