import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  const academicSemesters = data?.data;
  console.log(academicSemesters);
  return (
    <div>
      <h1>Academic Semester</h1>
    </div>
  );
};

export default AcademicSemester;
