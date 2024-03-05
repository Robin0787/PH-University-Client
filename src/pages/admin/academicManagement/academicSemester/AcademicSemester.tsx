import { LoaderIcon } from "react-hot-toast";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { useGetAllSemesterQuery } from "../../../../redux/features/admin/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAllSemesterQuery(undefined);
  const academicSemesters = data?.data;
  return (
    <GradientContainer>
      <div style={{ padding: "20px" }}>
        <h1>Academic Semester</h1>
        {isLoading ? (
          <LoaderIcon
            style={{
              width: "30px",
              height: "30px",
              borderWidth: "4px",
              marginBlock: "20px",
            }}
          />
        ) : academicSemesters?.length > 0 ? (
          academicSemesters?.map((item: any) => {
            return <p key={item._id}>{item.name as string}</p>;
          })
        ) : (
          <p>No Semester Found</p>
        )}
      </div>
    </GradientContainer>
  );
};

export default AcademicSemester;
