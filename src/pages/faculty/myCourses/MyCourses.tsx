import { useGetFacultyCoursesQuery } from "../../../redux/features/faculty/courseManagement.api";

const MyCourses = () => {
  const { data } = useGetFacultyCoursesQuery(undefined);

  console.log(data?.data);

  return (
    <div>
      <h1>My Courses</h1>
    </div>
  );
};

export default MyCourses;
