import { useGetMyOfferedCoursesQuery } from "../../../redux/features/student/courseManagement.api";

const MyOfferedCourses = () => {
  const { data } = useGetMyOfferedCoursesQuery(undefined);

  console.log(data);

  return (
    <div>
      <h1>My Offered Courses</h1>
    </div>
  );
};

export default MyOfferedCourses;
