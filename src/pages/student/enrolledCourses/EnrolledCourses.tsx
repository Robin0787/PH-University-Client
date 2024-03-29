import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetMyEnrolledCoursesQuery } from "../../../redux/features/student/courseManagement.api";

const EnrolledCourses = () => {
  const { data } = useGetMyEnrolledCoursesQuery(undefined);

  const enrolledCourses = data?.data;

  console.log(enrolledCourses);
  return (
    <GradientContainer>
      <h1
        className="courseTitle"
        style={{ padding: "20px 0 0", textAlign: "center" }}
      >
        My Enrolled Courses
      </h1>
      <div style={{ padding: "10px" }}>
        {enrolledCourses && enrolledCourses?.length > 0 ? (
          <div style={{ paddingBottom: "20px", border: "1px solid red" }}>
            {enrolledCourses?.map((item) => (
              <div>
                <h2>{item.course.title}</h2>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </GradientContainer>
  );
};

export default EnrolledCourses;
