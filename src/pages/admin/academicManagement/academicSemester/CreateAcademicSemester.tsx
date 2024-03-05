import { BaseOptionType } from "antd/es/select";
import { useState } from "react";
import FormInput from "../../../../components/form/FormInput";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { AcademicSemesterNames } from "../../../../constant/academicSemester";
import { getSemesterCodeBasedOnSemesterName } from "./academicSemester.utils";

const semesterNamesForSelect: BaseOptionType[] = AcademicSemesterNames.map(
  (item: string) => ({
    value: item,
    label: item,
  })
);

const CreateAcademicSemester = () => {
  const [semesterName, setSemesterName] = useState<string>(
    semesterNamesForSelect[0]?.value
  );

  const semesterCode = getSemesterCodeBasedOnSemesterName(semesterName);

  const handleCreateAcademicSemester = (data: any) => {
    data.code = semesterCode;
    data.name = semesterName;
    console.log(data);
  };

  return (
    <section className="main">
      <PHForm onSubmit={handleCreateAcademicSemester}>
        <GradientContainer>
          <div className="form">
            <div className="heading">Create Academic Semester</div>
            <div>
              <PHSelect
                label="Semester Name"
                options={semesterNamesForSelect}
                defaultValue={semesterName}
                setSelect={setSemesterName}
              />
              <FormInput type="number" name="year" label="Year" />
              <FormInput
                type="text"
                name="code"
                label="Code"
                disabled={true}
                value={semesterCode}
              />
              <FormInput type="text" name="startMonth" label="Start Month" />
              <FormInput type="text" name="endMonth" label="End Month" />
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
