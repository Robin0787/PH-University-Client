import FormInput from "../../../../components/form/FormInput";
import PHForm from "../../../../components/form/PHForm";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
const CreateAcademicSemester = () => {
  const handleCreateAcademicSemester = (data: any) => {
    console.log(data);
  };
  return (
    <section className="main">
      <PHForm onSubmit={handleCreateAcademicSemester}>
        <GradientContainer>
          <div className="form">
            <div className="heading">Create Academic Semester</div>
            <div className="container">
              <div>
                <label htmlFor="name">Name</label>
                <span>:</span>
                <FormInput type="text" name="name" />
              </div>
              <div>
                <label htmlFor="Year">Year</label>
                <span>:</span>
                <FormInput type="number" name="year" />
              </div>
              <div>
                <label htmlFor="Code">Code</label>
                <span>:</span>
                <FormInput type="text" name="code" />
              </div>
              <div>
                <label htmlFor="startMonth">Start Month</label>
                <span>:</span>
                <FormInput type="text" name="startMonth" />
              </div>
              <div>
                <label htmlFor="endMonth">End Month</label>
                <span>:</span>
                <FormInput type="text" name="endMonth" />
              </div>
              <div>
                <button type="submit">Create</button>
              </div>
            </div>
          </div>
        </GradientContainer>
      </PHForm>
    </section>
  );
};

export default CreateAcademicSemester;
