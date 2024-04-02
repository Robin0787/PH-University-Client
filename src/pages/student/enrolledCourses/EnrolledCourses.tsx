import { Col, Row } from "antd";
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
        style={{ padding: "30px 0 10px", textAlign: "center" }}
      >
        My Enrolled Courses
      </h1>
      <div style={{ padding: "10px" }}>
        {enrolledCourses && enrolledCourses?.length > 0 ? (
          <div>
            {enrolledCourses?.map((item) => (
              <div
                key={item._id}
                style={{
                  padding: "20px",
                  marginBottom: "20px",
                  border: "1px solid #00000040",
                  borderRadius: "6px",
                }}
              >
                <h2>{item.course.title}</h2>
                <Row
                  justify={"space-between"}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Col span={5} style={{ fontSize: "18px" }}>
                    Section : {item?.offeredCourse?.section}
                  </Col>
                  <Col span={5} style={{ fontSize: "18px" }}>
                    Days : {item?.offeredCourse?.days.join(", ")}
                  </Col>
                  <Col span={5} style={{ fontSize: "18px" }}>
                    Time : {item?.offeredCourse?.startTime} -{" "}
                    {item.offeredCourse.endTime}
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>No courses available!</h1>
          </div>
        )}
      </div>
    </GradientContainer>
  );
};

export default EnrolledCourses;
