import { LoaderIcon } from "react-hot-toast";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAllSemesterQuery(undefined);
  const academicSemesters = data?.data;
  return (
    <div style={{ height: "100vh" }}>
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
      ) : (
        academicSemesters?.map((item) => {
          return <p key={item._id}>{item.name as string}</p>;
        })
      )}
    </div>
  );
};

export default AcademicSemester;
