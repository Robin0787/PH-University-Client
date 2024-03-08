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
import { TAcademicSemester } from "../../../../types/academicManagement.types";
import { TIssue, TResponse } from "../../../../types/global.types";
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

    try {
      const res: TResponse<TAcademicSemester> = await createAcademicSemester(
        data
      ).unwrap();
      if (res.success) {
        toast.success(res.message || "Semester is created successfully", {
          id: toastId,
        });
        navigate("/admin/academic-semester");
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
