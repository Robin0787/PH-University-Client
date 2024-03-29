import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetMyOfferedCoursesQuery } from "../../../redux/features/student/courseManagement.api";

interface TModifiedItem {
  courseTitle: string;
  sections: {
    section: number;
    _id: string;
    startTime: string;
    endTime: string;
    days: string[];
  }[];
}

const MyOfferedCourses = () => {
  const { data: myOfferedCoursesData } = useGetMyOfferedCoursesQuery(undefined);

  const singleObject = myOfferedCoursesData?.data?.reduce((acc, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || {
      courseTitle: key,
      sections: [],
    };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });

    return acc;
  }, {});

  const modifiedData: TModifiedItem[] = Object.values(singleObject || {});

  const handleEnrollCourse = (courseId: string) => {
    toast.success(courseId);
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
        ""
      )}
    </div>
  );
};

export default MyOfferedCourses;
