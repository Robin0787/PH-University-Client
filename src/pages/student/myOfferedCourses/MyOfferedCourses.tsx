import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import {
  useEnrollToCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../../redux/features/student/courseManagement.api";
import handleAPIRequest from "../../../utils/handleAPIRequest";
import modifiedOfferedCourseData from "../../../utils/modifiedOfferedCourseData";

const MyOfferedCourses = () => {
  const { data: myOfferedCoursesData } = useGetMyOfferedCoursesQuery(undefined);
  const [enrollToCourse] = useEnrollToCourseMutation();

  const modifiedData = modifiedOfferedCourseData(myOfferedCoursesData?.data);

  const handleEnrollCourse = (offeredCourse: string) => {
    const toastId = toast.loading("Enrolling to the course...");

    const payload = {
      offeredCourse,
    };

    handleAPIRequest(enrollToCourse, payload, toastId);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {modifiedData.length > 0 ? (
        <>
          {modifiedData.map((item, key) => (
            <Row
              gutter={10}
              key={key}
              style={{
                padding: "10px",
              }}
            >
              <GradientContainer>
                <div style={{ padding: "50px" }}>
                  <h1 className="courseTitle">{item.courseTitle}</h1>
                  {item.sections.map((section) => {
                    return (
                      <Row
                        key={section._id}
                        justify={"space-between"}
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        <Col span={5} style={{ fontSize: "18px" }}>
                          Section : {section.section}
                        </Col>
                        <Col span={5} style={{ fontSize: "18px" }}>
                          Days : {section.days.join(", ")}
                        </Col>
                        <Col span={5} style={{ fontSize: "18px" }}>
                          Time : {section.startTime} - {section.endTime}
                        </Col>
                        <Col span={2}>
                          <Button
                            onClick={() => {
                              handleEnrollCourse(section._id);
                            }}
                            size="middle"
                            style={{ letterSpacing: "0.7px" }}
                          >
                            Enroll
                          </Button>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </GradientContainer>
            </Row>
          ))}
        </>
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
  );
};

export default MyOfferedCourses;
