import { Col, Flex, Row } from "antd";
import { BaseOptionType } from "antd/es/select";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../../../components/form/FormInput";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PHTimePicker from "../../../components/form/PHTimePicker";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import {
  useGetAllDepartmentQuery,
  useGetAllFacultyQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import handleAPIRequest from "../../../utils/handleAPIRequest";
import {
  getAcademicDepartmentOptions,
  getAcademicFacultyOptions,
  getAcademicSemesterOptions,
  getCourseOptions,
  getFacultyOptions,
  getRegisteredSemesterOptions,
} from "./courseManagement.utils";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState<string>("");
  const { data: registeredSemesterData } = useGetAllRegisteredSemesterQuery([
    {
      name: "sort",
      value: "year",
    },
    { name: "status", value: "UPCOMING" },
  ]);
  const { data: academicSemesterData } = useGetAllSemesterQuery(undefined);
  const { data: academicFacultyData } = useGetAllFacultyQuery(undefined);
  const { data: academicDepartmentData } = useGetAllDepartmentQuery(undefined);
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const { data: facultyData, isLoading: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const registeredSemesterOptions = getRegisteredSemesterOptions(
    registeredSemesterData?.data
  );
  const academicSemesterOptions = getAcademicSemesterOptions(
    academicSemesterData?.data
  );
  const academicFacultyOptions = getAcademicFacultyOptions(
    academicFacultyData?.data
  );
  const academicDepartmentOptions = getAcademicDepartmentOptions(
    academicDepartmentData?.data
  );
  const courseOptions = getCourseOptions(courseData?.data);
  const facultyOptions = getFacultyOptions(facultyData?.data?.faculties);

  const [createOfferedCourse] = useCreateOfferedCourseMutation();

  function handleOfferCourse(data: FieldValues) {
    const toastId = toast.loading("Creating offered course...");
    data.section = Number(data.section);
    data.maxCapacity = Number(data.maxCapacity);

    handleAPIRequest(createOfferedCourse, data, toastId);
  }

  return (
    <div className="responsive-width80">
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm onSubmit={handleOfferCourse}>
            <GradientContainer>
              <div
                style={{ padding: "20px", width: "100%" }}
                className="container"
              >
                <h3 className="heading">Offer Course</h3>
                <div className="phForm">
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelectWithWatch
                        onValueChange={setCourseId}
                        options={courseOptions as BaseOptionType[]}
                        name="course"
                        label="Course"
                        placeholder="Select Course"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        options={registeredSemesterOptions as BaseOptionType[]}
                        name="semesterRegistration"
                        label="Semester Registration"
                        placeholder="Select Semester Registration"
                        disabled={!courseId}
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        options={academicFacultyOptions as BaseOptionType[]}
                        name="academicFaculty"
                        label="Academic Faculty"
                        placeholder="Select Academic Faculty"
                        disabled={!courseId}
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        options={academicDepartmentOptions as BaseOptionType[]}
                        name="academicDepartment"
                        label="Academic Department"
                        placeholder="Select Academic Department"
                        disabled={!courseId}
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        options={academicSemesterOptions as BaseOptionType[]}
                        name="academicSemester"
                        label="Academic Semester"
                        placeholder="Select Academic Semester"
                        disabled={!courseId}
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        options={facultyOptions as BaseOptionType[]}
                        name="faculty"
                        label="Faculty"
                        placeholder="Select Faculty"
                        disabled={!courseId || fetchingFaculties}
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput
                        type="number"
                        name="maxCapacity"
                        label="Maximum Capacity"
                        disabled={!courseId}
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput
                        type="number"
                        name="section"
                        label="Section"
                        disabled={!courseId}
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHTimePicker
                        name="startTime"
                        label="Start Time"
                        placeholder="Select Start Time"
                        disabled={!courseId}
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <PHTimePicker
                        name="endTime"
                        label="End Time"
                        placeholder="Select End Time"
                        disabled={!courseId}
                      />
                    </Col>
                  </Row>
                  <div>
                    <button type="submit" className="submitBtn">
                      Offer Course
                    </button>
                  </div>
                </div>
              </div>
            </GradientContainer>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
